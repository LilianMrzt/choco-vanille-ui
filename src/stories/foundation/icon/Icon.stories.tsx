import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from '@components/foundation/icon'
import IconDocsPage from '@stories/foundation/icon/components/icon-docs-page/IconDocsPage'
import IconSizes from '@stories/foundation/icon/components/icon-sizes/IconSizes'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/foundation/icon/constants'
import sizesSource from '@stories/foundation/icon/sources/IconSizes.source.txt?raw'
import { createIconSource } from '@stories/foundation/icon/utils/create-icon-source/createIconSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Foundation/Icon',
    component: Icon,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: IconDocsPage,
            source: { type: 'dynamic', transform: createIconSource },
            description: {
                component: 'Displays a locally bundled SVG with token sizes and CSS colors. Icons are decorative unless given an accessible name.',
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(sizesSource),
        },
    },
    render: IconSizes,
}
