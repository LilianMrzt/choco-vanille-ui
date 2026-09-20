import type { IconComponent, IconSize } from '@components/foundation/icon'
import type { TypographySize, TypographyWeight } from '@components/foundation/typography'
import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import type { LinkColor } from '@components/navigation/link/types/Link.types.ts'
import type * as React from 'react'
import type { RefAttributes } from 'react'

export type LinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'children'
> &
  RefAttributes<HTMLAnchorElement> & {
    /** The destination URL rendered as the native `href` attribute. */
    href?: string
    /** The visible text label rendered inside the link. */
    label: string
    /** Theme color of the link. Defaults to the semantic link color. */
    color?: LinkColor
    /** Optional SVG component rendered before the label. */
    startIcon?: IconComponent
    /** Optional SVG component rendered after the label. */
    endIcon?: IconComponent
    /** Typography size of the label. Defaults to `base`. */
    fontSize?: TypographySize
    /** Typography weight of the label. Defaults to `normal`. */
    fontWeight?: TypographyWeight
    /** Size of the start/end icons. Defaults to `md`. */
    iconSize?: IconSize
  } &
  Pick<
    BoxProps,
    'margin' | 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft' | 'width' | 'alignSelf' | 'padding'
  >
