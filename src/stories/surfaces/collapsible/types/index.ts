import type { CollapsiblePanelProps, CollapsibleProps } from '@components/surfaces/collapsible'
import type { IconComponent } from '@components/foundation/icon'

/** Root props and story-only slot controls. */
export type CollapsibleStoryArgs = CollapsibleProps & {
    triggerLabel?: string
    triggerWidth?: string
    triggerStartIcon?: IconComponent
    triggerEndIcon?: IconComponent
    panelPadding?: CollapsiblePanelProps['padding']
}
