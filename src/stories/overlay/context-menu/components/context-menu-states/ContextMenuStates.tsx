import type { ReactElement } from 'react'
import { ContextMenu } from '@components/overlay/context-menu'

/**
 * Shows disabled menu and item states.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Two menus.
 * @example
 * <ContextMenuStates />
 */
const ContextMenuStates = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem' }}>
        <ContextMenu disabled>
            <ContextMenu.Trigger><div style={{ padding: '2rem', border: '1px dashed currentColor' }}>Disabled context menu</div></ContextMenu.Trigger>
            <ContextMenu.Content><ContextMenu.Item label={'Edit'} /></ContextMenu.Content>
        </ContextMenu>
        <ContextMenu>
            <ContextMenu.Trigger><div style={{ padding: '2rem', border: '1px dashed currentColor' }}>Disabled menu item</div></ContextMenu.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item label={'Edit'} />
                <ContextMenu.Item
                    label={'Unavailable'}
                    disabled
                />
            </ContextMenu.Content>
        </ContextMenu>
    </div>
)

export default ContextMenuStates
