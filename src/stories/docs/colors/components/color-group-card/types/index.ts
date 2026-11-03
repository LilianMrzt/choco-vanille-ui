import type { ThemeColor } from '@theme'

export type ColorMap = Readonly<Record<string, string>>

export type ColorGroup = Readonly<{
    label: string
    tokens: ReadonlyArray<ThemeColor>
    description?: string
}>

export type ColorGroupCardProps = Readonly<{
    group: ColorGroup
    colors: ColorMap
}>
