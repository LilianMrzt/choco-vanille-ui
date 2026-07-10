import { AVATAR_STATUS } from '@components/data-display/avatar/constants'
import { AVATAR_STATUS_STYLES } from '@components/data-display/avatar/components/avatar-status/styles/AvatarStatus.css.ts'
import type { AvatarStatusProps } from '@components/data-display/avatar/components/avatar-status/types/AvatarStatus.props.ts'
import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

const AvatarStatus: FC<AvatarStatusProps> = memo(({
    status = AVATAR_STATUS.online,
    size,
    label,
    className,
    ...props
}) => (
    <Box
        as={'span'}
        className={cn(
            AVATAR_STATUS_STYLES.recipe({ size, status }),
            className,
        )}
        aria-label={label ?? status}
        role={'status'}
        {...props}
    />
))

AvatarStatus.displayName = 'Avatar.Status'

export default AvatarStatus
