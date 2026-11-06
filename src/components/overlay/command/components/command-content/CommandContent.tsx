import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, useCallback, useId, useMemo, useRef, useState, type FC } from 'react'

import { OverlayBackdrop } from '@components/overlay/_shared/components/overlay-backdrop'
import { CommandContext, type CommandContextValue } from '@components/overlay/command/context/Command.context.ts'
import { COMMAND_STYLES } from '@components/overlay/command/Command.css.ts'
import type { CommandContentProps } from '@components/overlay/command/components/command-content/types'
import { cn } from '@utils/cn.ts'

/**
 * The modal command palette panel.
 *
 * Renders into a portal with a backdrop. Creates the `CommandContext` that
 * provides `search`, `activeId`, `listId` and `listRef` to all descendant
 * slots. `Command.Input`, `Command.List`, `Command.Group`, `Command.Item`,
 * `Command.Empty` and `Command.Separator` must be rendered inside this slot.
 */
const CommandContent: FC<CommandContentProps> = memo(({
    className,
    size = 'md',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    defaultAriaLabel = 'Command palette',
    children,
    ...props
}) => {
    const [search, setSearch] = useState('')
    const [activeId, setActiveId] = useState<string | undefined>(undefined)
    const listId = useId()
    const listRef = useRef<HTMLDivElement>(null)

    // Reset the highlighted item whenever the search query changes so stale
    // positions are never retained after the visible-items set changes.
    const prevSearchRef = useRef(search)
    if (prevSearchRef.current !== search) {
        prevSearchRef.current = search
        setActiveId(undefined)
    }

    const ctx: CommandContextValue = useMemo(
        () => ({ search, setSearch, activeId, setActiveId, listId, listRef }),
        [search, activeId, listId],
    )

    // A role="dialog" element must have an accessible name.
    const accessibleName = ariaLabel ?? (ariaLabelledBy ? undefined : defaultAriaLabel)

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            const list = listRef.current
            if (!list) {return}
            if (
                event.key !== 'ArrowDown' &&
                event.key !== 'ArrowUp' &&
                event.key !== 'Home' &&
                event.key !== 'End' &&
                event.key !== 'Enter'
            ) {return}

            // Collect only non-hidden, non-disabled options so that disabled and
            // filtered-out items are transparently skipped by every navigation key.
            const items = Array.from(
                list.querySelectorAll<HTMLElement>(
                    '[role="option"]:not([hidden]):not([data-disabled])',
                ),
            )
            if (!items.length) {return}

            if (event.key === 'ArrowDown') {
                event.preventDefault()
                const idx = items.findIndex((el) => el.id === activeId)
                // When nothing is highlighted (idx === -1), idx + 1 === 0 — first item.
                const next = idx < items.length - 1 ? idx + 1 : 0
                setActiveId(items[next].id)
                items[next].scrollIntoView?.({ block: 'nearest' })
            } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                const idx = items.findIndex((el) => el.id === activeId)
                // When nothing is highlighted (idx === -1), wrap to last item.
                const prev = idx > 0 ? idx - 1 : items.length - 1
                setActiveId(items[prev].id)
                items[prev].scrollIntoView?.({ block: 'nearest' })
            } else if (event.key === 'Home') {
                // Jump to the first navigable item. preventDefault stops the input
                // cursor from moving to position 0 so the highlight is the sole effect.
                event.preventDefault()
                setActiveId(items[0].id)
                items[0].scrollIntoView?.({ block: 'nearest' })
            } else if (event.key === 'End') {
                // Jump to the last navigable item.
                event.preventDefault()
                setActiveId(items[items.length - 1].id)
                items[items.length - 1].scrollIntoView?.({ block: 'nearest' })
            } else if (event.key === 'Enter') {
                if (activeId) {
                    event.preventDefault()
                    const active = items.find((el) => el.id === activeId)
                    active?.click()
                }
            }
        },
        [activeId],
    )

    return (
        <CommandContext.Provider value={ctx}>
            <BaseDialog.Portal>
                <OverlayBackdrop />
                <BaseDialog.Popup
                    className={cn(
                        COMMAND_STYLES.content,
                        COMMAND_STYLES.contentSize[size],
                        className,
                    )}
                    aria-label={accessibleName}
                    aria-labelledby={ariaLabelledBy}
                    onKeyDown={handleKeyDown}
                    {...props}
                >
                    {children}
                </BaseDialog.Popup>
            </BaseDialog.Portal>
        </CommandContext.Provider>
    )
})

CommandContent.displayName = 'Command.Content'

export default CommandContent
