import { TYPOGRAPHY_STYLES } from '@components/foundation/typography/Typography.css.ts'
import { TYPOGRAPHY_ELEMENT_MAP } from '@components/foundation/typography/constants'
import type { TypographyProps } from '@components/foundation/typography/types/Typography.props.ts'
import type { TypographyVariant } from '@components/foundation/typography/types/Typography.types.ts'
import { vars } from '@theme/contract.css.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const Typography: FC<TypographyProps> = ({
    as,
    variant,
    fontSize,
    fontWeight,
    color,
    ellipsis,
    className,
    style,
    ref,
    ...props
}) => {
    const Element = as ?? TYPOGRAPHY_ELEMENT_MAP[(variant as TypographyVariant) ?? 'p'] ?? 'p'

    return (
        <Element
            ref={ref}
            className={cn(TYPOGRAPHY_STYLES.recipe({ variant, fontSize, fontWeight, ellipsis }), className)}
            style={color ? { color: vars.color[color], ...style } : style}
            {...props}
        />
    )
}

Typography.displayName = 'Typography'

export default Typography
