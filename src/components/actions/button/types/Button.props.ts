import type * as React from 'react'

import type { ButtonRecipeVariants } from '@components/actions/button/Button.css.ts'

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  ButtonRecipeVariants & {
    /** The text content rendered inside the button via the Typography component. */
    label?: string;
  };
