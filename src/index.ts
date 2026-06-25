// Theme — design tokens. This export also registers the `:root` CSS variables
// and the global base styles (reset + themed body defaults) as a side effect.
export { vars } from '@theme'
export type { ThemeVars } from '@theme'

// Utilities
export { mergeClassNames } from '@utils/mergeClassNames.ts'

// Components
export * from '@components'
