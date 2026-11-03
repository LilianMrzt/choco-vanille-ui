import type { Theme } from '@theme'

export type TokenCategory = Exclude<keyof Theme, 'color' | 'editorColors'>

export type TokenReferenceArgs = Readonly<{
    theme: 'light' | 'dark'
    category: 'all' | TokenCategory
}>
