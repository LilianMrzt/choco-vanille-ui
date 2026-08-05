import { memo, type FC } from 'react'

import { useCommandContext } from '@components/overlay/command/context/Command.context.ts'
import { COMMAND_LIST_STYLES } from '@components/overlay/command/components/command-list/styles/CommandList.css.ts'
import type { CommandListProps } from '@components/overlay/command/components/command-list/types/CommandList.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * The scrollable results container inside `Command.Content`.
 *
 * Renders as `role="listbox"` and is referenced by `Command.Input` via
 * `aria-controls`. Attach `Command.Group`, `Command.Item`, `Command.Empty` and
 * `Command.Separator` as direct or nested children.
 */
const CommandList: FC<CommandListProps> = memo(({
    className,
    'aria-label': ariaLabel = 'Commands',
    children,
    ...props
}) => {
    const { listId, listRef } = useCommandContext()

    return (
        <div
            ref={listRef}
            id={listId}
            role={'listbox'}
            aria-label={ariaLabel}
            className={cn(COMMAND_LIST_STYLES.root, className)}
            {...props}
        >
            {children}
        </div>
    )
})

CommandList.displayName = 'Command.List'

export default CommandList
