// Side-effect: register the token contract (the `:root` / dark CSS variables)
// and the global base styles (reset + themed body defaults).
import '@theme/contract.css.ts'
import '@theme/globalStyles.css.ts'

export { vars } from '@theme/contract.css.ts'
export type { ThemeVars } from '@theme/contract.css.ts'

// Raw primitives & token objects — useful for tooling, docs and advanced theming.
export { palette } from '@theme/tokens/palette.ts'
export { lightTheme, darkTheme } from '@theme/tokens/index.ts'
export type { Theme } from '@theme/tokens/index.ts'

// Color tokens by theme — useful for consuming projects building custom themes.
export { lightColors } from '@theme/colors/light.ts'
export { darkColors } from '@theme/colors/dark.ts'
export type { LightColors } from '@theme/colors/light.ts'

// Override helpers — see override.ts for full documentation.
export { overrideColors, setColorToken } from '@theme/override.ts'

// Theme types
export type { ThemeColor, ThemeColorValue } from '@theme/types/index.ts'
