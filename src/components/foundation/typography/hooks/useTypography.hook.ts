import { TYPOGRAPHY_ELEMENT_MAP } from '@/components/foundation/typography';
import { typographyVariants } from '@/components/foundation/typography';
import type { TypographyProps } from '@/components/foundation/typography';
import type { TypographyVariant } from '@/components/foundation/typography';
import {mergeClassNames} from "@/utils/mergeClassNames.ts";

export const useTypography = ({
  as,
  variant,
  fontSize,
  fontWeight,
  ellipsis,
  className,
}: Pick<TypographyProps, 'as' | 'variant' | 'fontSize' | 'fontWeight' | 'ellipsis' | 'className'>) => {
  const element = as ?? TYPOGRAPHY_ELEMENT_MAP[(variant as TypographyVariant) ?? 'p'] ?? 'p';

  const resolvedClassName = mergeClassNames(
    typographyVariants({ variant, fontSize, fontWeight, ellipsis }),
    className,
  );

  return { element, resolvedClassName };
};
