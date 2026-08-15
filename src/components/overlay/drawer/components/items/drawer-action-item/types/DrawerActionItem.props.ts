import type { IconComponent, IconSize } from '@components/foundation/icon'
import type {
    DrawerItemColor,
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
    startIcon: IconComponent;
    /** Visual variant for the row. @default 'default' */
    variant?: DrawerItemVariant;
    /** Color intent for the row. @default 'primary' */
    color?: DrawerItemColor;
    /** Size of the start/end icons. Defaults to the row size mapping. */
    iconSize?: IconSize;
    /** Optional content rendered before the end icon (e.g. a badge). */
    trailing?: ReactNode;
    /** Whether to suppress the tooltip when the drawer is collapsed. @default false */
    hideTooltip?: boolean;
    /** Accessible label for the button. Defaults to `label`. */
    'aria-label'?: string;
  };
