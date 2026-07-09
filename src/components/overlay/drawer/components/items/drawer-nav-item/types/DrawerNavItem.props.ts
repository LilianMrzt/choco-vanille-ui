import type { IconSize } from '@components/foundation/icon'
import type { DrawerItemSize } from '@components/overlay/drawer/components/items/drawer-item'
import type * as React from 'react'
import type { RefAttributes } from 'react'

/** Props for `Drawer.NavItem`. */
export type DrawerNavItemProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'children'
> &
  RefAttributes<HTMLAnchorElement> & {
    /** Visible text label. */
    label: string;
    /** Destination URL. @default '#' */
    href?: string;
    /** Optional icon rendered before the label. */
    startIcon?: string;
    /** Optional icon rendered after the label. */
    endIcon?: string;
    /** Whether the item represents the current page. */
    active?: boolean;
    /** Disables the item and sets `aria-disabled`. */
    disabled?: boolean;
    /** Accessible label for the link. Defaults to `label`. */
    'aria-label'?: string;
    /** Size preset for the row. @default 'md' */
    size?: DrawerItemSize;
    /** Size of the start/end icons. Defaults to the row size mapping. */
    iconSize?: IconSize;
  };
