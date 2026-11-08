import type { CollapsiblePanelProps, CollapsibleProps } from '@components/surfaces/collapsible'
import type { IconifyIcon } from '@components/foundation/icon'

/** Root props and story-only slot controls. */
export type CollapsibleStoryArgs = CollapsibleProps & {
    triggerLabel?: string
    triggerWidth?: string
    triggerStartIcon?: IconifyIcon
    triggerEndIcon?: IconifyIcon
    panelPadding?: CollapsiblePanelProps['padding']
}
