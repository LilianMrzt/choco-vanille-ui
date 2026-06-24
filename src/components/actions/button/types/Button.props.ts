import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import type { buttonVariants } from '@components/actions/button/Button.styles.ts'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /**
     * When true, the button renders as its child element via Radix Slot,
     * merging props and ref — the shadcn/ui asChild pattern.
     */
    asChild?: boolean;
  };
