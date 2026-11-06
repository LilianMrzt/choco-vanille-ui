import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Panel } from '@components/overlay/panel'

/**
 * Demonstrates two panel widths.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The width examples.
 * @example
 * <PanelWidths />
 */
const PanelWidths = (): ReactElement => (
    <>
        <Panel>
            <Panel.Trigger>
                <Button
                    color={'primary'}
                    label={'Open narrow panel'}
                    variant={'outlined'}
                />
            </Panel.Trigger>
            <Panel.Content width={'20rem'}>
                <Panel.Header title={'Narrow panel'} />
            </Panel.Content>
        </Panel>
        <Panel>
            <Panel.Trigger>
                <Button
                    color={'primary'}
                    label={'Open wide panel'}
                    variant={'outlined'}
                />
            </Panel.Trigger>
            <Panel.Content width={'42rem'}>
                <Panel.Header title={'Wide panel'} />
            </Panel.Content>
        </Panel>
    </>
)

export default PanelWidths
