import type * as React from 'react'

import type { Toggle } from '@base-ui/react/toggle'

import type { ToggleIconButtonRecipeVariants } from '@components/actions/toggle-icon-button/styles/ToggleIconButton.css.ts'

export type ToggleIconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label' | 'color'
> &
  ToggleIconButtonRecipeVariants &
  Pick<
    Toggle.Props,
    'pressed' | 'defaultPressed' | 'onPressedChange' | 'value' | 'disabled'
  > & {
    /** Ref forwarded to the underlying `<button>` element. */
    ref?: React.Ref<HTMLButtonElement>;
    /** Iconify icon name rendered inside the button. */
    icon: string;
    /** Accessible label for the button (used as aria-label). */
    'aria-label': string;
  };
