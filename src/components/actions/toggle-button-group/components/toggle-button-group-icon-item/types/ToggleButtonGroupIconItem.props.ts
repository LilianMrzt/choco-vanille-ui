import type * as React from 'react'

import type { Toggle } from '@base-ui/react/toggle'

import type { ToggleButtonGroupIconItemRecipeVariants } from '@components/actions/toggle-button-group/components/toggle-button-group-icon-item/styles/ToggleButtonGroupIconItem.css.ts'

export type ToggleButtonGroupIconItemProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label' | 'color'
> &
  Pick<ToggleButtonGroupIconItemRecipeVariants, 'size' | 'color' | 'radius'> &
  Pick<Toggle.Props, 'value' | 'disabled'> & {
    /** Ref forwarded to the underlying `<button>` element. */
    ref?: React.Ref<HTMLButtonElement>;
    /** Iconify icon name rendered inside the item. */
    icon: string;
    /** Accessible label for the item (used as aria-label). */
    'aria-label': string;
  };
