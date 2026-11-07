import type { AlertDialogProps, AlertDialogSize } from '@components/overlay/alert-dialog'
import type { DialogHeaderProps } from '@components/overlay/dialog'

export type AlertDialogStoryArgs = Omit<AlertDialogProps, 'children'> & {
    size?: AlertDialogSize
    title?: string
    titleAs?: DialogHeaderProps['titleAs']
    showCloseButton?: boolean
    contentLabel?: string
    description?: string
    triggerLabel?: string
    actionLabel?: string
    cancelLabel?: string
    showBody?: boolean
}
