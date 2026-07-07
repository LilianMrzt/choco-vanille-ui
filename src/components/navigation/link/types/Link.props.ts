import type { IconSize } from '@components/foundation/icon'
import type { TypographySize, TypographyWeight } from '@components/foundation/typography'
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
    /** Optional Iconify icon name rendered before the label. */
    startIcon?: string
    /** Optional Iconify icon name rendered after the label. */
    endIcon?: string
    /** Typography size of the label. Defaults to `base`. */
    fontSize?: TypographySize
    /** Typography weight of the label. Defaults to `medium`. */
    fontWeight?: TypographyWeight
    /** Size of the start/end icons. Defaults to `md`. */
    iconSize?: IconSize
  }
