import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import type { DialogTriggerProps } from '@components/overlay/dialog/components/dialog-trigger/types/DialogTrigger.props.ts'

/**
 * The element that opens the dialog.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the trigger.
 */
const DialogTrigger = ({ children, ...props }: DialogTriggerProps) => (
    <BaseDialog.Trigger
        {...props}
        render={children}
    />
)

DialogTrigger.displayName = 'DialogTrigger'

export default DialogTrigger
