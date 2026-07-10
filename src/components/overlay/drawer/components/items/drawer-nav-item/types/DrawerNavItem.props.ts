import type { IconSize } from '@components/foundation/icon'
import type {
    DrawerItemColor,
    DrawerItemSize,
    DrawerItemVariant,
} from '@components/overlay/drawer/components/items/_shared'
import type * as React from 'react'
import type { ReactNode, RefAttributes } from 'react'

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
    /** Icon rendered before the label. */
    startIcon: string;
    /** Whether the item represents the current page. */
    active?: boolean;
    /** Disables the item and sets `aria-disabled`. */
    disabled?: boolean;
    /** Accessible label for the link. Defaults to `label`. */
    'aria-label'?: string;
    /** Size preset for the row. @default 'md' */
    size?: DrawerItemSize;
    /** Visual variant for the row. @default 'default' */
    variant?: DrawerItemVariant;
    /** Color intent for the row. @default 'primary' */
    color?: DrawerItemColor;
    /** Size of the start/end icons. Defaults to the row size mapping. */
    iconSize?: IconSize;
    /** Optional content rendered before the end icon (e.g. a badge). */
    trailing?: ReactNode;
  };
