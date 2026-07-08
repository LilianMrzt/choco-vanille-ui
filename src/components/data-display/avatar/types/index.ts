export type { AvatarProps } from '@components/data-display/avatar/types/Avatar.props.ts'
export type {
    AvatarColor,
    AvatarShape,
    AvatarSize,
    AvatarStatus,
} from '@components/data-display/avatar/types/Avatar.types.ts'

import type { FC } from 'react'

import type AvatarFallback from '@components/data-display/avatar/components/avatar-fallback/AvatarFallback.tsx'
import type AvatarImage from '@components/data-display/avatar/components/avatar-image/AvatarImage.tsx'
import type AvatarRoot from '@components/data-display/avatar/components/avatar-root/AvatarRoot.tsx'
import type AvatarStatus from '@components/data-display/avatar/components/avatar-status/AvatarStatus.tsx'
import type { AvatarProps } from '@components/data-display/avatar/types/Avatar.props.ts'

export type AvatarCompound = FC<AvatarProps> & {
    Root: typeof AvatarRoot
    Image: typeof AvatarImage
    Fallback: typeof AvatarFallback
    Status: typeof AvatarStatus
}
