import type { AvatarGroupSpacing } from '@components/data-display/avatar-group/types'

/** Negative overlap offsets in rem; `none` leaves avatars adjacent. */
export const AVATAR_GROUP_SPACING: Readonly<Record<AvatarGroupSpacing, string>> = {
    none: '0',
    sm: '-0.5rem',
    md: '-0.75rem',
    lg: '-1rem',
    xl: '-1.5rem',
}
