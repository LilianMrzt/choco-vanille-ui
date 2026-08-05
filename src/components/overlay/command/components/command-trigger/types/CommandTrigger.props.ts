import type { Dialog } from '@base-ui/react/dialog'
import type { ReactElement } from 'react'

/**
 * Props for `Command.Trigger`.
 *
 * Pass the element that opens the command palette as `children`;
 * it is forwarded to Base UI's `render` prop internally.
 */
export type CommandTriggerProps = Omit<Dialog.Trigger.Props, 'render' | 'children'> & {
    /** The element that activates the command palette — forwarded to Base UI's `render` prop. */
    children: ReactElement
}
