import type { Dialog } from '@base-ui/react/dialog'
import type { PANEL_POSITIONS } from '@components/overlay/panel/constants'

/** Root state, callbacks and backdrop options for a panel. */
export type PanelProps = Readonly<Dialog.Root.Props & {
    /** Whether to render the backdrop. Defaults to `true`. */
    withBackdrop?: boolean
}>

/** Side from which the panel appears. */
export type PanelPosition = (typeof PANEL_POSITIONS)[keyof typeof PANEL_POSITIONS]
