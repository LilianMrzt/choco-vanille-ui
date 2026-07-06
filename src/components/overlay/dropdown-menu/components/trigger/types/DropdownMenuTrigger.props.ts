import type { Menu } from '@base-ui/react/menu'
import type { ReactElement } from 'react'

/**
 * Props for the `DropdownMenuTrigger` wrapper.
 *
 * Unlike Base UI's own `Menu.Trigger` (which uses a `render` prop), this wrapper
 * keeps the familiar `children` API: pass your own element as `children` and it is
 * forwarded to Base UI's `render` prop internally.
 */
export type DropdownMenuTriggerProps = Omit<Menu.Trigger.Props, 'render' | 'children'> & {
  /** The element that triggers the menu — forwarded to Base UI's `render` prop. */
  children: ReactElement;
};
