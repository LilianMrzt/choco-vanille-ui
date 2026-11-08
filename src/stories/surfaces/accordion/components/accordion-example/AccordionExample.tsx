import { INFO_ICON as InfoIcon } from '@constants/icon-registry'
import type { ReactElement } from 'react'
import { Accordion } from '@components/surfaces/accordion'
import type { AccordionStoryArgs } from '../../types'

/**
 * Renders the accordion root and editable first-item slots.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Root props and first-item demonstration controls.
 * @returns The accordion composition.
 * @example <AccordionExample value={['item-1']} />
 */
const AccordionExample = (props: AccordionStoryArgs): ReactElement => {
    const { firstDisabled, firstStartIcon, firstEndIcon, firstLabel, ...rootProps } = props

    return (
        <Accordion {...rootProps}>
            <Accordion.Item
                disabled={firstDisabled}
                value={'item-1'}
            >
                <Accordion.Trigger
                    endIcon={firstEndIcon ? InfoIcon : undefined}
                    label={firstLabel}
                    startIcon={firstStartIcon ? InfoIcon : undefined}
                />
                <Accordion.Content>Yes. It follows the WAI-ARIA Accordion pattern.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value={'item-2'}>
                <Accordion.Trigger>Is it styled?</Accordion.Trigger>
                <Accordion.Content>Yes. It uses the same design tokens as the rest of the kit.</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value={'item-3'}>
                <Accordion.Trigger>Can I use custom content?</Accordion.Trigger>
                <Accordion.Content>Yes. Compose children or use the label and decorative icon props.</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionExample
