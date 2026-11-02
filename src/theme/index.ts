// Side-effect: register the token contract (the `:root` / dark CSS variables)
// and the global base styles (reset + themed body defaults).
import '@theme/styles/contract/contract.css.ts'
import '@theme/styles/global/globalStyles.css.ts'

export { useTheme } from '@theme/hooks/preferences/useTheme.hook.ts'
export { ThemeProvider } from '@theme/providers/theme-provider'
export type {
    ThemeContextValue,
    ThemeMode,
    ThemeName,
    ThemeProviderProps,
    ThemeProviderScope,
    ThemeValue,
} from '@theme/providers/theme-provider/types/index.ts'

export { vars } from '@theme/styles/contract/contract.css.ts'

// Raw primitives & token objects — useful for tooling, docs and advanced theming.
export { palette } from '@theme/tokens/colors/palette.const.ts'
export { lightTheme, darkTheme } from '@theme/themes/themes.const.ts'

// Color tokens by theme — useful for consuming projects building custom themes.
export { lightColors } from '@theme/tokens/colors/lightColors.const.ts'
export { darkColors } from '@theme/tokens/colors/darkColors.const.ts'
export { lightEditorColors } from '@theme/tokens/colors/lightColors.const.ts'
export { darkEditorColors } from '@theme/tokens/colors/darkColors.const.ts'
export type { EditorColors, LightColors, ThemeColor, ThemeColorValue } from '@theme/tokens/colors/types/index.ts'
export type { Theme } from '@theme/themes/types/index.ts'
export type { ThemeVars } from '@theme/styles/contract/types/index.ts'
