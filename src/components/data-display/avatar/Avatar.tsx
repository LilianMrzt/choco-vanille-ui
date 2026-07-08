import AvatarFallback from '@components/data-display/avatar/components/avatar-fallback/AvatarFallback.tsx'
import AvatarImage from '@components/data-display/avatar/components/avatar-image/AvatarImage.tsx'
import AvatarRoot from '@components/data-display/avatar/components/avatar-root/AvatarRoot.tsx'
import AvatarStatus from '@components/data-display/avatar/components/avatar-status/AvatarStatus.tsx'
import { AVATAR_SIZES } from '@components/data-display/avatar/constants'
import type { AvatarCompound } from '@components/data-display/avatar/types/index.ts'

const Avatar = (({
    src,
    alt,
    initials,
    icon,
    size = AVATAR_SIZES.md,
    shape = 'circle',
    color = 'primary',
    status,
    statusLabel,
    statusSize,
    ring = false,
    fallbackDelay,
    onLoadingStatusChange,
    className,
    ref,
    ...props
}) => {
    const hasImage = Boolean(src)

    return (
        <AvatarRoot
            ref={ref}
            size={size}
            shape={shape}
            color={color}
            ring={ring}
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
}) as AvatarCompound

Avatar.displayName = 'Avatar'
Avatar.Root = AvatarRoot
Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback
Avatar.Status = AvatarStatus

export { Avatar }
