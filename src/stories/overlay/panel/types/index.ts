import type { PanelHeaderProps, PanelPosition, PanelProps } from '@components/overlay/panel'

export type PanelStoryArgs = Omit<PanelProps, 'children'> & {
    position?: PanelPosition
    width?: string
    title?: string
    titleAs?: PanelHeaderProps['titleAs']
    showCloseButton?: boolean
    closeLabel?: string
    contentLabel?: string
    description?: string
    showDescription?: boolean
}
