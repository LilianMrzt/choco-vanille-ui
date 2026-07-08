import { AVATAR_STATUS } from '@components/data-display/avatar/constants'
import { AVATAR_STATUS_STYLES } from '@components/data-display/avatar/components/avatar-status/styles/AvatarStatus.css.ts'
import type { AvatarStatusProps } from '@components/data-display/avatar/components/avatar-status/types/AvatarStatus.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const AvatarStatus: FC<AvatarStatusProps> = ({
    status = AVATAR_STATUS.online,
    size,
    className,
    ...props
}) => (
    <span
        className={cn(
            AVATAR_STATUS_STYLES.recipe({ size, status }),
            className,
        )}
        aria-hidden={'true'}
        {...props}
    />
)

AvatarStatus.displayName = 'Avatar.Status'

export default AvatarStatus
