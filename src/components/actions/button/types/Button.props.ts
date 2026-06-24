import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import type { buttonVariants } from '@components/actions/button/Button.styles.ts'

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  VariantProps<typeof buttonVariants> & {
    /** The text content rendered inside the button via the Typography component. */
    label?: string;
  };
