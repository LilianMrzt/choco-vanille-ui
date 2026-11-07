import type { ReactElement } from 'react'
import { Accordion } from '@components/surfaces/accordion'

/**
 * Compares the two keyboard-navigation orientations.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Labelled, independently interactive orientation examples.
 * @example <AccordionAppearance />
 */
const AccordionAppearance = (): ReactElement => (
    <section>
        <h3>Orientations</h3>
        <p>Orientation changes arrow-key navigation; both examples retain the same stacked layout.</p>
        <div>
            <h4>Vertical: Up / Down</h4>
            <Accordion
                defaultValue={['overview']}
                orientation={'vertical'}
            >
                <Accordion.Item value={'overview'}>
                    <Accordion.Trigger label={'Vertical overview'} />
                    <Accordion.Content>Use Up and Down to move between triggers.</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value={'details'}>
                    <Accordion.Trigger label={'Vertical details'} />
                    <Accordion.Content>Use Enter or Space to expand this section.</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
        <div>
            <h4>Horizontal: Left / Right</h4>
            <Accordion
                defaultValue={['overview']}
                orientation={'horizontal'}
            >
                <Accordion.Item value={'overview'}>
                    <Accordion.Trigger label={'Horizontal overview'} />
                    <Accordion.Content>Use Left and Right to move between triggers.</Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value={'details'}>
                    <Accordion.Trigger label={'Horizontal details'} />
                    <Accordion.Content>Use Enter or Space to expand this section.</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    </section>
)

export default AccordionAppearance
