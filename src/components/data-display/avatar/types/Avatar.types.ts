import type {
    AVATAR_COLORS,
    AVATAR_SHAPES,
    AVATAR_SIZES,
    AVATAR_STATUS,
} from '@components/data-display/avatar/constants'

/** Size variants for the Avatar component. */
export type AvatarSize = (typeof AVATAR_SIZES)[keyof typeof AVATAR_SIZES];

/** Shape variants for the Avatar component. */
export type AvatarShape = (typeof AVATAR_SHAPES)[keyof typeof AVATAR_SHAPES];

/** Semantic color intent used for the fallback surface. */
export type AvatarColor = (typeof AVATAR_COLORS)[keyof typeof AVATAR_COLORS];

/** Status indicator variants for the Avatar component. */
export type AvatarStatus = (typeof AVATAR_STATUS)[keyof typeof AVATAR_STATUS];
