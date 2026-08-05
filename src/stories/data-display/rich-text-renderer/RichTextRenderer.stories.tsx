import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'

import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import { RICH_TEXT_COLOR_PALETTES, type RichTextValue } from '@components/forms/rich-text-editor'
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

export const Links: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Safe HTTP, mailto, telephone, and internal links are rendered as accessible anchors.',
            },
            ...storySource(`
<RichTextRenderer value={{
    type: 'doc',
    content: [{
        type: 'paragraph',
        content: [
            { type: 'text', text: 'Documentation', marks: [{ type: 'link', attrs: { href: 'https://example.com' } }] },
            { type: 'text', text: ' | Contact', marks: [{ type: 'link', attrs: { href: 'mailto:hello@example.com' } }] },
            { type: 'text', text: ' | Call us', marks: [{ type: 'link', attrs: { href: 'tel:+33123456789' } }] },
            { type: 'text', text: ' | Internal page', marks: [{ type: 'link', attrs: { href: '/getting-started' } }] },
        ],
    }],
}} />`),
        },
    },
    args: {
        value: {
            type: 'doc',
            content: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: 'Documentation',
                            marks: [{ type: 'link', attrs: { href: 'https://example.com' } }],
                        },
                        {
                            type: 'text',
                            text: ' | Contact',
                            marks: [
                                { type: 'link', attrs: { href: 'mailto:hello@example.com' } },
                            ],
                        },
                        {
                            type: 'text',
                            text: ' | Call us',
                            marks: [{ type: 'link', attrs: { href: 'tel:+33123456789' } }],
                        },
                        {
                            type: 'text',
                            text: ' | Internal page',
                            marks: [{ type: 'link', attrs: { href: '/getting-started' } }],
                        },
                    ],
                },
            ],
        },
    },
}

export const Colors: Story = {
    parameters: {
        docs: {
            description: {
                story: 'All supported rich-text palette colors.',
            },
            ...storySource(`
<RichTextRenderer value={{
    type: 'doc',
    content: [{
        type: 'paragraph',
        content: [
            { type: 'text', text: 'Ocean dark', marks: [{ type: 'textStyle', attrs: { color: '#1d4ed8' } }] },
            { type: 'text', text: ' Ocean medium', marks: [{ type: 'textStyle', attrs: { color: '#3b82f6' } }] },
            { type: 'text', text: ' Ocean light', marks: [{ type: 'textStyle', attrs: { color: '#60a5fa' } }] },
            { type: 'text', text: ' Black dark', marks: [{ type: 'textStyle', attrs: { color: '#111827' } }] },
            { type: 'text', text: ' Black medium', marks: [{ type: 'textStyle', attrs: { color: '#374151' } }] },
            { type: 'text', text: ' Black light', marks: [{ type: 'textStyle', attrs: { color: '#9ca3af' } }] },
        ],
    }],
}} />`),
        },
    },
    args: {
        value: {
            type: 'doc',
            content: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: 'Ocean dark',
                            marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[0].colors[0] } }],
                        },
                        {
                            type: 'text',
                            text: ' Ocean medium',
                            marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[0].colors[1] } }],
                        },
                        {
                            type: 'text',
                            text: ' Ocean light',
                            marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[0].colors[2] } }],
                        },
                        {
                            type: 'text',
                            text: ' Black dark',
                            marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[6].colors[0] } }],
                        },
                        {
                            type: 'text',
                            text: ' Black medium',
                            marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[6].colors[1] } }],
                        },
                        {
                            type: 'text',
                            text: ' Black light',
                            marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[6].colors[2] } }],
                        },
                    ],
                },
            ],
        },
    },
}
