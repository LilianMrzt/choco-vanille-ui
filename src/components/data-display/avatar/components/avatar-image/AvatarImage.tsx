import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import { AVATAR_IMAGE_STYLES } from '@components/data-display/avatar/components/avatar-image/styles/AvatarImage.css.ts'
import type { AvatarImageProps } from '@components/data-display/avatar/components/avatar-image/types/AvatarImage.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

const AvatarImage: FC<AvatarImageProps> = memo(({
    src,
    alt,
    onLoadingStatusChange,
    className,
    ...props
}) => (
    <BaseAvatar.Image
        src={src}
        alt={alt ?? ''}
        className={cn(AVATAR_IMAGE_STYLES.recipe(), className)}
        onLoadingStatusChange={onLoadingStatusChange}
        {...props}
    />
))

AvatarImage.displayName = 'Avatar.Image'

export default AvatarImage
