import { TYPOGRAPHY_STYLES } from '@components/foundation/typography/Typography.css.ts'
import { TYPOGRAPHY_ELEMENT_MAP } from '@components/foundation/typography/constants'
import type { TypographyProps, TypographyVariant } from '@components/foundation/typography/types'
import { cn } from '@utils/cn.ts'
import { memo, type CSSProperties, type FC } from 'react'

/**
 * Checks whether a string names a supported typography variant.
 * @param value - Candidate element or variant name.
 * @returns Whether the value is present in the typography element map.
 * @example
 * isTypographyVariant('h1')
 */
const isTypographyVariant = (value: string): value is TypographyVariant =>
    Object.prototype.hasOwnProperty.call(TYPOGRAPHY_ELEMENT_MAP, value)

/**
 * Renders text with the library's semantic element, typography scale, and theme tokens.
 *
 * The rendered element defaults to the element associated with `variant` and can
 * be overridden with `as` when a different HTML semantic is required. When
 * `variant` is omitted, a known typography element passed to `as` also selects
 * its matching visual variant.
 * Color accepts CSS values, including `vars.color` references, without token
 * lookup. Consumer `style.color` wins. Omit `color` to preserve inheritance,
 * variant defaults and stylesheet interaction colors; no inline default is set.
 * Native attributes, events and ref target the rendered element.
 *
 * @param props - Typography, element and native attributes.
 * @param props.as - Element override; otherwise selected by the variant.
 * @param props.variant - Typography variant; inferred from `as` or `span` by default.
 * @param props.fontSize - Font-size token override.
 * @param props.fontWeight - Font-weight token override.
 * @param props.color - CSS text color.
 * @param props.textTransform - CSS text transformation.
 * @param props.display - CSS display value.
 * @param props.margin - Margin token or `auto`.
 * @param props.width - CSS width.
 * @param props.minWidth - CSS minimum width.
 * @param props.maxWidth - CSS maximum width.
 * @param props.opacity - CSS opacity.
 * @param props.flex - CSS flex shorthand.
 * @param props.flexGrow - CSS flex growth.
 * @param props.flexShrink - CSS flex shrinkage.
 * @param props.letterSpacing - CSS letter spacing.
 * @param props.ellipsis - Whether to truncate a single line.
 * @param props.maxLines - Multi-line truncation preset.
 * @param props.className - Additional class for the text element.
 * @param props.style - Inline overrides applied after individual style props.
 * @param props.ref - Ref passed to the rendered element.
 * @returns The selected semantic text element.
 * @example
 * ```tsx
 * <Typography variant="h1" fontSize={36} fontWeight="bold">
 *   Welcome
 * </Typography>
 * ```
 */
const Typography: FC<TypographyProps> = memo(({
    as,
    variant,
    fontSize,
    fontWeight,
    color,
    textTransform,
    display,
    margin,
    width,
    minWidth,
    maxWidth,
    opacity,
    flex,
    flexGrow,
    flexShrink,
    letterSpacing,
    ellipsis,
    maxLines,
    className,
    style,
    ref,
    ...props
}) => {
    const inferredVariant = typeof as === 'string' && isTypographyVariant(as) ? as : undefined
    const resolvedVariant = variant ?? inferredVariant ?? 'span'
    const Element = as ?? TYPOGRAPHY_ELEMENT_MAP[resolvedVariant]

    const computedStyle: CSSProperties = {
        color,
        textTransform,
        display,
        width,
        minWidth,
        maxWidth,
        opacity,
        flex,
        flexGrow,
        flexShrink,
        letterSpacing,
        ...style,
    }

    return (
        <Element
            ref={ref}
            className={cn(TYPOGRAPHY_STYLES.recipe({ variant: resolvedVariant, fontSize, fontWeight, margin, ellipsis, maxLines }), className)}
            style={computedStyle}
            {...props}
        />
    )
})

Typography.displayName = 'Typography'

export default Typography
