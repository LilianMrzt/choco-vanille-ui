import type { Meta, StoryObj } from '@storybook/react-vite'

import { Accordion } from '@components/surfaces/accordion'
import AccordionDocsPage from './components/accordion-docs-page/AccordionDocsPage'
import AccordionAppearance from './components/accordion-appearance/AccordionAppearance'
import AccordionPlayground from './components/accordion-playground/AccordionPlayground'
import AccordionStates from './components/accordion-states/AccordionStates'
import AccordionUncontrolled from './components/accordion-uncontrolled/AccordionUncontrolled'
import { ARG_TYPES, DEFAULT_ARGS } from './constants'
import statesSource from './sources/AccordionStates.source.txt?raw'
import appearanceSource from './sources/AccordionAppearance.source.txt?raw'
import type { AccordionStoryArgs } from './types'
import { createAccordionSource } from './utils/create-accordion-source/createAccordionSource.utils'
import { playAccordion } from './utils/playAccordion.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Surfaces/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 'min(40rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0, marginInline: 'auto', overflowX: 'auto' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: 'padded',
        docs: {
            page: AccordionDocsPage,
            description: { component: 'Expandable sections with coordinated keyboard navigation. Compose items, triggers and content; use multiple to allow several sections to remain open.' },
            source: { type: 'dynamic', transform: createAccordionSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<AccordionStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = { render: AccordionPlayground, play: playAccordion }
export const Uncontrolled: Story = {
    render: AccordionUncontrolled,
    args: { value: undefined, defaultValue: ['item-1'] },
    argTypes: { defaultValue: { control: 'object' } },
    parameters: { docs: { description: { story: 'defaultValue is an initial value. This example remounts when it changes.' } } },
}
export const States: Story = { render: AccordionStates, parameters: { docs: { ...storySource(statesSource) } } }
export const Appearance: Story = { render: AccordionAppearance, parameters: { docs: { ...storySource(appearanceSource) } } }
