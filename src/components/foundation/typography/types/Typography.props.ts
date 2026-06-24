import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import type { typographyVariants } from '@components/foundation/typography/Typography.styles.ts'

export type TypographyProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
  VariantProps<typeof typographyVariants> & {
    /** Override the rendered HTML element. */
    as?: React.ElementType;
    /**
     * When true, renders as the child element via Radix Slot,
     * merging props and ref — the shadcn/ui asChild pattern.
     * Takes precedence over `as` and `variant` element resolution.
     */
    asChild?: boolean;
  };
