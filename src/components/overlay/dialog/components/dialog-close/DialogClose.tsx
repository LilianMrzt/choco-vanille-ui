import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import type { DialogCloseProps } from '@components/overlay/dialog/components/dialog-close/types/DialogClose.props.ts'

/**
 * Closes the dialog when clicked.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the close button.
 */
const DialogClose = ({ children, ...props }: DialogCloseProps) => (
    <BaseDialog.Close
        {...props}
        render={children}
    />
)

DialogClose.displayName = 'DialogClose'

export default DialogClose
