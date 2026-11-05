import type * as React from 'react'

import type { BoxProps } from '@components/layout/box'

/** Preset negative overlap between adjacent avatars. */
export type AvatarGroupSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl'

/** Layout and overflow options for AvatarGroup. */
export type AvatarGroupProps = Readonly<Omit<BoxProps, 'ref' | 'children'> & {
    /** Ref forwarded to the rendered element; defaults to a `<div>`. Custom `as` components must forward it. */
    ref?: React.Ref<HTMLElement>
    /** Avatar elements to stack. */
    children?: React.ReactNode
    /** Maximum visible avatars; finite values are floored and clamped to zero. Omitted values show all children. NaN and either infinity throw RangeError. */
    max?: number
    /** Amount of negative overlap between avatars. Defaults to `md`. */
    spacing?: AvatarGroupSpacing
    /** Accessible label for the overflow indicator. Receives the hidden count. Defaults to `${count} more`. Use this for i18n. */
    overflowLabel?: (count: number) => string
}>
