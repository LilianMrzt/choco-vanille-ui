import { Slot } from '@radix-ui/react-slot'

import { typographyVariants } from '@components/foundation/typography/Typography.styles.ts'
import { TYPOGRAPHY_ELEMENT_MAP } from '@components/foundation/typography/constants/typographyElementMap.const.ts'
import type { TypographyProps } from '@components/foundation/typography/types/Typography.props.ts'
import type { TypographyVariant } from '@components/foundation/typography/types/Typography.types.ts'
import { mergeClassNames } from '@/utils/mergeClassNames.ts'

export const useTypography = ({
    as,
    asChild,
    variant,
    fontSize,
    fontWeight,
    ellipsis,
    className,
}: Partial<Pick<TypographyProps, 'as' | 'asChild' | 'variant' | 'fontSize' | 'fontWeight' | 'ellipsis' | 'className'>>) => {
    const element = asChild
        ? Slot
        : (as ?? TYPOGRAPHY_ELEMENT_MAP[(variant as TypographyVariant) ?? 'p'] ?? 'p')

    const resolvedClassName = mergeClassNames(
        typographyVariants({ variant, fontSize, fontWeight, ellipsis }),
        className,
    )

    return { element, resolvedClassName }
}
