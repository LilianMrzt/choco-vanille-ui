import type { DialogProps, DialogSize } from '@components/overlay/dialog'

export type DialogStoryArgs = Omit<DialogProps, 'children'> & {
    size?: DialogSize
    title?: string
    description?: string
    showDescription?: boolean
    showFooter?: boolean
    confirmLabel?: string
    cancelLabel?: string
}
