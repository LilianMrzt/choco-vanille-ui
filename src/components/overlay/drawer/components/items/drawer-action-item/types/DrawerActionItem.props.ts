import type { IconSize } from '@components/foundation/icon'
import type {
    DrawerItemColor,
    DrawerItemSize,
    DrawerItemVariant,
} from '@components/overlay/drawer/components/items/_shared'
import type * as React from 'react'
import type { ReactNode, RefAttributes } from 'react'

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
    /** Accessible label for the button. Defaults to `label`. */
    'aria-label'?: string;
  };
