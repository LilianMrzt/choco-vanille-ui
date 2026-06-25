import type * as React from 'react'

import type { ButtonRecipeVariants } from '@components/actions/button/Button.css.ts'
import type { RefAttributes } from 'react'

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  RefAttributes<HTMLButtonElement> &
  ButtonRecipeVariants & {
    /** The text content rendered inside the button via the Typography component. */
    label?: string;
    /** Iconify icon name rendered before the label. Size and color are derived from the Button variant and size. */
    startIcon?: string;
    /** Iconify icon name rendered after the label. Size and color are derived from the Button variant and size. */
    endIcon?: string;
  };
