import type { AlertDialogProps, AlertDialogSize } from '@components/overlay/alert-dialog'

export type AlertDialogStoryArgs = Omit<AlertDialogProps, 'children'> & {
    size?: AlertDialogSize
    title?: string
    description?: string
    triggerLabel?: string
    actionLabel?: string
    cancelLabel?: string
    showBody?: boolean
}
