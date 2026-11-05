import {
    Children,
    cloneElement,
    isValidElement,
    type FC,
} from 'react'

import { Avatar } from '@components/data-display/avatar'
import { AVATAR_GROUP_SPACING } from '@components/data-display/avatar-group/constants'
import type { AvatarGroupProps } from '@components/data-display/avatar-group/types'
import type { AvatarProps } from '@components/data-display/avatar/types'
import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'

/**
 * Formats the default accessible overflow name.
 * @param count - Number of hidden children.
 * @returns An English overflow label.
 * @example
 * defaultOverflowLabel(2) // "2 more"
 */
const defaultOverflowLabel = (count: number): string => `${count} more`

/**
 * Stacks multiple `Avatar` components horizontally with configurable overlap
 * spacing (medium by default). Finite `max` values are floored and clamped to
 * zero; an omitted `max` shows every child. Explicit non-finite values are rejected.
 * An extra overflow avatar
 * displays the full hidden count and receives `overflowLabel(count)`.
 * Native attributes, events, consumer class/style and ref target the rendered
 * element, a div by default. Custom `as` components must forward native props and ref.
 * Label identifying avatars and supply a localized overflowLabel when needed.
 *
 * @param props - Children, visible limit, overlap, native attributes and layout props.
 * @param props.children - Avatars or custom content displayed in their original order.
 * @param props.max - Finite visible limit, floored and clamped to zero; omitted values show all children.
 * @param props.spacing - Overlap preset; defaults to `md`.
 * @param props.overflowLabel - Accessible overflow-name formatter receiving the hidden count; defaults to an English count label.
 * @param props.className - Consumer class applied to the group container.
 * @param props.ref - Ref forwarded to the rendered container, a div by default.
 * @returns The horizontal avatar group and optional overflow indicator.
 * @throws {RangeError} When max is NaN, positive infinity or negative infinity.
 * @example
 * ```tsx
 * <AvatarGroup max={1}><Avatar initials="JD" aria-label="Jane Doe" /><Avatar initials="AB" aria-label="Alex Brown" /></AvatarGroup>
 * ```
 */
const AvatarGroup: FC<AvatarGroupProps> = ({
    children,
    max,
    spacing = 'md',
    overflowLabel = defaultOverflowLabel,
    className,
    ref,
    ...props
}) => {
    if (max !== undefined && !Number.isFinite(max)) {
        throw new RangeError('AvatarGroup max must be a finite number when provided.')
    }

    const childArray = Children.toArray(children)
    const limit = max !== undefined
        ? Math.max(0, Math.floor(max))
        : childArray.length
    const visibleCount = Math.min(childArray.length, limit)
    const overflowCount = childArray.length - visibleCount
    const visibleChildren = childArray.slice(0, visibleCount)
    const overlap = AVATAR_GROUP_SPACING[spacing]

    return (
        <Flex
            ref={ref}
            inline
            alignItems={'center'}
            gap={0}
            className={cn(className)}
            {...props}
        >
            {visibleChildren.map((child, index) => {
                const isFirst = index === 0
                const style = isFirst ? undefined : { marginLeft: overlap }

                if (isValidElement<AvatarProps>(child) && child.type === Avatar) {
                    const avatarChild = child
                    const existingStyle = avatarChild.props.style ?? {}
                    return cloneElement(avatarChild, {
                        style: {
                            ...existingStyle,
                            ...style,
                        },
                    })
                }

                return (
                    <Box
                        as={'span'}
                        key={index}
                        style={style}
                    >
                        {child}
                    </Box>
                )
            })}
            {overflowCount > 0 && (
                <Avatar.Root
                    aria-label={overflowLabel(overflowCount)}
                    role={'img'}
                    style={visibleCount > 0 ? { marginLeft: overlap } : undefined}
                >
                    <Avatar.Fallback>
                        <Typography
                            aria-hidden={'true'}
                            as={'span'}
                            fontSize={12}
                        >
                            {`+${overflowCount}`}
                        </Typography>
                    </Avatar.Fallback>
                </Avatar.Root>
            )}
        </Flex>
    )
}

AvatarGroup.displayName = 'AvatarGroup'

export default AvatarGroup
