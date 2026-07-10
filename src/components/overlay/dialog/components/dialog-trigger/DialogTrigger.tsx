import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import type { DialogTriggerProps } from '@components/overlay/dialog/components/dialog-trigger/types/DialogTrigger.props.ts'

/**
 * The element that opens the dialog.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the trigger.
 */
const DialogTrigger: FC<DialogTriggerProps> = memo(({ children, ...props }) => (
    <BaseDialog.Trigger
        {...props}
        render={children}
    />
))

DialogTrigger.displayName = 'Dialog.Trigger'

export default DialogTrigger
