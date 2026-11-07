import type { DialogBodyProps, DialogHeaderProps, DialogProps, DialogSize } from '@components/overlay/dialog'

export type DialogStoryArgs = Omit<DialogProps, 'children'> & {
    size?: DialogSize
    title?: string
    titleAs?: DialogHeaderProps['titleAs']
    showCloseButton?: boolean
    contentLabel?: string
    bodyPadding?: DialogBodyProps['padding']
    description?: string
    showDescription?: boolean
    showFooter?: boolean
    confirmLabel?: string
    cancelLabel?: string
}
