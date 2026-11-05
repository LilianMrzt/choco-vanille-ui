import { Avatar } from '@components/data-display/avatar'
import type { AvatarStoryArgs } from '@stories/data-display/avatar/types'
import type { FC } from 'react'

/**
 * Renders independently controlled public compound slots.
 * @internal Not part of the public package API.
 * @param props - Root appearance and demonstration values for each slot, including the native aria-labelledby reference forwarded to Avatar.Root.
 * @param props.compoundImage - Image URL passed to Avatar.Image.
 * @param props.compoundAlt - Alternative text passed to Avatar.Image.
 * @param props.compoundFallback - Initials passed to Avatar.Fallback.
 * @param props.compoundLabel - Accessible name passed to Avatar.Root.
 * @param props.compoundStatus - Optional presence value passed to Avatar.Status.
 * @param props.color - Root fallback color intent.
 * @param props.shape - Root shape.
 * @param props.size - Root and fallback size preset.
 * @param props.variant - Root surface treatment.
 * @param props.fallbackDelay - Delay in milliseconds passed to Avatar.Fallback.
 * @param props.statusLabel - Accessible presence name passed to Avatar.Status.
 * @param props.statusSize - Indicator size override; omitted values use the root size.
 * @param props.onLoadingStatusChange - Loading callback forwarded to Avatar.Image.
 * @param props.className - Consumer class applied to Avatar.Root.
 * @param props.style - Consumer CSS applied to Avatar.Root.
 * @param props.role - Native role applied to Avatar.Root.
 * @param props.onClick - Native click callback forwarded to Avatar.Root.
 * @returns A namespaced Avatar composition.
 * @example
 * <CompoundPlayground compoundFallback="JD" compoundLabel="Jane Doe" />
 */
const CompoundPlayground: FC<AvatarStoryArgs> = ({
    compoundImage,
    compoundAlt,
    compoundFallback,
    compoundLabel,
    compoundStatus,
    color,
    shape,
    size,
    variant,
    fallbackDelay,
    statusLabel,
    statusSize,
    onLoadingStatusChange,
    className,
    style,
    role,
    onClick,
    'aria-labelledby': ariaLabelledBy,
}) => (
    <Avatar.Root
        aria-label={compoundLabel}
        aria-labelledby={ariaLabelledBy}
        className={className}
        color={color}
        shape={shape}
        size={size}
        onClick={onClick}
        role={role}
        style={style}
        variant={variant}
    >
        <Avatar.Image
            alt={compoundAlt}
            onLoadingStatusChange={onLoadingStatusChange}
            src={compoundImage}
        />
        <Avatar.Fallback
            delay={fallbackDelay}
            initials={compoundFallback}
            size={size}
        />
        {compoundStatus && (
            <Avatar.Status
                label={statusLabel}
                size={statusSize ?? size}
                status={compoundStatus}
            />
        )}
    </Avatar.Root>
)

export default CompoundPlayground
