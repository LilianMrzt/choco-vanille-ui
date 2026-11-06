import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Panel } from '@components/overlay/panel'

/**
 * Demonstrates a panel header with an additional action.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The header action example.
 * @example
 * <PanelHeaderActions />
 */
const PanelHeaderActions = (): ReactElement => (
    <Panel>
        <Panel.Trigger>
            <Button
                color={'primary'}
                label={'Open panel with actions'}
                variant={'outlined'}
            />
        </Panel.Trigger>
        <Panel.Content>
            <Panel.Header
                actions={(
                    <Button
                        color={'primary'}
                        label={'Save'}
                        size={'sm'}
                        variant={'ghost'}
                    />
                )}
                description={'Additional context is truncated when it exceeds the available header width.'}
                title={'Panel settings with a long title that stays on one line'}
            />
        </Panel.Content>
    </Panel>
)

export default PanelHeaderActions
