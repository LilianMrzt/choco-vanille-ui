import * as RadixDialog from '@radix-ui/react-dialog'

import type { DialogTriggerProps } from '@components/overlay/dialog/components/dialog-trigger/types/DialogTrigger.props.ts'

/**
 * The element that opens the dialog.
 * Use `asChild` to forward the trigger behaviour to your own element.
 */
const DialogTrigger = (props: DialogTriggerProps) => (
    <RadixDialog.Trigger {...props} />
)

DialogTrigger.displayName = 'DialogTrigger'

export default DialogTrigger
