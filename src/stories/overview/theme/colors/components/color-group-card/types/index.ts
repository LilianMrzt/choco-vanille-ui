import type { ThemeColor, ThemeColors } from '@theme'

export type ColorMap = ThemeColors

export type ColorGroup = Readonly<{
    label: string
    tokens: ReadonlyArray<ThemeColor>
    description?: string
}>

export type ColorGroupCardProps = Readonly<{
    group: ColorGroup
    colors: ColorMap
    dark?: boolean
}>
