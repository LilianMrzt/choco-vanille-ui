import type * as React from 'react'

import type { IconButtonRecipeVariants } from '@components/actions/icon-button/styles/IconButton.css.ts'

export type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label' | 'color'
> &
  IconButtonRecipeVariants & {
    /** Ref forwarded to the underlying `<button>` element. */
    ref?: React.Ref<HTMLButtonElement>;
    /** Iconify icon name rendered inside the button. */
    icon: string;
    /** Accessible label for the button (used as aria-label). */
    'aria-label': string;
    /** Whether the button is in an active/pressed state, e.g. when it triggers an open menu. */
    active?: boolean;
  };
