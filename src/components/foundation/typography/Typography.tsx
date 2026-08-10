import { TYPOGRAPHY_STYLES } from '@components/foundation/typography/styles/Typography.css.ts'
import { TYPOGRAPHY_ELEMENT_MAP } from '@components/foundation/typography/constants'
import type { TypographyProps } from '@components/foundation/typography/types/Typography.props.ts'
import type { TypographyVariant } from '@components/foundation/typography/types/Typography.types.ts'
import { cn } from '@utils/cn.ts'
import { vars } from '@theme/contract.css.ts'
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
 *
 * @example
 * ```tsx
 * <Typography variant="h1" fontSize="4xl" fontWeight="bold">
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
        textTransform,
        display,
        width,
        minWidth,
        maxWidth,
        opacity,
        flex,
        flexGrow,
        flexShrink,
        letterSpacing: letterSpacing ? vars.letterSpacing[letterSpacing] : undefined,
        ...style,
    }

    return (
        <Element
            ref={ref}
            className={cn(TYPOGRAPHY_STYLES.recipe({ variant: resolvedVariant, fontSize, fontWeight, ellipsis, maxLines, color }), className)}
            style={computedStyle}
            {...props}
        />
    )
})

Typography.displayName = 'Typography'

export default Typography
