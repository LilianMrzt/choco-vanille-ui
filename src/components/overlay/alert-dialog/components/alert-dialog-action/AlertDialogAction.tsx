import { memo, type FC } from 'react'

import { Button } from '@components/actions/button'
import DialogClose from '@components/overlay/dialog/components/dialog-close/DialogClose.tsx'
import type { AlertDialogActionProps } from '@components/overlay/alert-dialog/components/alert-dialog-action/types'

/**
 * Confirm action slot for `AlertDialog`. Wraps a `Button` inside a
 * `DialogClose` so the dialog closes on confirmation. Defaults to
 * `color="danger"` and `variant="contained"`.
 * Button attributes and ref are forwarded to the action.
 * @param props - Action button attributes.
 * @param props.color - Color intent; defaults to `danger`.
 * @param props.variant - Visual treatment; defaults to `contained`.
 * @returns The confirmation action.
 * @example
 * <AlertDialog.Action label="Delete" />
 */
const AlertDialogAction: FC<AlertDialogActionProps> = memo(({
    color = 'danger',
    variant = 'contained',
    ...props
}) => (
    <DialogClose>
        <Button
            {...props}
            color={color}
            variant={variant}
        />
    </DialogClose>
))

AlertDialogAction.displayName = 'AlertDialog.Action'

export default AlertDialogAction
