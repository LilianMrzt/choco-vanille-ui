import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Panel } from '@components/overlay/panel'

/**
 * Demonstrates both panel positions.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The position examples.
 * @example
 * <PanelPositions />
 */
const PanelPositions = (): ReactElement => (
    <>
        <Panel>
            <Panel.Trigger>
                <Button
                    color={'primary'}
                    label={'Open left panel'}
                    variant={'outlined'}
                />
            </Panel.Trigger>
            <Panel.Content position={'left'}>
                <Panel.Header title={'Left panel'} />
                <Panel.Body>Slides in from the left.</Panel.Body>
            </Panel.Content>
        </Panel>
        <Panel>
            <Panel.Trigger>
                <Button
                    color={'primary'}
                    label={'Open right panel'}
                    variant={'outlined'}
                />
            </Panel.Trigger>
            <Panel.Content position={'right'}>
                <Panel.Header title={'Right panel'} />
                <Panel.Body>Slides in from the right.</Panel.Body>
            </Panel.Content>
        </Panel>
    </>
)

export default PanelPositions
