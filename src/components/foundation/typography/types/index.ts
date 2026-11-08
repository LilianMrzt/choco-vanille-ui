import type { FontSize } from '@theme/tokens/typography/types/index.ts'
import type { FONT_FAMILY } from '@theme/tokens/typography/typography.const.ts'
import type {
    ComponentPropsWithRef,
    CSSProperties,
    ElementType,
    ReactElement,
} from 'react'
import type {
    BoxInlineStyle,
    BoxStyleProps,
} from '@components/layout/box/types'

/** All HTML text-level semantic elements supported by the Typography component. */
export type TypographyVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'label'
    | 'small'
    | 'strong'
    | 'em'
    | 'blockquote'
    | 'pre'
    | 'code'
    | 'kbd'
    | 'samp'
    | 'abbr'
    | 'cite'
    | 'mark'
    | 'del'
    | 'ins'
    | 'sub'
    | 'sup'

/** Font-size scale exposed as a prop. */
export type TypographySize = FontSize

/** Font-weight scale exposed as a prop. */
export type TypographyWeight =
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black'

/** Layout and typography props, independent of generated styling types. */
export type TypographyStyleProps = BoxStyleProps &
    Readonly<{
        /** Visual preset; also selects the native element when as is omitted. */
        variant?: TypographyVariant
        /** Font-size token override. */
        fontSize?: TypographySize
        /** Font-weight token override. */
        fontWeight?: TypographyWeight
        /** Theme font family. */
        fontFamily?: keyof typeof FONT_FAMILY
        /** CSS line height. */
        lineHeight?: CSSProperties['lineHeight']
        /** CSS font style, overriding the semantic preset. */
        fontStyle?: CSSProperties['fontStyle']
        /** CSS vertical alignment of inline text. */
        verticalAlign?: CSSProperties['verticalAlign']
        /** CSS tracking. */
        letterSpacing?: CSSProperties['letterSpacing']
        /** CSS text transformation. */
        textTransform?: CSSProperties['textTransform']
        /** CSS text alignment. */
        textAlign?: CSSProperties['textAlign']
        /** CSS white-space handling. */
        whiteSpace?: CSSProperties['whiteSpace']
        /** CSS word wrapping. */
        overflowWrap?: CSSProperties['overflowWrap']
        /** CSS word breaking. */
        wordBreak?: CSSProperties['wordBreak']
        /** CSS text wrapping. */
        textWrap?: CSSProperties['textWrap']
        /** CSS text decoration. */
        textDecoration?: CSSProperties['textDecoration']
        /** Truncate a constrained single line. */
        ellipsis?: boolean
        /** Positive integer line limit; takes precedence over ellipsis. */
        maxLines?: number
    }>

/** Attributes and ref for the selected element or custom component. */
export type TypographyProps<Element extends ElementType = 'span'> =
    TypographyStyleProps & {
        readonly as?: Element
        readonly style?: BoxInlineStyle
        readonly [key: `data-${string}`]: string | number | boolean | undefined
    } & Readonly<
            Omit<
                ComponentPropsWithRef<NoInfer<Element>>,
                keyof TypographyStyleProps | 'as' | 'style'
            >
        >

/** Element override wins over the visual variant; defaults to span. */
export type TypographyComponent = {
    <Element extends ElementType>(
        props: TypographyProps<Element> & Readonly<{ as: Element }>,
    ): ReactElement
    <Variant extends TypographyVariant>(
        props: TypographyProps<Variant> &
            Readonly<{ as?: undefined; variant: Variant }>,
    ): ReactElement
    (
        props: TypographyProps &
            Readonly<{ as?: undefined; variant?: undefined }>,
    ): ReactElement
}
