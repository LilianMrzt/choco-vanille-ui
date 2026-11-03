import { TYPOGRAPHY_STYLES } from '@components/foundation/typography/styles/Typography.css.ts'
import { TYPOGRAPHY_ELEMENT_MAP } from '@components/foundation/typography/constants'
import type { TypographyProps } from '@components/foundation/typography/types/Typography.props.ts'
import type { TypographyVariant } from '@components/foundation/typography/types/Typography.types.ts'
import { cn } from '@utils/cn.ts'
import { memo, type CSSProperties, type FC } from 'react'

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
 *
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
