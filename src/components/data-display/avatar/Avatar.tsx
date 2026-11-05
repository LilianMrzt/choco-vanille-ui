import AvatarFallback from '@components/data-display/avatar/components/avatar-fallback/AvatarFallback.tsx'
import AvatarImage from '@components/data-display/avatar/components/avatar-image/AvatarImage.tsx'
import AvatarRoot from '@components/data-display/avatar/components/avatar-root/AvatarRoot.tsx'
import AvatarStatus from '@components/data-display/avatar/components/avatar-status/AvatarStatus.tsx'
import { AVATAR_SIZES, AVATAR_VARIANTS } from '@components/data-display/avatar/constants'
import type { AvatarCompound } from '@components/data-display/avatar/types/index.ts'
import type { AvatarProps } from '@components/data-display/avatar/types'
import type { FC } from 'react'

/**
 * Displays a user avatar with an optional image, initials fallback, icon
 * fallback, and online/presence status indicator.
 *
 * Provide an accessible root name when fallback content identifies a person;
 * informative images need `alt`. Native attributes, events and ref are forwarded
 * to the root span. Use `Avatar.Root`, `.Image`, `.Fallback` and `.Status` for
 * custom composition. A non-empty image URL always uses the contained treatment.
 *
 * @param props - Native span and avatar presentation props.
 * @param props.src - Image URL; omitted or empty values display the fallback.
 * @param props.alt - Image alternative; omitted values make the image decorative.
 * @param props.initials - Fallback text, uppercased and limited to two characters.
 * @param props.icon - Decorative fallback SVG used when initials are absent or empty.
 * @param props.size - Avatar size preset; defaults to `md`.
 * @param props.shape - Root shape; defaults to `circle`.
 * @param props.color - Fallback color intent; defaults to `primary`.
 * @param props.variant - Fallback treatment; defaults to `contained` and is ignored for non-empty image URLs.
 * @param props.status - Optional presence indicator.
 * @param props.statusLabel - Accessible presence name; defaults to the status value.
 * @param props.statusSize - Presence size; defaults to the avatar size.
 * @param props.fallbackDelay - Delay in milliseconds before showing the fallback; defaults to zero.
 * @param props.onLoadingStatusChange - Receives the image loading status unchanged.
 * @param props.className - Consumer class merged with the root classes.
 * @param props.ref - Ref forwarded to the root span.
 * @returns The avatar and optional presence indicator.
 * @example
 * ```tsx
 * <Avatar aria-label="Jane Doe" initials="JD" status="online" />
 * ```
 */
const AvatarComponent: FC<AvatarProps> = ({
    src,
    alt,
    initials,
    icon,
    size = AVATAR_SIZES.md,
    shape = 'circle',
    color = 'primary',
    variant = 'contained',
    status,
    statusLabel,
    statusSize,
    fallbackDelay,
    onLoadingStatusChange,
    className,
    ref,
    ...props
}) => {
    const hasImage = Boolean(src)
    // The outlined border only frames the initials/icon fallback, not a profile picture.
    const resolvedVariant = hasImage ? AVATAR_VARIANTS.contained : variant

    return (
        <AvatarRoot
            ref={ref}
            size={size}
            shape={shape}
            color={color}
            variant={resolvedVariant}
            className={className}
            {...props}
        >
            {hasImage && (
                <AvatarImage
                    src={src}
                    alt={alt}
                    onLoadingStatusChange={onLoadingStatusChange}
                />
            )}
            <AvatarFallback
                initials={initials}
                icon={icon}
                size={size}
                delay={fallbackDelay}
            />
            {status && (
                <AvatarStatus
                    status={status}
                    size={statusSize ?? size}
                    label={statusLabel}
                />
            )}
        </AvatarRoot>
    )
}

AvatarComponent.displayName = 'Avatar'

/**
 * Displays an accessible profile image or fallback with optional presence.
 * Native span props and ref target the root; defaults are medium, circular,
 * primary and contained. Compose the namespaced slots for custom content.
 *
 * @param props - Avatar presentation and native root span props.
 * @param props.src - Image URL; omitted or empty values display the fallback.
 * @param props.alt - Image alternative; omitted values make the image decorative.
 * @param props.initials - Fallback text, uppercased and limited to two characters.
 * @param props.icon - Decorative fallback SVG used when initials are absent or empty.
 * @param props.size - Avatar size preset; defaults to `md`.
 * @param props.shape - Root shape; defaults to `circle`.
 * @param props.color - Fallback color intent; defaults to `primary`.
 * @param props.variant - Fallback treatment; defaults to `contained` and is ignored for non-empty image URLs.
 * @param props.status - Optional presence indicator.
 * @param props.statusLabel - Accessible presence name; defaults to the status value.
 * @param props.statusSize - Presence size; defaults to the avatar size.
 * @param props.fallbackDelay - Delay in milliseconds before showing the fallback; defaults to zero.
 * @param props.onLoadingStatusChange - Receives the image loading status unchanged.
 * @param props.className - Consumer class merged with the root classes.
 * @param props.ref - Ref forwarded to the root span.
 * @returns The avatar root with its image, fallback and optional status.
 * @example
 * ```tsx
 * <Avatar aria-label="Jane Doe" initials="JD" status="online" />
 * ```
 */
const Avatar: AvatarCompound = Object.assign(AvatarComponent, {
    Root: AvatarRoot,
    Image: AvatarImage,
    Fallback: AvatarFallback,
    Status: AvatarStatus,
})

export default Avatar
