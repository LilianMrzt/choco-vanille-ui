import type { Dialog } from '@base-ui/react/dialog'
import type { ReactElement } from 'react'

/**
 * Props for the `DialogTrigger` wrapper.
 *
 * Unlike Base UI's own `Dialog.Trigger` (which uses a `render` prop), this wrapper
 * keeps the familiar `children` API: pass your own element as `children` and it is
 * forwarded to Base UI's `render` prop internally.
 */
export type DialogTriggerProps = Omit<Dialog.Trigger.Props, 'render' | 'children'> & {
  /** The element that triggers the dialog — forwarded to Base UI's `render` prop. */
  children: ReactElement;
};
