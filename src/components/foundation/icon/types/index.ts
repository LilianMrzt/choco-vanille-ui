import type { IconifyIcon } from '@iconify/react/offline'
import type { CSSProperties, SVGProps } from 'react'
import type { FontSize } from '@theme/tokens/typography/types'

import type {
    BoxBorderRadius,
    BoxSpace,
} from '@components/layout/box/types'
/** Font-size token used for both SVG dimensions. */
export type IconSize = FontSize

/** CSS icon colors, including theme and external custom property references. */
export type IconColor = CSSProperties['color']

/** SVG attributes and wrapper appearance for an icon. */
export type IconProps = Readonly<Omit<SVGProps<SVGSVGElement>, 'children' | 'color' | 'dangerouslySetInnerHTML' | 'mode' | 'onLoad' | 'rotate' | 'viewBox'> & {
    /** Trusted, locally imported Iconify SVG data; icon names are not accepted. */
    icon: IconifyIcon
    /** Font-size token for the SVG dimensions. Defaults to `16`. */
    size?: IconSize
    /** Whether the icon should continuously rotate. */
    spin?: boolean
    /** CSS color applied to the SVG, including custom property references. */
    color?: IconColor
    /** Padding token applied to the wrapper around the icon. */
    padding?: BoxSpace
    /** CSS color applied to the wrapper's border. */
    borderColor?: CSSProperties['borderColor']
    /** CSS color applied to the wrapper's background. */
    backgroundColor?: CSSProperties['backgroundColor']
    /** The CSS `border-width` value of the wrapper. */
    borderWidth?: CSSProperties['borderWidth']
    /** The CSS `border-style` value of the wrapper. */
    borderStyle?: CSSProperties['borderStyle']
    /** Border radius token applied to the wrapper. */
    borderRadius?: BoxBorderRadius
}>
