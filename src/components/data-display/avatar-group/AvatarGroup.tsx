import {
    Children,
    cloneElement,
    isValidElement,
    type FC,
    type ReactElement,
} from 'react'

import { Avatar } from '@components/data-display/avatar'
import { AVATAR_GROUP_SPACING } from '@components/data-display/avatar-group/constants'
import type { AvatarGroupProps } from '@components/data-display/avatar-group/types/AvatarGroup.props.ts'
import type { AvatarProps } from '@components/data-display/avatar/types/Avatar.props.ts'
import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'

const defaultOverflowLabel = (count: number) => `${count} more`

const AvatarGroup: FC<AvatarGroupProps> = ({
    children,
    max,
    spacing = 'md',
    ring = true,
    overflowLabel = defaultOverflowLabel,
    className,
    ref,
    ...props
}) => {
    const childArray = Children.toArray(children)
    const visibleCount =
    max !== undefined ? Math.min(childArray.length, max) : childArray.length
    const overflowCount =
    max !== undefined ? Math.max(childArray.length - max, 0) : 0
    const visibleChildren = childArray.slice(0, visibleCount)
    const overlap = AVATAR_GROUP_SPACING[spacing]

    return (
        <Flex
            ref={ref}
            inline
            alignItems={'center'}
            gap={'none'}
            className={cn(className)}
            {...props}
        >
            {visibleChildren.map((child, index) => {
                const isFirst = index === 0
                const style = isFirst ? undefined : { marginLeft: overlap }

                if (isValidElement(child) && child.type === Avatar) {
                    const avatarChild = child as ReactElement<AvatarProps>
                    const existingStyle =
            typeof avatarChild.props.style === 'object' &&
            avatarChild.props.style !== null
                ? avatarChild.props.style
                : {}
                    return cloneElement(avatarChild, {
                        ring,
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
                <Avatar
                    initials={`+${overflowCount}`}
                    ring={ring}
                    aria-label={overflowLabel(overflowCount)}
                    role={'img'}
                    style={{ marginLeft: overlap }}
                />
            )}
        </Flex>
    )
}

AvatarGroup.displayName = 'AvatarGroup'

export default AvatarGroup
