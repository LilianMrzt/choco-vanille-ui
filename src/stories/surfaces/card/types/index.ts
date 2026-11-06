import type { CardProps } from '@components/surfaces/card'
import type { TypographyProps } from '@components/foundation/typography'
import type { BoxSpace, BoxVariant } from '@components/layout/box'

/** Story-only composition controls and card props. */
export type CardStoryArgs = Omit<CardProps, 'as'> & {
    as?: BoxVariant
    headerAs?: 'div' | 'header'
    title?: string
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    titleFontSize?: TypographyProps['fontSize']
    titleFontWeight?: TypographyProps['fontWeight']
    description?: string
    descriptionFontSize?: TypographyProps['fontSize']
    bodyAs?: 'div' | 'section'
    bodyPadding?: BoxSpace
    footerAs?: 'div' | 'footer'
    showFooter?: boolean
    footerActionLabel?: string
}
