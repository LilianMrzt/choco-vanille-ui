import { memo, type FC } from 'react'

import { COMMAND_EMPTY_STYLES } from '@components/overlay/command/components/command-empty/styles/CommandEmpty.css.ts'
import type { CommandEmptyProps } from '@components/overlay/command/components/command-empty/types/CommandEmpty.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Shown inside `Command.List` when no items match the current search query.
 *
 * Visibility is managed via CSS `:has()` on the list container — no JavaScript
 * state is required. The element is always rendered in the DOM; it is hidden
 * when at least one `[role="option"]` sibling is not `hidden`.
 *
 * Must be placed inside `Command.List` as a sibling to `Command.Item` and
 * `Command.Group` elements.
 */
const CommandEmpty: FC<CommandEmptyProps> = memo(({ className, children, ...props }) => (
    <div
        className={cn(COMMAND_EMPTY_STYLES.root, className)}
        aria-live={'polite'}
        {...props}
    >
        {children}
    </div>
))

CommandEmpty.displayName = 'Command.Empty'

export default CommandEmpty
