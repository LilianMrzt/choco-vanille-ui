import type { ReactElement } from 'react'
import { ContextMenu } from '@components/overlay/context-menu'
import type { ContextMenuStoryArgs } from '@stories/overlay/context-menu/types'

/**
 * Renders the context menu example.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Root and demonstration options.
 * @param props.triggerLabel - Label shown in the context menu trigger.
 * @param props.editLabel - Label for the edit action.
 * @param props.deleteLabel - Label for the destructive action.
 * @param props.showDisabledItem - Whether to display a disabled action.
 * @returns A contextual action menu.
 * @example
 * <ContextMenuExample {...args} />
 */
const ContextMenuExample = ({ triggerLabel, editLabel, deleteLabel, showDisabledItem, ...props }: ContextMenuStoryArgs): ReactElement => (
    <ContextMenu {...props}>
        <ContextMenu.Trigger>
            <div style={{ padding: '4rem', border: '1px dashed currentColor' }}>{triggerLabel}</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
            <ContextMenu.Item label={editLabel} />
            <ContextMenu.Item
                label={deleteLabel}
                destructive
            />
            {showDisabledItem && (
                <ContextMenu.Item
                    label={'Disabled action'}
                    disabled
                />
            )}
        </ContextMenu.Content>
    </ContextMenu>
)

export default ContextMenuExample
