import type { ColorGroup } from '@stories/docs/colors/components/color-group-card/types'

export type ColorMap = Readonly<Record<string, string>>

export type ColorPaletteSectionProps = Readonly<{
    title: string
    subtitle?: string
    colors: ColorMap
    colorGroups: ReadonlyArray<ColorGroup>
}>
