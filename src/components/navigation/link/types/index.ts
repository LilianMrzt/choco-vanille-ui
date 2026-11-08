import type { IconifyIcon, IconSize } from '@components/foundation/icon'
import type { TypographySize, TypographyWeight } from '@components/foundation/typography'
import type { BoxProps } from '@components/layout/box/types'
import type { ThemeColorValue } from '@theme'
import type * as React from 'react'

/** Theme colors supported by the Link component. */
export type LinkColor = ThemeColorValue

export type LinkProps = Readonly<
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> &
    React.RefAttributes<HTMLAnchorElement> & {
        /** The destination URL. Defaults to `#`. */
        href?: string
        /** Visible text label. */
        label: string
        /** Theme color at rest; interaction states use the semantic link colors. */
        color?: LinkColor
        /** Decorative icon before the label. */
        startIcon?: IconifyIcon
        /** Decorative icon after the label. */
        endIcon?: IconifyIcon
        /** Label font size. Defaults to `16`. */
        fontSize?: TypographySize
        /** Label font weight. Defaults to `normal`. */
        fontWeight?: TypographyWeight
        /** Font-size token for the icons. Defaults to 16. */
        iconSize?: IconSize
    } &
    Pick<BoxProps, 'margin' | 'marginTop' | 'marginRight' | 'marginBottom' | 'marginLeft' | 'width' | 'alignSelf' | 'padding'>
>
