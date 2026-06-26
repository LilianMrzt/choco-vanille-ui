export type ColorMap = Record<string, string>

export interface ColorGroup {
    label: string
    tokens: string[]
    description?: string
}

export interface ColorGroupCardProps {
    group: ColorGroup
    colors: ColorMap
    dark?: boolean
}
