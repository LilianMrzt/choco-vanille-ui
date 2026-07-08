import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import { AVATAR_FALLBACK_STYLES } from '@components/data-display/avatar/components/avatar-fallback/styles/AvatarFallback.css.ts'
import type { AvatarFallbackProps } from '@components/data-display/avatar/components/avatar-fallback/types/AvatarFallback.props.ts'
import { Icon } from '@components/foundation/icon'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const AvatarFallback: FC<AvatarFallbackProps> = ({
    initials,
    icon,
    delay,
    className,
    ...props
}) => {
    const fallbackContent = initials ? (
        <span aria-hidden={'true'}>{initials.slice(0, 2).toUpperCase()}</span>
    ) : icon ? (
        <Icon icon={icon} />
    ) : (
        <Icon icon={'lucide:user'} />
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
}

AvatarFallback.displayName = 'Avatar.Fallback'

export default AvatarFallback
