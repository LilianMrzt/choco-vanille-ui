import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import type { DialogCloseProps } from '@components/overlay/dialog/components/dialog-close/types'

/**
 * Closes the dialog when clicked.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the close button.
 * Attributes and ref are forwarded to that element.
 * @param props - Close attributes.
 * @param props.children - Element used as the close control.
 * @returns The close control.
 * @example
 * <Dialog.Close><button>Close</button></Dialog.Close>
 */
const DialogClose: FC<DialogCloseProps> = memo(({ children, ...props }) => (
    <BaseDialog.Close
        {...props}
        render={children}
    />
))

DialogClose.displayName = 'Dialog.Close'

export default DialogClose
