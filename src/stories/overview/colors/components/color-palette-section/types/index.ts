import type { CSSProperties } from 'react'
import type { ColorGroup } from '@stories/overview/colors/components/color-group-card/types'

export type ColorMap = Record<string, string>

export interface ColorPaletteSectionProps {
    title: string
    subtitle?: string
    colors: ColorMap
    colorGroups: ColorGroup[]
    dark?: boolean
}

export const sectionStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
}
