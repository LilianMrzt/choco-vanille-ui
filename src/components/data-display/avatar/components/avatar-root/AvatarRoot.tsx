import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import { AVATAR_STYLES } from '@components/data-display/avatar/components/avatar-root/styles/AvatarRoot.css.ts'
import type { AvatarRootProps } from '@components/data-display/avatar/components/avatar-root/types/AvatarRoot.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const AvatarRoot: FC<AvatarRootProps> = ({
    size,
    shape,
    color,
    className,
    ref,
    ...props
}) => (
    <BaseAvatar.Root
        ref={ref}
        className={cn(
            AVATAR_STYLES.recipe({ size, shape, color }),
            className,
        )}
        {...props}
    />
)

AvatarRoot.displayName = 'Avatar.Root'

export default AvatarRoot
