import type AlertDialog from '@components/overlay/alert-dialog/AlertDialog.tsx'
import type { DialogProps, DialogSize } from '@components/overlay/dialog/types'

/** Root props for a confirmation dialog. */
export type AlertDialogProps = DialogProps

/** Confirmation dialog root and its compound slots. */
export type AlertDialogCompound = typeof AlertDialog

/** Responsive width presets for confirmation dialog content. */
export type AlertDialogSize = DialogSize
