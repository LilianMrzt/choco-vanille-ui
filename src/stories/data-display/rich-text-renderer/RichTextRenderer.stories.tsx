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
                story: 'All supported semantic and decorative text colors.',
            },
            ...storySource(`
<RichTextRenderer value={{
    type: 'doc',
    content: [{
        type: 'paragraph',
        content: [
            { type: 'text', text: 'primary', marks: [{ type: 'textStyle', attrs: { color: 'primary' } }] },
            { type: 'text', text: ' secondary', marks: [{ type: 'textStyle', attrs: { color: 'secondary' } }] },
            { type: 'text', text: ' success', marks: [{ type: 'textStyle', attrs: { color: 'success' } }] },
            { type: 'text', text: ' warning', marks: [{ type: 'textStyle', attrs: { color: 'warning' } }] },
            { type: 'text', text: ' info', marks: [{ type: 'textStyle', attrs: { color: 'info' } }] },
            { type: 'text', text: ' destructive', marks: [{ type: 'textStyle', attrs: { color: 'destructive' } }] },
            { type: 'text', text: ' purple', marks: [{ type: 'textStyle', attrs: { color: 'purple' } }] },
            { type: 'text', text: ' pink', marks: [{ type: 'textStyle', attrs: { color: 'pink' } }] },
            { type: 'text', text: ' orange', marks: [{ type: 'textStyle', attrs: { color: 'orange' } }] },
            { type: 'text', text: ' teal', marks: [{ type: 'textStyle', attrs: { color: 'teal' } }] },
            { type: 'text', text: ' cyan', marks: [{ type: 'textStyle', attrs: { color: 'cyan' } }] },
            { type: 'text', text: ' indigo', marks: [{ type: 'textStyle', attrs: { color: 'indigo' } }] },
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
                            text: 'primary',
                            marks: [{ type: 'textStyle', attrs: { color: 'primary' } }],
                        },
                        {
                            type: 'text',
                            text: ' secondary',
                            marks: [{ type: 'textStyle', attrs: { color: 'secondary' } }],
                        },
                        {
                            type: 'text',
                            text: ' success',
                            marks: [{ type: 'textStyle', attrs: { color: 'success' } }],
                        },
                        {
                            type: 'text',
                            text: ' warning',
                            marks: [{ type: 'textStyle', attrs: { color: 'warning' } }],
                        },
                        {
                            type: 'text',
                            text: ' info',
                            marks: [{ type: 'textStyle', attrs: { color: 'info' } }],
                        },
                        {
                            type: 'text',
                            text: ' destructive',
                            marks: [{ type: 'textStyle', attrs: { color: 'destructive' } }],
                        },
                        {
                            type: 'text',
                            text: ' purple',
                            marks: [{ type: 'textStyle', attrs: { color: 'purple' } }],
                        },
                        {
                            type: 'text',
                            text: ' pink',
                            marks: [{ type: 'textStyle', attrs: { color: 'pink' } }],
                        },
                        {
                            type: 'text',
                            text: ' orange',
                            marks: [{ type: 'textStyle', attrs: { color: 'orange' } }],
                        },
                        {
                            type: 'text',
                            text: ' teal',
                            marks: [{ type: 'textStyle', attrs: { color: 'teal' } }],
                        },
                        {
                            type: 'text',
                            text: ' cyan',
                            marks: [{ type: 'textStyle', attrs: { color: 'cyan' } }],
                        },
                        {
                            type: 'text',
                            text: ' indigo',
                            marks: [{ type: 'textStyle', attrs: { color: 'indigo' } }],
                        },
                    ],
                },
            ],
        },
    },
}
