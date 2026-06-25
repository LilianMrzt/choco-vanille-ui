import { Slot } from '@radix-ui/react-slot'

import { typographyRecipe } from '@components/foundation/typography/Typography.css.ts'
import { TYPOGRAPHY_ELEMENT_MAP } from '@components/foundation/typography/constants/typographyElementMap.const.ts'
import type { TypographyProps } from '@components/foundation/typography/types/Typography.props.ts'
import type { TypographyVariant } from '@components/foundation/typography/types/Typography.types.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const Typography: FC<TypographyProps> = ({
    as,
    asChild,
    variant,
    fontSize,
    fontWeight,
    ellipsis,
    className,
    ref,
    ...props
}) => {
    const Element = asChild
        ? Slot
        : (as ?? TYPOGRAPHY_ELEMENT_MAP[(variant as TypographyVariant) ?? 'p'] ?? 'p')

    return (
        <Element
            ref={ref}
            className={cn(typographyRecipe({ variant, fontSize, fontWeight, ellipsis }), className)}
            {...props}
        />
    )
}

Typography.displayName = 'Typography'

export default Typography
