import type { Dialog } from '@base-ui/react/dialog'
import type Command from '@components/overlay/command/Command.tsx'

/** Root props for the command palette. */
export type CommandProps = Dialog.Root.Props
/** Width preset for Command.Content; defaults to md. */
export type CommandSize = 'sm' | 'md' | 'lg'
/** Command palette and its compound slots. */
export type CommandCompound = typeof Command
