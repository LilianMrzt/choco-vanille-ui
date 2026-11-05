import { AVATAR_STATUS } from '@components/data-display/avatar/constants'
import { AVATAR_STATUS_STYLES } from '@components/data-display/avatar/components/avatar-status/AvatarStatus.css.ts'
import type { AvatarStatusProps } from '@components/data-display/avatar/components/avatar-status/types'
import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'
import { AVATAR_STATUS_DIMENSIONS } from '@components/data-display/avatar/components/avatar-status/constants'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Presence/status indicator slot for `Avatar`. Renders a colored dot with
 * `role="status"` and an accessible label derived from `label` or the
 * `status` value. Defaults to online and medium. Native span attributes,
 * events, consumer class/style and ref are forwarded. Supply `label` for a
 * localized accessible name; explicit native ARIA attributes take precedence.
 *
 * @param props - Presence, size, accessible label and native span props.
 * @param props.status - Presence value and default accessible name; defaults to `online`.
 * @param props.size - Indicator size preset; defaults to `md`.
 * @param props.label - Accessible presence name overriding the status value.
 * @param props.className - Consumer class merged with the indicator classes.
 * @param props.ref - Ref forwarded to the indicator span.
 * @returns The status dot positioned at its Avatar.Root edge.
 * @example
 * ```tsx
 * <Avatar.Root aria-label="Jane Doe"><Avatar.Fallback initials="JD" /><Avatar.Status label="Available" /></Avatar.Root>
 * ```
 */
const AvatarStatus: FC<AvatarStatusProps> = ({
    status = AVATAR_STATUS.online,
    size = 'md',
    label,
    className,
    ...props
}) => (
    <Box
        as={'span'}
        borderColor={vars.color.background}
        borderRadius={'full'}
        borderStyle={'solid'}
        borderWidth={'2px'}
        className={cn(
            AVATAR_STATUS_STYLES.recipe({ size, status }),
            className,
        )}
        aria-label={label ?? status}
        height={AVATAR_STATUS_DIMENSIONS[size]}
        position={'absolute'}
        role={'status'}
        width={AVATAR_STATUS_DIMENSIONS[size]}
        {...props}
    />
)

AvatarStatus.displayName = 'Avatar.Status'

export default AvatarStatus
