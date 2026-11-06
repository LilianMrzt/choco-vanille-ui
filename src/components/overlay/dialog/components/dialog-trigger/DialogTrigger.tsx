import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import type { DialogTriggerProps } from '@components/overlay/dialog/components/dialog-trigger/types'

/**
 * The element that opens the dialog.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the trigger.
 * Attributes and ref are forwarded to that element.
 * @param props - Trigger attributes.
 * @param props.children - Element used as the trigger.
 * @returns The dialog trigger.
 * @example
 * <Dialog.Trigger><button>Open</button></Dialog.Trigger>
 */
const DialogTrigger: FC<DialogTriggerProps> = memo(({ children, ...props }) => (
    <BaseDialog.Trigger
        {...props}
        render={children}
    />
))

DialogTrigger.displayName = 'Dialog.Trigger'

export default DialogTrigger
