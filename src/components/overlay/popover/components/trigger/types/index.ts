import type { Popover as BasePopover } from '@base-ui/react/popover'
import type { ReactElement } from 'react'

/**
 * Props for the `PopoverTrigger` wrapper.
 *
 * Unlike Base UI's own `Popover.Trigger` (which uses a `render` prop), this wrapper
 * keeps the familiar `children` API: pass your own element as `children` and it is
 * forwarded to Base UI's `render` prop internally.
 */
export type PopoverTriggerProps = Readonly<Omit<BasePopover.Trigger.Props, 'render' | 'children'> & {
  /** The element that triggers the popover — forwarded to Base UI's `render` prop. */
  children: ReactElement;
}>
