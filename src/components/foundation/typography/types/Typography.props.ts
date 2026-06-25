import type * as React from 'react'

import type { TypographyRecipeVariants } from '@components/foundation/typography/Typography.css.ts'
import type { RefAttributes } from 'react'

export type TypographyProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
  RefAttributes<HTMLElement> &
  TypographyRecipeVariants & {
    /** Override the rendered HTML element. */
    as?: React.ElementType;
    /**
     * When true, renders as the child element via Radix Slot,
     * merging props and ref — the shadcn/ui asChild pattern.
     * Takes precedence over `as` and `variant` element resolution.
     */
    asChild?: boolean;
  };
