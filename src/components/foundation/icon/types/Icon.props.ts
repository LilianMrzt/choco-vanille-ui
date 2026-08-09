import type { CSSProperties, SVGProps } from 'react'

import type {
    BoxBorderRadius,
    BoxColor,
    BoxSpace,
} from '@components/layout/box/types/Box.types.ts'
import type {
    IconColor,
    IconComponent,
    IconSize,
} from '@components/foundation/icon/types/Icon.types.ts'

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'aria-hidden' | 'role' | 'color'> & {
    /** Locally bundled SVG component to render. */
    icon: IconComponent
    /** Icon size. Defaults to `md`. */
    size?: IconSize
    /** Whether the icon should continuously rotate. */
    spin?: boolean
    /** Optional theme color token applied to the icon's `color` CSS property. */
    color?: IconColor
    /** Padding token applied to the wrapper around the icon. */
    padding?: BoxSpace
    /** Theme color token applied to the wrapper's border color. */
    borderColor?: BoxColor
    /** Theme color token applied to the wrapper's background color. */
    backgroundColor?: BoxColor
    /** The CSS `border-width` value of the wrapper. */
    borderWidth?: CSSProperties['borderWidth']
    /** The CSS `border-style` value of the wrapper. */
    borderStyle?: CSSProperties['borderStyle']
    /** Border radius token applied to the wrapper. */
    borderRadius?: BoxBorderRadius
}
