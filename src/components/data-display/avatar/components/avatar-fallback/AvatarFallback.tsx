import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import { AVATAR_FALLBACK_STYLES } from '@components/data-display/avatar/components/avatar-fallback/styles/AvatarFallback.css.ts'
import type { AvatarFallbackProps } from '@components/data-display/avatar/components/avatar-fallback/types/AvatarFallback.props.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'
import {
    AVATAR_SIZE_TO_TYPOGRAPHY_SIZE
} from '@components/data-display/avatar/components/avatar-fallback/constants/sizeToTypography.const.ts'
import { IconRegistry } from '@constants'

const AvatarFallback: FC<AvatarFallbackProps> = memo(({
    initials,
    icon,
    size = 'md',
    delay,
    className,
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
        <Icon icon={IconRegistry.user} />
    )

    return (
        <BaseAvatar.Fallback
            className={cn(AVATAR_FALLBACK_STYLES.recipe(), className)}
            delay={delay}
            {...props}
        >
            {fallbackContent}
        </BaseAvatar.Fallback>
    )
})

AvatarFallback.displayName = 'Avatar.Fallback'

export default AvatarFallback
