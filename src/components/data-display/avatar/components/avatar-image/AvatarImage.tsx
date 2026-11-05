import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import { AVATAR_IMAGE_STYLES } from '@components/data-display/avatar/components/avatar-image/AvatarImage.css.ts'
import type { AvatarImageProps } from '@components/data-display/avatar/components/avatar-image/types'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

/**
 * Displays a loaded image inside Avatar.Root; the fallback remains visible
 * while loading or after failure. Provide an informative `alt` or omit it
 * for a decorative image. Native image events, attributes, class/style and ref
 * are forwarded. The loading callback receives the upstream status unchanged.
 *
 * @param props - Image URL, alternative, callback and native image props.
 * @param props.src - Image URL to load inside the avatar root.
 * @param props.alt - Informative image alternative; omitted values become an empty decorative alternative.
 * @param props.onLoadingStatusChange - Receives the upstream image loading status unchanged.
 * @param props.className - Consumer class merged with the image classes.
 * @param props.ref - Ref forwarded to the image element when mounted.
 * @returns The image slot, mounted when the image has loaded.
 * @throws When rendered outside Avatar.Root.
 * @example
 * ```tsx
 * <Avatar.Root><Avatar.Image src="/jane.jpg" alt="Jane Doe" /><Avatar.Fallback initials="JD" /></Avatar.Root>
 * ```
 */
const AvatarImage: FC<AvatarImageProps> = ({
    src,
    alt,
    onLoadingStatusChange,
    className,
    ...props
}) => (
    <BaseAvatar.Image
        src={src}
        alt={alt ?? ''}
        className={cn(AVATAR_IMAGE_STYLES.recipe(), className)}
        onLoadingStatusChange={onLoadingStatusChange}
        {...props}
    />
)

AvatarImage.displayName = 'Avatar.Image'

export default AvatarImage
