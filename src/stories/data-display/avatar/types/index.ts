import { type AvatarProps, type AvatarStatus } from '@components/data-display/avatar'

export type AvatarStoryArgs = AvatarProps & Readonly<{
    compoundImage?: string
    compoundAlt?: string
    compoundFallback?: string
    compoundLabel?: string
    compoundStatus?: AvatarStatus
}>
