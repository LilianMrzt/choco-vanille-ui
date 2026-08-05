import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import type { CommandTriggerProps } from '@components/overlay/command/components/command-trigger/types/CommandTrigger.props.ts'

/**
 * The element that opens the command palette.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the trigger.
 */
const CommandTrigger: FC<CommandTriggerProps> = memo(({ children, ...props }) => (
    <BaseDialog.Trigger
        {...props}
        render={children}
    />
))

CommandTrigger.displayName = 'Command.Trigger'

export default CommandTrigger
