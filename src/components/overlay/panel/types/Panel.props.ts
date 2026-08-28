import type { Dialog } from '@base-ui/react/dialog'

/** Props for the root `Panel` wrapper. */
export type PanelProps = Dialog.Root.Props & {
    /** Whether to render the backdrop. @default true */
    withBackdrop?: boolean
}
