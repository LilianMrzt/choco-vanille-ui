import type { IconSize } from '@components/foundation/icon'
import type { DrawerItemSize } from '@components/overlay/drawer/components/items/_shared'
import type * as React from 'react'
import type { RefAttributes } from 'react'

/** Props for `Drawer.ActionItem`. */
export type DrawerActionItemProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  RefAttributes<HTMLButtonElement> & {
    /** Visible text label. */
    label: string;
    /** Icon rendered before the label. */
    startIcon: string;
    /** Optional icon rendered after the label. */
    endIcon?: string;
    /** Size preset for the row. @default 'md' */
    size?: DrawerItemSize;
    /** Size of the start/end icons. Defaults to the row size mapping. */
    iconSize?: IconSize;
    /** Accessible label for the button. Defaults to `label`. */
    'aria-label'?: string;
  };
