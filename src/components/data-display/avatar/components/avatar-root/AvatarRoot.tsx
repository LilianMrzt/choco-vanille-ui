import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import { AVATAR_STYLES } from '@components/data-display/avatar/components/avatar-root/AvatarRoot.css.ts'
import type { AvatarRootProps } from '@components/data-display/avatar/components/avatar-root/types'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

/**
 * Coordinates Avatar.Image and Avatar.Fallback within a styled span.
 * Defaults to medium, circular, primary and contained. Give the root an
 * accessible name for identifying fallback content. Native span attributes,
 * events, consumer class/style and ref are forwarded to this root.
 * The outlined fallback uses its color family's `subtleHover` as a decorative border.
 *
 * @param props - Root appearance and native span props.
 * @param props.size - Avatar size preset; defaults to `md`.
 * @param props.shape - Root shape; defaults to `circle`.
 * @param props.color - Fallback color intent; defaults to `primary`.
 * @param props.variant - Surface treatment; defaults to `contained`.
 * @param props.className - Consumer class merged with the root classes.
 * @param props.ref - Ref forwarded to the root span.
 * @param props.children - Image, fallback and optional presence slots.
 * @returns The avatar root containing its composed slots.
 * @example
 * ```tsx
 * <Avatar.Root aria-label="Jane Doe"><Avatar.Fallback initials="JD" /></Avatar.Root>
 * ```
 */
const AvatarRoot: FC<AvatarRootProps> = ({
    size,
    shape,
    color,
    variant,
    className,
    ref,
    ...props
}) => (
    <BaseAvatar.Root
        ref={ref}
        className={cn(
            AVATAR_STYLES.recipe({ size, shape, color, variant }),
            className,
        )}
        {...props}
    />
)

AvatarRoot.displayName = 'Avatar.Root'

export default AvatarRoot
