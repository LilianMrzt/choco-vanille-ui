import type { Dialog } from '@base-ui/react/dialog'

/** Props for the root `Dialog` wrapper. */
export type DialogProps = Readonly<Dialog.Root.Props>

/** Responsive width presets for dialog content. */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
