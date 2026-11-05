import type { AvatarSize } from '@components/data-display/avatar/types'

/** Presence dot dimensions in rem, equivalent to 8–14px at a 16px root. */
export const AVATAR_STATUS_DIMENSIONS: Readonly<Record<AvatarSize, string>> = {
    sm: '0.5rem',
    md: '0.625rem',
    lg: '0.75rem',
    xl: '0.875rem',
}
