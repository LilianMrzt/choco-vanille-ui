import * as RadixDialog from '@radix-ui/react-dialog'

import type { DialogCloseProps } from '@components/overlay/dialog/components/dialog-close/types/DialogClose.props.ts'

/**
 * Closes the dialog when clicked.
 * Use `asChild` to render your own button.
 */
const DialogClose = (props: DialogCloseProps) => (
    <RadixDialog.Close {...props} />
)

DialogClose.displayName = 'DialogClose'

export default DialogClose
