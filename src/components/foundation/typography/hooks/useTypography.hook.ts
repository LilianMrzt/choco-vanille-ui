import {
    TYPOGRAPHY_ELEMENT_MAP,
    type TypographyProps,
    type TypographyVariant,
    typographyVariants
} from '@components/foundation/typography'
import { mergeClassNames } from '@/utils/mergeClassNames.ts'

export const useTypography = ({
    as,
    variant,
    fontSize,
    fontWeight,
    ellipsis,
    className,
}: Partial<Pick<TypographyProps, 'as' | 'variant' | 'fontSize' | 'fontWeight' | 'ellipsis' | 'className'>>) => {
    const element = as ?? TYPOGRAPHY_ELEMENT_MAP[(variant as TypographyVariant) ?? 'p'] ?? 'p'

    const resolvedClassName = mergeClassNames(
        typographyVariants({ variant, fontSize, fontWeight, ellipsis }),
        className,
    )

    return { element, resolvedClassName }
}
