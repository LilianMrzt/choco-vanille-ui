import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@components/actions/button'
import ButtonColors from '@stories/actions/button/components/button-colors/ButtonColors'
import ButtonDocsPage from '@stories/actions/button/components/button-docs-page/ButtonDocsPage'
import ButtonIcons from '@stories/actions/button/components/button-icons/ButtonIcons'
import ButtonSizes from '@stories/actions/button/components/button-sizes/ButtonSizes'
import ButtonStates from '@stories/actions/button/components/button-states/ButtonStates'
import ButtonVariants from '@stories/actions/button/components/button-variants/ButtonVariants'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/actions/button/constants'
import colorsSource from '@stories/actions/button/sources/ButtonColors.source.tsx.txt?raw'
import iconsSource from '@stories/actions/button/sources/ButtonIcons.source.tsx.txt?raw'
import sizesSource from '@stories/actions/button/sources/ButtonSizes.source.tsx.txt?raw'
import statesSource from '@stories/actions/button/sources/ButtonStates.source.tsx.txt?raw'
import variantsSource from '@stories/actions/button/sources/ButtonVariants.source.tsx.txt?raw'
import { createButtonSource } from '@stories/actions/button/utils/create-button-source/createButtonSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Actions/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: ButtonDocsPage,
            description: {
                component: 'A text-labelled action button with optional decorative icons. Supplying href renders a link; provide your own SVG components for the icons in these examples.',
            },
            source: {
                type: 'dynamic',
                transform: createButtonSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithHref: Story = {
    args: { href: '/dashboard', label: 'View dashboard' },
    argTypes: {
        disabled: { control: false, description: 'Native buttons only; links do not support disabled.' },
    },
    parameters: {
        docs: {
            description: { story: 'A supplied onClick prevents native navigation before the handler runs; omit it for normal navigation.' },
        },
    },
}

export const Variants: Story = {
    parameters: { docs: { ...storySource(variantsSource) } },
    render: ButtonVariants,
}

export const Colors: Story = {
    parameters: { docs: { ...storySource(colorsSource) } },
    render: ButtonColors,
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: ButtonSizes,
}

export const WithIcons: Story = {
    parameters: { docs: { ...storySource(iconsSource) } },
    render: ButtonIcons,
}

export const States: Story = {
    parameters: { docs: { ...storySource(statesSource) } },
    render: ButtonStates,
}
