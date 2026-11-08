import { memo, useId, useMemo, type FC } from 'react'

import { Flex } from '@components/layout/flex'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { useCommandContext } from '@components/overlay/command/context/Command.context.ts'
import { COMMAND_ITEM_STYLES } from '@components/overlay/command/components/command-item/CommandItem.css.ts'
import type { CommandItemProps } from '@components/overlay/command/components/command-item/types'
import { cn } from '@utils/cn.ts'

/**
 * A single actionable command inside `Command.List` or `Command.Group`.
 *
 * - Filtered out of the results (via the HTML `hidden` attribute) when the
 *   search query does not match its `children` text or `keywords`.
 * - Highlighted on pointer hover and keyboard navigation; activates on click
 *   or Enter.
 * - When `disabled`, it is excluded from keyboard navigation and pointer
 *   interaction.
 */
const CommandItem: FC<CommandItemProps> = memo(({
    className,
    children,
    keywords,
    disabled = false,
    icon,
    shortcut,
    onSelect,
    onClick,
    onMouseEnter,
    onKeyDown,
    ...props
}) => {
    const { search, activeId, setActiveId } = useCommandContext()
    const itemId = useId()
    const isActive = activeId === itemId

    const isVisible = useMemo(() => {
        if (!search) {return true}
        const label = typeof children === 'string' ? children : ''
        const allKeywords = [label, ...(keywords ?? [])].filter(Boolean)
        if (!allKeywords.length) {return true}
        const query = search.toLowerCase()
        return allKeywords.some((k) => k.toLowerCase().includes(query))
    }, [search, children, keywords])

    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (disabled) {return}
        onSelect?.()
        onClick?.(event)
    }

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (!disabled) {
            setActiveId(itemId)
        }
        onMouseEnter?.(event)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            event.stopPropagation()
            onSelect?.()
        }
        onKeyDown?.(event)
    }

    return (
        <div
            id={itemId}
            role={'option'}
            aria-selected={isActive}
            aria-disabled={disabled || undefined}
            data-disabled={disabled || undefined}
            data-highlighted={isActive || undefined}
            hidden={!isVisible || undefined}
            tabIndex={-1}
            className={cn(COMMAND_ITEM_STYLES.root, className)}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onKeyDown={handleKeyDown}
            {...props}
        >
            {icon && (
                <Flex
                    as={'span'}
                    justifyContent={'center'}
                    className={COMMAND_ITEM_STYLES.icon}
                    aria-hidden
                >
                    <Icon
                        icon={icon}
                        size={12}
                    />
                </Flex>
            )}
            <Typography
                as={'span'}
                variant={'span'}
                maxLines={1}
                width={'100%'}
            >
                {children}
            </Typography>
            {shortcut && (
                <span
                    className={COMMAND_ITEM_STYLES.shortcut}
                    aria-hidden
                >
                    {shortcut}
                </span>
            )}
        </div>
    )
})

CommandItem.displayName = 'Command.Item'

export default CommandItem
