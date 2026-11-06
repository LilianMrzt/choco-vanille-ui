import { memo, type FC } from 'react'

import { Dialog } from '@components/overlay/dialog'
import AlertDialogAction from '@components/overlay/alert-dialog/components/alert-dialog-action/AlertDialogAction.tsx'
import AlertDialogCancel from '@components/overlay/alert-dialog/components/alert-dialog-cancel/AlertDialogCancel.tsx'
import type { AlertDialogProps } from '@components/overlay/alert-dialog/types'

/**
 * A modal confirmation dialog for destructive actions.
 *
 * It reuses the accessible Dialog slots and adds `Action` and `Cancel`
 * buttons with destructive and outlined defaults respectively.
 * @param props - Dialog state, callbacks and root composition.
 * @returns The confirmation dialog root.
 * @example
 * <AlertDialog><AlertDialog.Content aria-label="Confirm" /></AlertDialog>
 */
const AlertDialogRoot: FC<AlertDialogProps> = memo((props) => <Dialog {...props} />)

AlertDialogRoot.displayName = 'AlertDialog'

/**
 * Confirmation dialog with namespaced content and action slots.
 * Provide a localized accessible name and a way to cancel the operation.
 * @example
 * <AlertDialog><AlertDialog.Content aria-label="Confirm" /></AlertDialog>
 */
const AlertDialog = Object.assign(AlertDialogRoot, {
    Trigger: Dialog.Trigger,
    Content: Dialog.Content,
    Header: Dialog.Header,
    Body: Dialog.Body,
    Footer: Dialog.Footer,
    Title: Dialog.Title,
    Description: Dialog.Description,
    Close: Dialog.Close,
    Action: AlertDialogAction,
    Cancel: AlertDialogCancel,
})

export default AlertDialog
