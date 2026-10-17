import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import { AVATAR_STYLES } from '@components/data-display/avatar/components/avatar-root/styles/AvatarRoot.css.ts'
import type { AvatarRootProps } from '@components/data-display/avatar/components/avatar-root/types/AvatarRoot.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Root container slot for `Avatar`. Applies size, shape, and color recipe
 * classes and wraps Base UI Avatar.Root.
 */
const AvatarRoot: FC<AvatarRootProps> = memo(({
    size,
    shape,
    color,
    variant,
    className,
    ref,
    ...props
}) => (
    <BaseAvatar.Root
        ref={ref}
        className={cn(
            AVATAR_STYLES.recipe({ size, shape, color, variant }),
            className,
        )}
        {...props}
    />
))

AvatarRoot.displayName = 'Avatar.Root'

export default AvatarRoot
