import type { AvatarSize } from '@components/data-display/avatar/types'
import type { TypographySize } from '@components/foundation/typography'

/** Font-size tokens for fallback initials, keyed by avatar size. */
export const AVATAR_SIZE_TO_TYPOGRAPHY_SIZE: Readonly<Record<AvatarSize, TypographySize>> = {
    sm: 10,
    md: 12,
    lg: 14,
    xl: 16,
}
