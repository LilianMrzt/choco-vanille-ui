import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import type { typographyVariants } from '@/components/foundation/typography'

export type TypographyProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
  VariantProps<typeof typographyVariants> & {
    /** Override the rendered HTML element. */
    as?: React.ElementType;
  };
