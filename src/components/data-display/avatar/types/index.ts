import type { FC, HTMLAttributes, RefAttributes } from 'react'
import type { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import type { IconComponent } from '@components/foundation/icon'
import type {
    AVATAR_COLORS,
    AVATAR_SHAPES,
    AVATAR_SIZES,
    AVATAR_STATUS,
    AVATAR_VARIANTS,
} from '@components/data-display/avatar/constants'

import type AvatarFallback from '@components/data-display/avatar/components/avatar-fallback/AvatarFallback.tsx'
import type AvatarImage from '@components/data-display/avatar/components/avatar-image/AvatarImage.tsx'
import type AvatarRoot from '@components/data-display/avatar/components/avatar-root/AvatarRoot.tsx'
import type AvatarStatusComponent from '@components/data-display/avatar/components/avatar-status/AvatarStatus.tsx'

/**
 * Badge-aligned treatments: solid `contained`, soft `subtle`, transparent
 * `outlined`, or soft `outlinedSubtle` with a colored border.
 */
export type AvatarVariant = (typeof AVATAR_VARIANTS)[keyof typeof AVATAR_VARIANTS]

/** Supported avatar size presets. */
export type AvatarSize = (typeof AVATAR_SIZES)[keyof typeof AVATAR_SIZES]

/** Supported root shapes. */
export type AvatarShape = (typeof AVATAR_SHAPES)[keyof typeof AVATAR_SHAPES]

/** Semantic intent of the fallback surface and foreground. */
export type AvatarColor = (typeof AVATAR_COLORS)[keyof typeof AVATAR_COLORS]

/** Presence indicators displayed at the avatar edge. */
export type AvatarStatus = (typeof AVATAR_STATUS)[keyof typeof AVATAR_STATUS]

/** Convenience avatar props; native attributes, events and ref target the root span. */
export type AvatarProps = Readonly<HTMLAttributes<HTMLSpanElement> & RefAttributes<HTMLSpanElement> & {
    /** Image URL. Omitted or empty URLs display the fallback. */
    src?: string
    /** Informative image alternative; defaults to an empty decorative alternative. */
    alt?: string
    /** Fallback initials, uppercased and limited to two characters. */
    initials?: string
    /** Decorative SVG fallback when initials are absent or empty; defaults to a user icon. */
    icon?: IconComponent
    /** Avatar size. Defaults to `md`. */
    size?: AvatarSize
    /** Root shape. Defaults to `circle`. */
    shape?: AvatarShape
    /** Fallback semantic intent. Defaults to `primary`. */
    color?: AvatarColor
    /** Solid `contained`, soft `subtle`, transparent `outlined`, or soft bordered `outlinedSubtle`. Defaults to `outlinedSubtle`; also applies to images and their fallbacks. */
    variant?: AvatarVariant
    /** Optional presence indicator. */
    status?: AvatarStatus
    /** Presence accessible name; defaults to the status value. */
    statusLabel?: string
    /** Presence size; defaults to the avatar size. */
    statusSize?: AvatarSize
    /** Milliseconds before showing fallback content; defaults to zero. */
    fallbackDelay?: BaseAvatar.Fallback.Props['delay']
    /** Receives the image loading status (`idle`, `loading`, `loaded`, `error`) unchanged. */
    onLoadingStatusChange?: BaseAvatar.Image.Props['onLoadingStatusChange']
}>

/** Root styling vocabulary, independent of generated stylesheet types. */
export type AvatarRecipeVariants = Readonly<{
    size?: AvatarSize
    shape?: AvatarShape
    color?: AvatarColor
    variant?: AvatarVariant
}>

/** Avatar convenience component and its composable public slots. */
export type AvatarCompound = FC<AvatarProps> & Readonly<{
    Root: typeof AvatarRoot
    Image: typeof AvatarImage
    Fallback: typeof AvatarFallback
    Status: typeof AvatarStatusComponent
}>
