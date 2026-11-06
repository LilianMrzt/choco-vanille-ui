import type { Dialog } from '@base-ui/react/dialog'
import type { ReactElement } from 'react'

/**
 * Props for the `DialogClose` wrapper.
 *
 * Unlike Base UI's own `Dialog.Close` (which uses a `render` prop), this wrapper
 * keeps the familiar `children` API: pass your own element as `children` and it is
 * forwarded to Base UI's `render` prop internally.
 */
export type DialogCloseProps = Readonly<Omit<Dialog.Close.Props, 'render' | 'children'> & {
  /** The element that closes the dialog — forwarded to Base UI's `render` prop. */
  children: ReactElement;
}>
