import { memo, type FC } from 'react'

import { Button } from '@components/actions/button'
import DialogClose from '@components/overlay/dialog/components/dialog-close/DialogClose.tsx'
import type { AlertDialogActionProps } from '@components/overlay/alert-dialog/components/alert-dialog-action/types/AlertDialogAction.props.ts'

/**
 * Confirm action slot for `AlertDialog`. Wraps a `Button` inside a
 * `DialogClose` so the dialog closes on confirmation. Defaults to
 * `color="destructive"` and `variant="contained"`.
 */
const AlertDialogAction: FC<AlertDialogActionProps> = memo(({
    color = 'destructive',
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
