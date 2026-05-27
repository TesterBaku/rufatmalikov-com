# AI with Rufat — Brand Spec

## Color tokens (OKLch)

| Token       | Value                    | Use                          |
|-------------|--------------------------|------------------------------|
| `--bg`      | `oklch(9% 0.06 255)`     | Page canvas — deep navy      |
| `--surface` | `oklch(14% 0.08 255)`    | Cards, panels                |
| `--fg`      | `oklch(97% 0.006 255)`   | Primary text (near white)    |
| `--muted`   | `oklch(52% 0.05 255)`    | Secondary text, captions     |
| `--border`  | `oklch(22% 0.10 255)`    | Borders, dividers            |
| `--accent`  | `oklch(72% 0.23 210)`    | Electric cyan — primary CTA  |
| `--accent2` | `oklch(58% 0.28 265)`    | Electric blue — gradient end |
| `--shell`   | `oklch(5% 0.03 252)`     | Outer viewport / chrome      |

Gradient (brand signature): `linear-gradient(135deg, oklch(82% 0.25 200), oklch(62% 0.30 265))`
Glow shadow: `box-shadow: 0 0 30px oklch(72% 0.23 210 / 0.5)`

## Typography

- **Display**: `'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif` — weight 800–900
- **Body**: `-apple-system, 'Inter', system-ui, sans-serif` — weight 400–600
- **Mono**: `ui-monospace, 'JetBrains Mono', Menlo, monospace`

## Layout posture

1. Dark midnight navy canvas — never white or warm beige
2. Electric cyan/blue gradient on headlines and key brand text ("AI" letters)
3. Subtle radial glows (circuit-board feel) in background — low opacity
4. Cards with `border-radius: 12–16px`, `border: 1px solid var(--border)`, no heavy shadows
5. Accent elements get glow: `box-shadow: 0 0 Xpx oklch(72% 0.23 210 / 0.4–0.5)`
