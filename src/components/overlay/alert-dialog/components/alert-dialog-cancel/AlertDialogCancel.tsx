import { memo, type FC } from 'react'

import { Button } from '@components/actions/button'
import DialogClose from '@components/overlay/dialog/components/dialog-close/DialogClose.tsx'
import type { AlertDialogCancelProps } from '@components/overlay/alert-dialog/components/alert-dialog-cancel/types'

/**
 * Cancel action slot for `AlertDialog`. Wraps a `Button` inside a
 * `DialogClose` so the dialog closes on cancellation. Defaults to
 * `label="Cancel"`, `color="primary"`, and `variant="outlined"`.
 * Button attributes and ref are forwarded to the action.
 * @param props - Cancel button attributes.
 * @param props.label - Button label; defaults to `Cancel`.
 * @param props.color - Color intent; defaults to `primary`.
 * @param props.variant - Visual treatment; defaults to `outlined`.
 * @returns The cancel action.
 * @example
 * <AlertDialog.Cancel label="Cancel" />
 */
const AlertDialogCancel: FC<AlertDialogCancelProps> = memo(({
    label = 'Cancel',
    color = 'primary',
    variant = 'outlined',
    ...props
}) => (
    <DialogClose>
        <Button
            {...props}
            label={label}
            color={color}
            variant={variant}
        />
    </DialogClose>
))

AlertDialogCancel.displayName = 'AlertDialog.Cancel'

export default AlertDialogCancel
