import type * as React from 'react'

import type { ButtonColor, ButtonSize, ButtonVariant } from '@components/actions/button/types/Button.types.ts'

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'color'
> &
  {
    /** Visual style variant of the button. */
    variant?: ButtonVariant;
    /** Theme color of the button. */
    color?: ButtonColor;
    /** Button size. Defaults to `md`. */
    size?: ButtonSize;
    /** Ref forwarded to the underlying `<button>` element. */
    ref?: React.Ref<HTMLButtonElement>;
    /** The text content rendered inside the button via the Typography component. */
    label: string;
    /** Iconify icon name rendered before the label. Size and color are derived from the Button variant and size. */
    startIcon?: string;
    /** Iconify icon name rendered after the label. Size and color are derived from the Button variant and size. */
    endIcon?: string;
    /** Whether the button is in an active/pressed state, e.g. when it triggers an open menu. */
    active?: boolean;
  };
