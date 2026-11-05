import type { Meta, StoryObj } from '@storybook/react-vite'

import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import RichTextRendererDocsPage from '@stories/data-display/rich-text-renderer/components/rich-text-renderer-docs-page/RichTextRendererDocsPage'
import { ARG_TYPES, COLORS_VALUE, DEFAULT_ARGS, LINKS_VALUE } from '@stories/data-display/rich-text-renderer/constants'
import { createRichTextRendererSource } from '@stories/data-display/rich-text-renderer/utils/create-rich-text-renderer-source/createRichTextRendererSource.utils'

const meta = {
    title: 'Data Display/RichTextRenderer',
    component: RichTextRenderer,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: RichTextRendererDocsPage,
            description: {
                component: 'Renders a structured document emitted by RichTextEditor without parsing HTML or Markdown. Supported blocks and inline formatting retain their semantic HTML.',
            },
            source: {
                type: 'dynamic',
                transform: createRichTextRendererSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof RichTextRenderer>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Links: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Safe HTTP, mailto, telephone, and internal links are rendered as accessible anchors.',
            },
        },
    },
    args: {
        value: LINKS_VALUE,
    },
}

export const Colors: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Selected ocean and neutral editor colors. Content colors need contrast assessment against the surrounding surface in both themes.',
            },
        },
    },
    args: {
        value: COLORS_VALUE,
    },
}
