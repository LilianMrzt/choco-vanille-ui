import { memo } from 'react'

import { Dialog } from '@components/overlay/dialog'
import AlertDialogAction from '@components/overlay/alert-dialog/components/alert-dialog-action/AlertDialogAction.tsx'
import AlertDialogCancel from '@components/overlay/alert-dialog/components/alert-dialog-cancel/AlertDialogCancel.tsx'
import type { AlertDialogCompound } from '@components/overlay/alert-dialog/types/AlertDialogCompound.ts'
import type { AlertDialogProps } from '@components/overlay/alert-dialog/types/AlertDialog.props.ts'

/**
 * A modal confirmation dialog for destructive actions.
 *
 * It reuses the accessible Dialog slots and adds `Action` and `Cancel`
 * buttons with destructive and outlined defaults respectively.
 */
const AlertDialog = memo<AlertDialogProps>((props) => <Dialog {...props} />) as unknown as AlertDialogCompound

AlertDialog.displayName = 'AlertDialog'
AlertDialog.Trigger = Dialog.Trigger
AlertDialog.Content = Dialog.Content
AlertDialog.Header = Dialog.Header
AlertDialog.Body = Dialog.Body
AlertDialog.Footer = Dialog.Footer
AlertDialog.Title = Dialog.Title
AlertDialog.Description = Dialog.Description
AlertDialog.Close = Dialog.Close
AlertDialog.Action = AlertDialogAction
AlertDialog.Cancel = AlertDialogCancel

export { AlertDialog }
