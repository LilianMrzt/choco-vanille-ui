import type { ReactElement } from 'react'
import { Accordion } from '@components/surfaces/accordion'

/**
 * Compares expanded, collapsed and disabled items.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The state comparison.
 * @example <AccordionStates />
 */
const AccordionStates = (): ReactElement => (
    <Accordion defaultValue={['open']}>
        <Accordion.Item value={'open'}>
            <Accordion.Trigger label={'Expanded'} />
            <Accordion.Content>Visible content.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value={'closed'}>
            <Accordion.Trigger label={'Collapsed'} />
            <Accordion.Content>Hidden content.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item
            disabled
            value={'disabled'}
        >
            <Accordion.Trigger label={'Disabled'} />
            <Accordion.Content>Unavailable content.</Accordion.Content>
        </Accordion.Item>
    </Accordion>
)

export default AccordionStates
