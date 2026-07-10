import { TYPOGRAPHY_STYLES } from '@components/foundation/typography/styles/Typography.css.ts'
import { TYPOGRAPHY_ELEMENT_MAP } from '@components/foundation/typography/constants'
import type { TypographyProps } from '@components/foundation/typography/types/Typography.props.ts'
import type { TypographyVariant } from '@components/foundation/typography/types/Typography.types.ts'
import { cn } from '@utils/cn.ts'
import { vars } from '@theme/contract.css.ts'
import { memo, type CSSProperties, type FC } from 'react'

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
    const Element = as ?? TYPOGRAPHY_ELEMENT_MAP[(variant as TypographyVariant) ?? 'span'] ?? 'span'

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
            className={cn(TYPOGRAPHY_STYLES.recipe({ variant, fontSize, fontWeight, ellipsis, maxLines, color }), className)}
            style={computedStyle}
            {...props}
        />
    )
})

Typography.displayName = 'Typography'

export default Typography
