import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import { AVATAR_FALLBACK_STYLES } from '@components/data-display/avatar/components/avatar-fallback/AvatarFallback.css.ts'
import type { AvatarFallbackProps } from '@components/data-display/avatar/components/avatar-fallback/types'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'
import { Flex } from '@components/layout/flex'
import {
    AVATAR_SIZE_TO_TYPOGRAPHY_SIZE
} from '@components/data-display/avatar/components/avatar-fallback/constants'
import UserIcon from '@resources/asset/UserIcon.svg?react'

/**
 * Fallback content slot for `Avatar.Root`. Renders initials (up to 2
 * characters), a custom `icon`, or a default user icon when the image
 * fails to load or no `src` is provided. Empty initials select the icon.
 * Defaults to medium text and zero delay. Initials and icons are decorative:
 * give Avatar.Root an accessible name when identifying a person. Native span
 * props and ref target the visible fallback; children override generated content.
 *
 * @param props - Initials, SVG icon, size, delay and native span props.
 * @param props.initials - Text uppercased and limited to two characters; empty text selects an icon.
 * @param props.icon - Decorative fallback SVG; defaults to a user icon when initials are absent or empty.
 * @param props.size - Fallback text size preset; defaults to `md`.
 * @param props.delay - Delay in milliseconds before showing fallback content; defaults to zero.
 * @param props.className - Consumer class merged with the fallback classes.
 * @param props.children - Custom fallback content replacing generated initials or icons when not null or undefined.
 * @param props.ref - Ref forwarded to the visible fallback span.
 * @returns The visible fallback slot, or no element while an image is loaded.
 * @throws When rendered outside Avatar.Root.
 * @example
 * ```tsx
 * <Avatar.Root aria-label="Jane Doe"><Avatar.Fallback initials="JD" /></Avatar.Root>
 * ```
 */
const AvatarFallback: FC<AvatarFallbackProps> = ({
    initials,
    icon,
    size = 'md',
    delay,
    className,
    children,
    ...props
}) => {
    const fallbackContent = initials ? (
        <Typography
            as={'span'}
            variant={'span'}
            aria-hidden={'true'}
            fontSize={AVATAR_SIZE_TO_TYPOGRAPHY_SIZE[size]}
        >
            {initials.slice(0, 2).toUpperCase()}
        </Typography>
    ) : icon ? (
        <Icon icon={icon} />
    ) : (
        <Icon icon={UserIcon} />
    )

    return (
        <BaseAvatar.Fallback
            className={cn(AVATAR_FALLBACK_STYLES.recipe(), className)}
            delay={delay}
            render={
                <Flex
                    as={'span'}
                    alignItems={'center'}
                    height={'100%'}
                    justifyContent={'center'}
                    width={'100%'}
                />
            }
            {...props}
        >
            {children ?? fallbackContent}
        </BaseAvatar.Fallback>
    )
}

AvatarFallback.displayName = 'Avatar.Fallback'

export default AvatarFallback
