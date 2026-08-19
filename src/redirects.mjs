// Single source of truth for site-wide URL redirects.
//
// Consumed twice:
//   1. astro.config.mjs -> `redirects`, which powers the dev server and emits
//      meta-refresh stub pages into dist/.
//   2. src/integrations/cloudflare-redirects.mjs, which writes dist/_redirects
//      so Cloudflare Pages serves real 301s at the edge.
//
// The stubs alone are NOT redirects: they return HTTP 200 with a
// <meta http-equiv="refresh">, which Google crawls as a duplicate page rather
// than following as a redirect. That put the anglicized Python slugs into the
// "Duplicate, Google chose different canonical than user" report. Cloudflare
// applies _redirects before serving any matching static asset, so the 301 wins
// and the stub is never reachable in production.
export const REDIRECTS = {
		// Root redirects to the default locale's homepage.
		// Browsers that send Accept-Language could be auto-routed in middleware later if desired.
		'/': '/en/',
		// Python course slugs were anglicized (AZ → English dir/file names) for the
		// English-audience SEO. Redirect the old live AZ URLs to the new ones.
		'/az/python/00-baslangic/proqramlasdirma-nedir/': '/az/python/00-foundations/what-is-programming/',
		'/az/python/00-baslangic/ilk-proqramin/': '/az/python/00-foundations/your-first-program/',
		'/az/python/01-python-ile-danis/print-ve-metnler/': '/az/python/01-talk-to-python/print-and-text/',
		'/az/python/01-python-ile-danis/deyisenler/': '/az/python/01-talk-to-python/variables/',
		'/az/python/01-python-ile-danis/reqemler-ve-hesab/': '/az/python/01-talk-to-python/numbers-and-math/',
		'/az/python/01-python-ile-danis/input/': '/az/python/01-talk-to-python/input/',
		'/az/python/02-qerar-ver/if-egar/': '/az/python/02-make-decisions/if-statements/',
		'/az/python/02-qerar-ver/muqayise-ve-elif/': '/az/python/02-make-decisions/comparisons-and-elif/',
		'/az/python/02-qerar-ver/ve-veya-deyil/': '/az/python/02-make-decisions/and-or-not/',
		'/az/python/03-tekrarla/for-dovru/': '/az/python/03-repeat/for-loops/',
		'/az/python/03-tekrarla/while-dovru/': '/az/python/03-repeat/while-loops/',
		'/az/python/03-tekrarla/dovrle-hesabla/': '/az/python/03-repeat/counting-with-loops/',
		'/az/python/04-kolleksiyalar/siyahilar/': '/az/python/04-collections/lists/',
		'/az/python/04-kolleksiyalar/siyahi-metodlari/': '/az/python/04-collections/list-methods/',
		'/az/python/04-kolleksiyalar/indeks-ve-dilim/': '/az/python/04-collections/index-and-slice/',
		'/az/python/04-kolleksiyalar/lugetler/': '/az/python/04-collections/dictionaries/',
		'/az/python/05-funksiyalar/ilk-funksiyan/': '/az/python/05-functions/your-first-function/',
		'/az/python/05-funksiyalar/parametrler/': '/az/python/05-functions/parameters/',
		'/az/python/05-funksiyalar/return/': '/az/python/05-functions/return/',
		'/az/python/06-layihe-missiyalari/kalkulyator/': '/az/python/06-projects/calculator/',
		'/az/python/06-layihe-missiyalari/eded-tap-oyunu/': '/az/python/06-projects/number-guessing-game/',
		'/az/python/06-layihe-missiyalari/sezar-sifresi/': '/az/python/06-projects/caesar-cipher/',
		'/az/python/06-layihe-missiyalari/viktorina/': '/az/python/06-projects/quiz/',
		'/az/python/sozluk/': '/az/python/glossary/',
		// Stale /en/ URLs with the old AZ slugs: before anglicization the language
		// toggle swapped only the /az/↔/en/ prefix, so /az/python/<az-slug>/ linked to
		// /en/python/<az-slug>/ — pages that never existed (EN always used English
		// slugs). Google crawled those links and still holds them as 404s. Mirror the
		// AZ redirects on /en/ so those historical URLs 301 to the real English pages.
		'/en/python/00-baslangic/proqramlasdirma-nedir/': '/en/python/00-foundations/what-is-programming/',
		'/en/python/00-baslangic/ilk-proqramin/': '/en/python/00-foundations/your-first-program/',
		'/en/python/01-python-ile-danis/print-ve-metnler/': '/en/python/01-talk-to-python/print-and-text/',
		'/en/python/01-python-ile-danis/deyisenler/': '/en/python/01-talk-to-python/variables/',
		'/en/python/01-python-ile-danis/reqemler-ve-hesab/': '/en/python/01-talk-to-python/numbers-and-math/',
		'/en/python/01-python-ile-danis/input/': '/en/python/01-talk-to-python/input/',
		'/en/python/02-qerar-ver/if-egar/': '/en/python/02-make-decisions/if-statements/',
		'/en/python/02-qerar-ver/muqayise-ve-elif/': '/en/python/02-make-decisions/comparisons-and-elif/',
		'/en/python/02-qerar-ver/ve-veya-deyil/': '/en/python/02-make-decisions/and-or-not/',
		'/en/python/03-tekrarla/for-dovru/': '/en/python/03-repeat/for-loops/',
		'/en/python/03-tekrarla/while-dovru/': '/en/python/03-repeat/while-loops/',
		'/en/python/03-tekrarla/dovrle-hesabla/': '/en/python/03-repeat/counting-with-loops/',
		'/en/python/04-kolleksiyalar/siyahilar/': '/en/python/04-collections/lists/',
		'/en/python/04-kolleksiyalar/siyahi-metodlari/': '/en/python/04-collections/list-methods/',
		'/en/python/04-kolleksiyalar/indeks-ve-dilim/': '/en/python/04-collections/index-and-slice/',
		'/en/python/04-kolleksiyalar/lugetler/': '/en/python/04-collections/dictionaries/',
		'/en/python/05-funksiyalar/ilk-funksiyan/': '/en/python/05-functions/your-first-function/',
		'/en/python/05-funksiyalar/parametrler/': '/en/python/05-functions/parameters/',
		'/en/python/05-funksiyalar/return/': '/en/python/05-functions/return/',
		'/en/python/06-layihe-missiyalari/kalkulyator/': '/en/python/06-projects/calculator/',
		'/en/python/06-layihe-missiyalari/eded-tap-oyunu/': '/en/python/06-projects/number-guessing-game/',
		'/en/python/06-layihe-missiyalari/sezar-sifresi/': '/en/python/06-projects/caesar-cipher/',
		'/en/python/06-layihe-missiyalari/viktorina/': '/en/python/06-projects/quiz/',
		'/en/python/sozluk/': '/en/python/glossary/',
};
