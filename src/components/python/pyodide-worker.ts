/// <reference lib="webworker" />
/**
 * Pyodide Web Worker — runs user Python off the main thread.
 *
 * The worker cannot stop its own infinite loop, so the *main thread* owns the
 * timeout: on timeout (or Stop) it calls `worker.terminate()` and recreates a
 * fresh worker. This file therefore never deals with timeouts — it only loads
 * Pyodide lazily, runs code, streams stdout/stderr, and reports a structured
 * result (including the line number for errors).
 *
 * Message protocol:
 *   main → worker:  { type: 'run', code: string, inputs: string[], checkCode?: string }
 *   worker → main:  { type: 'ready' }    — Pyodide finished loading
 *                   { type: 'started' }  — user code is now executing (start the kill-timer here)
 *                   { type: 'stdout' | 'stderr', text: string }
 *                   { type: 'checkresult', passed: boolean, hint: string | null }
 *                   { type: 'done' }
 *                   { type: 'error', errorType: string, message: string, line: number | null }
 *
 * The main thread starts its 5s kill-timer on 'started' (NOT on 'run'), so the
 * one-time Pyodide download is never counted against the execution timeout.
 *
 * Missions: when `checkCode` is supplied and the user's code ran without error,
 * the worker execs the (hidden) check snippet in the *same* namespace, with the
 * captured stdout exposed as `_stdout`. The check asserts and raises
 * `AssertionError("HINT:<az hint>")` on failure → reported via 'checkresult'.
 */

// Pyodide is loaded from the jsDelivr CDN (no npm package). Bump if a newer
// stable is desired — the indexURL must point at the matching `/full/` dir so
// Pyodide can fetch its own .wasm + stdlib.
const PYODIDE_VERSION = '0.26.4';
const CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

// Python helper, defined once after load. Runs the user's code in a *fresh*
// globals dict every time (so re-runs never leak state), captures the error
// line within the user's own source ("<proqram>"), feeds input() from a
// pre-supplied queue (v1 has no interactive stdin), and — for missions — runs a
// hidden check snippet in the same namespace with the captured stdout (_stdout).
const HELPER_PY = `
import builtins, traceback, json, io, sys

def _find_line(e):
    line = None
    for fr in traceback.extract_tb(e.__traceback__):
        if fr.filename == "<proqram>":
            line = fr.lineno
    # SyntaxError (and friends) fail in compile() with no "<proqram>" frame, so
    # fall back to the exception's own .lineno attribute.
    if line is None:
        line = getattr(e, "lineno", None)
    return line

def _run_user(code, inputs_json, check_code):
    _queue = json.loads(inputs_json)

    def _input(prompt=""):
        if prompt:
            print(prompt, end="")
        if not _queue:
            raise EOFError("EOF when reading a line")
        return _queue.pop(0)

    g = {"__name__": "__main__", "__builtins__": builtins.__dict__, "input": _input}

    # Tee stdout: keep streaming live to the page (real_out is Pyodide's
    # redirected stdout) while also buffering it for the mission check.
    buf = io.StringIO()
    real_out = sys.stdout

    class _Tee:
        def write(self, s):
            buf.write(s)
            return real_out.write(s)
        def flush(self):
            return real_out.flush()

    err = None
    sys.stdout = _Tee()
    try:
        try:
            exec(compile(code, "<proqram>", "exec"), g)
            ok = True
        except SystemExit:
            ok = True
        except BaseException as e:
            ok = False
            err = {"type": type(e).__name__, "msg": str(e), "line": _find_line(e)}
    finally:
        sys.stdout = real_out

    check = None
    if check_code and ok:
        g["_stdout"] = buf.getvalue()
        try:
            exec(compile(check_code, "<yoxlama>", "exec"), g)
            check = {"passed": True, "hint": None}
        except AssertionError as e:
            msg = str(e)
            hint = msg.split("HINT:", 1)[1].strip() if "HINT:" in msg else msg
            check = {"passed": False, "hint": hint or "Bir az da cəhd et."}
        except BaseException as e:
            check = {"passed": False, "hint": "Yoxlama zamanı xəta: " + str(e)}

    return {"ok": ok, "err": err, "check": check}
`;

type AnyPyodide = {
  loadPyodide?: unknown;
  setStdout: (opts: { batched: (text: string) => void }) => void;
  setStderr: (opts: { batched: (text: string) => void }) => void;
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<any>;
  globals: { set: (name: string, value: unknown) => void };
};

function post(msg: unknown) {
  (self as unknown as Worker).postMessage(msg);
}

let pyodide: AnyPyodide | null = null;
let loading: Promise<AnyPyodide> | null = null;

async function loadOnce(): Promise<AnyPyodide> {
  const mod: any = await import(/* @vite-ignore */ `${CDN}pyodide.mjs`);
  const py: AnyPyodide = await mod.loadPyodide({ indexURL: CDN });
  py.setStdout({ batched: (text) => post({ type: 'stdout', text }) });
  py.setStderr({ batched: (text) => post({ type: 'stderr', text }) });
  py.runPython(HELPER_PY);
  pyodide = py;
  post({ type: 'ready' });
  return py;
}

function ensurePyodide(): Promise<AnyPyodide> {
  if (pyodide) return Promise.resolve(pyodide);
  if (!loading) loading = loadOnce();
  return loading;
}

self.onmessage = async (e: MessageEvent) => {
  const data = e.data;
  if (!data || data.type !== 'run') return;

  let py: AnyPyodide;
  try {
    py = await ensurePyodide();
  } catch (err: any) {
    post({
      type: 'error',
      errorType: 'YükləməXətası',
      message: `Python mühitini yükləmək alınmadı: ${String(err?.message || err)}`,
      line: null,
    });
    return;
  }

  try {
    py.globals.set('_user_code', String(data.code ?? ''));
    py.globals.set('_user_inputs_json', JSON.stringify(data.inputs ?? []));
    py.globals.set('_user_check', String(data.checkCode ?? ''));
    post({ type: 'started' });
    const resProxy = await py.runPythonAsync(
      '_run_user(_user_code, _user_inputs_json, _user_check)'
    );
    const res = resProxy.toJs({ dict_converter: Object.fromEntries });
    resProxy.destroy?.();
    if (res.check) {
      post({ type: 'checkresult', passed: res.check.passed, hint: res.check.hint ?? null });
    }
    if (res.ok) {
      post({ type: 'done' });
    } else {
      post({ type: 'error', errorType: res.err.type, message: res.err.msg, line: res.err.line ?? null });
    }
  } catch (err: any) {
    // _run_user swallows user-level exceptions, so reaching here means an
    // infrastructure-level failure (e.g. a SyntaxError while compiling helpers).
    post({
      type: 'error',
      errorType: 'Xəta',
      message: String(err?.message || err),
      line: null,
    });
  }
};
