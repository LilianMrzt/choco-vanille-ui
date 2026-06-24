import * as React from 'react';

import { cn } from '@/lib/utils.ts';
import { TYPOGRAPHY_ELEMENT_MAP } from './constants/typographyElementMap.const.ts';
import { typographyVariants } from './constants/typographyVariants.const.ts';
import type { TypographyProps } from './types/Typography.props.ts';
import type { TypographyVariant } from './types/Typography.types.ts';

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as, variant, fontSize, fontWeight, ellipsis, className, ...props }, ref) => {
    const Element =
      as ?? TYPOGRAPHY_ELEMENT_MAP[(variant as TypographyVariant) ?? 'p'] ?? 'p';

    return (
      <Element
        ref={ref}
        className={cn(
          typographyVariants({ variant, fontSize, fontWeight, ellipsis }),
          className,
        )}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';
