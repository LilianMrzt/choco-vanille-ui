import { Separator as BaseSeparator } from '@base-ui/react/separator'
import { memo, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { COMMAND_SEPARATOR_STYLES } from '@components/overlay/command/components/command-separator/CommandSeparator.css.ts'
import type { CommandSeparatorProps } from '@components/overlay/command/components/command-separator/types'

/**
 * A thin horizontal rule used to visually divide groups of commands.
 */
const CommandSeparator: FC<CommandSeparatorProps> = memo(({ className, ...props }) => (
    <BaseSeparator
        className={cn(COMMAND_SEPARATOR_STYLES.root, className)}
        {...props}
    />
))

CommandSeparator.displayName = 'Command.Separator'

export default CommandSeparator
