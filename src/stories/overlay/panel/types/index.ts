import type { PanelPosition, PanelProps } from '@components/overlay/panel'

export type PanelStoryArgs = Omit<PanelProps, 'children'> & {
    position?: PanelPosition
    width?: string
    title?: string
    description?: string
    showDescription?: boolean
}
