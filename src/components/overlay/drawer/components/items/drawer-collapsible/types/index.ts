import type {
    DrawerItemColor,
} from '@components/overlay/drawer/components/items/_shared'
import type * as React from 'react'
import type { ReactNode } from 'react'

/** Props for `Drawer.Collapsible`. */
export type DrawerCollapsibleProps = Readonly<Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'onClick'
> & {
  /** Visible text label for the section header. */
  label: string;
  /** Icon rendered before the label. */
  startIcon: IconifyIcon;
  /** Icon rendered after the label and trailing content, before the expansion chevron. */
  endIcon?: IconifyIcon;
  /** Items rendered inside the collapsible section. */
  children: ReactNode;
  /** Optional content rendered at the end of the header (e.g. a badge). */
  trailing?: ReactNode;
  /** Whether to suppress the tooltip when the drawer is collapsed. @default false */
  hideTooltip?: boolean;
  /** Accessible label for the section region. Defaults to `label`. */
  sectionLabel?: string;
  /** Initial expanded state when uncontrolled. @default false */
  defaultExpanded?: boolean;
  /** Controlled expanded state. */
  expanded?: boolean;
  /** Called when the expanded state changes. */
  onExpandedChange?: (expanded: boolean) => void;
  /** Color intent for the header row. @default 'primary' */
  color?: DrawerItemColor;
  /** Accessible label for the section header. Defaults to `label`. */
  'aria-label'?: string;
}>
import type { IconifyIcon } from '@components/foundation/icon'
