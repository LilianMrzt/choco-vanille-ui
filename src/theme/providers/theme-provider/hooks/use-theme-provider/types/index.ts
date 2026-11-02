import type {
    ThemeProviderScope,
    ThemeValue,
} from '@theme/providers/theme-provider/types/index.ts'
import type { ThemeColorOverrides } from '@theme/tokens/colors/types/index.ts'
import type { CSSProperties } from 'react'
import type { UseThemeStateResult } from '@theme/providers/theme-provider/hooks/use-theme-provider/helpers/use-theme-state/types'

export type UseThemeProviderOptions = Readonly<{
    controlledTheme?: ThemeValue
    defaultTheme: ThemeValue
    onThemeChange?: (theme: ThemeValue) => void
    scope: ThemeProviderScope
    themeTransitionDuration: number
    tokens?: ThemeColorOverrides
}>

export type UseThemeProviderResult = UseThemeStateResult & Readonly<{
    isTransitioning: boolean
    tokenStyles: CSSProperties
}>
