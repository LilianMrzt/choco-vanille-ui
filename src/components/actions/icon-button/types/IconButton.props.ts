import type * as React from 'react'

import type { IconButtonRecipeVariants } from '@components/actions/icon-button/IconButton.css.ts'
import type { RefAttributes } from 'react'

export type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label'
> &
  RefAttributes<HTMLButtonElement> &
  IconButtonRecipeVariants & {
    /** Iconify icon name rendered inside the button. */
    icon: string;
    /** Accessible label for the button. */
    'aria-label': string;
  };
