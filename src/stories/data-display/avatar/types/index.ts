import { type AvatarProps, type AvatarStatus } from '@components/data-display/avatar'
import type { AvatarGroupSpacing } from '@components/data-display/avatar-group'

export type AvatarStoryArgs = AvatarProps & Readonly<{
    compoundImage?: string
    compoundAlt?: string
    compoundFallback?: string
    compoundLabel?: string
    compoundStatus?: AvatarStatus
    groupMax?: number
    groupSpacing?: AvatarGroupSpacing
    groupLabel?: string
    groupOverflowLabel?: (count: number) => string
}>
