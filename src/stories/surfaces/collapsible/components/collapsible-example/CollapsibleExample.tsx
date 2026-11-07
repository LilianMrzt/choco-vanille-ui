import type { FC } from 'react'

import { Collapsible } from '@components/surfaces/collapsible'
import type { CollapsibleStoryArgs } from '@stories/surfaces/collapsible/types'

/**
 * Assigns demonstration controls to the corresponding compound slots.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Root props and demonstration controls.
 * @param props.triggerLabel - Trigger text.
 * @param props.triggerWidth - Trigger width.
 * @param props.triggerStartIcon - Leading icon.
 * @param props.triggerEndIcon - Trailing icon.
 * @param props.panelPadding - Panel bottom padding.
 * @returns The collapsible example.
 * @example
 * <CollapsibleExample triggerLabel="Details" />
 */
const CollapsibleExample: FC<CollapsibleStoryArgs> = ({
    triggerLabel,
    triggerWidth,
    triggerStartIcon,
    triggerEndIcon,
    panelPadding,
    ...rootProps
}) => (
    <div style={{ width: 'min(25rem, 100%)', minWidth: 0, overflowX: 'auto' }}>
        <Collapsible {...rootProps}>
            <Collapsible.Trigger
                endIcon={triggerEndIcon}
                label={triggerLabel}
                startIcon={triggerStartIcon}
                style={triggerWidth === undefined ? undefined : { width: triggerWidth }}
            />
            <Collapsible.Panel padding={panelPadding}>
                This content can be shown or hidden by clicking the trigger above.
            </Collapsible.Panel>
        </Collapsible>
    </div>
)

export default CollapsibleExample
