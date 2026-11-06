import { memo, useId, useLayoutEffect, useRef, useState, type FC } from 'react'

import { COMMAND_GROUP_STYLES } from '@components/overlay/command/components/command-group/CommandGroup.css.ts'
import type { CommandGroupProps } from '@components/overlay/command/components/command-group/types'
import { useCommandContext } from '@components/overlay/command/context/Command.context.ts'
import { cn } from '@utils/cn.ts'

/**
 * A labeled group of `Command.Item` elements inside `Command.List`.
 *
 * Renders as `role="group"` with an optional visible label. When `label` is
 * provided it is connected to the group via `aria-labelledby`.
 *
 * The group is hidden (via the HTML `hidden` attribute) whenever every
 * descendant `Command.Item` has been filtered out by the current search query.
 * It becomes visible again as soon as at least one item matches.
 */
const CommandGroup: FC<CommandGroupProps> = memo(({
    className,
    label,
    children,
    ...props
}) => {
    const labelId = useId()
    const { search } = useCommandContext()
    const rootRef = useRef<HTMLDivElement>(null)
    const [groupHidden, setGroupHidden] = useState(false)

    // After every commit triggered by a search change, query the actual DOM to
    // determine whether any visible (non-hidden, non-disabled) option remains
    // inside this group. Using the DOM as the source of truth avoids duplicating
    // the filter logic already owned by each CommandItem.
    useLayoutEffect(() => {
        const root = rootRef.current
        if (!root) {return}
        const hasVisible =
            root.querySelectorAll<HTMLElement>('[role="option"]:not([hidden])').length > 0
        setGroupHidden(!hasVisible)
    }, [search])

    return (
        <div
            ref={rootRef}
            role={'group'}
            aria-labelledby={label ? labelId : undefined}
            hidden={groupHidden || undefined}
            className={cn(COMMAND_GROUP_STYLES.root, className)}
            {...props}
        >
            {label && (
                <div
                    id={labelId}
                    className={COMMAND_GROUP_STYLES.label}
                >
                    {label}
                </div>
            )}
            {children}
        </div>
    )
})

CommandGroup.displayName = 'Command.Group'

export default CommandGroup
