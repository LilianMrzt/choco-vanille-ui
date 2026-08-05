import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'

import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import type { RichTextValue } from '@components/forms/rich-text-editor'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const VALUE: RichTextValue = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Rendered content' }] },
        {
            type: 'paragraph',
            content: [
                { type: 'text', text: 'This document contains ' },
                { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
                { type: 'text', text: ', italic', marks: [{ type: 'italic' }] },
                { type: 'text', text: ', and underlined', marks: [{ type: 'underline' }] },
                { type: 'text', text: ' text.' },
            ],
        },
        {
            type: 'bulletList',
            content: [
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'First item' }] }] },
                { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Second item' }] }] },
            ],
        },
    ],
}

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`value\` | Yes | \`RichTextValue\` | The structured document rendered as semantic HTML. |
| \`aria-label\` / \`aria-labelledby\` | No | \`string\` | Names the renderer when its surrounding context does not. |
| \`className\` | No | \`string\` | Applied to the renderer container. |
`

const RichTextRendererDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta = {
    title: 'Data Display/RichTextRenderer',
    component: RichTextRenderer,
    parameters: {
        layout: 'centered',
        docs: {
            page: RichTextRendererDocsPage,
            description: {
                component: 'Renders a structured document emitted by RichTextEditor without parsing HTML or Markdown.',
            },
        },
    },
} satisfies Meta<typeof RichTextRenderer>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    args: {
        value: VALUE,
    },
    parameters: {
        docs: {
            ...storySource('<RichTextRenderer value={value} />'),
        },
    },
}
