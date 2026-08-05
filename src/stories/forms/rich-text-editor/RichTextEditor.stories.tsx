import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'

import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import { RichTextEditor, RICH_TEXT_COLOR_PALETTES, type RichTextValue } from '@components/forms/rich-text-editor'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'
import { vars } from '@theme/contract.css.ts'

const INITIAL_VALUE: RichTextValue = {
    type: 'doc',
    content: [
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'A complete rich-text example' }],
        },
        {
            type: 'paragraph',
            content: [
                { type: 'text', text: 'This example includes ' },
                { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
                { type: 'text', text: ', ' },
                { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
                { type: 'text', text: ', and ' },
                { type: 'text', text: 'underlined', marks: [{ type: 'underline' }] },
                { type: 'text', text: ' text.' },
            ],
        },
        {
            type: 'paragraph',
            content: [
                { type: 'text', text: 'It also supports ' },
                {
                    type: 'text',
                    text: 'colored large text',
                    marks: [{
                        type: 'textStyle',
                        attrs: {
                            color: RICH_TEXT_COLOR_PALETTES[0].colors[1],
                            fontSize: vars.fontSize['2xl'],
                        },
                    }],
                },
                { type: 'text', text: ' and ' },
                {
                    type: 'text',
                    text: 'safe links',
                    marks: [{
                        type: 'link',
                        attrs: { href: 'https://example.com' },
                    }],
                },
                { type: 'text', text: '.' },
            ],
        },
        {
            type: 'bulletList',
            content: [
                {
                    type: 'listItem',
                    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Bulleted list item' }] }],
                },
                {
                    type: 'listItem',
                    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Another list item' }] }],
                },
            ],
        },
        {
            type: 'orderedList',
            content: [
                {
                    type: 'listItem',
                    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Ordered list item' }] }],
                },
                {
                    type: 'listItem',
                    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Another ordered item' }] }],
                },
            ],
        },
    ],
}

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`label\` | Conditional | \`string\` | Visible name for the editable document. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`error\` | No | \`string\` | Sets \`aria-invalid="true"\` and describes the editor. |
| \`disabled\` / \`readOnly\` | No | \`boolean\` | Prevent editing and disable formatting actions. |

The toolbar is a named \`toolbar\`; its icon actions have accessible names and expose their active formatting state.
`

const RichTextEditorDocsPage = () => (
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
    title: 'Forms/RichTextEditor',
    component: RichTextEditor,
    parameters: {
        layout: 'centered',
        docs: {
            page: RichTextEditorDocsPage,
            description: {
                component: 'A Tiptap-powered rich-text field with a keyboard-accessible formatting toolbar, color palettes, and safely validated links.',
            },
        },
    },
    argTypes: {
        label: {
            control: 'text',
            table: { category: 'Compound: Label' },
        },
        placeholder: { control: 'text' },
        helperText: { control: 'text' },
        error: { control: 'text' },
        width: { control: 'text' },
        disabled: { control: 'boolean' },
        readOnly: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'Description',
        placeholder: 'Start writing...',
        helperText: 'Use the toolbar or standard keyboard shortcuts to format text.',
        width: '42rem',
    },
} satisfies Meta<typeof RichTextEditor>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Edit the document and see the semantic RichTextRenderer output update below it.',
            },
            ...storySource(`
import { RichTextEditor, RichTextRenderer, RICH_TEXT_COLOR_PALETTES, vars } from '@choco-vanille/ui'

const initialValue = {
    type: 'doc',
    content: [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'A complete rich-text example' }] },
        {
            type: 'paragraph',
            content: [
               { type: 'text', text: 'This example includes ' },
               { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
               { type: 'text', text: ', ' },
               { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
               { type: 'text', text: ', and ' },
               { type: 'text', text: 'underlined', marks: [{ type: 'underline' }] },
               { type: 'text', text: ' text.' },
            ],
        },
        {
            type: 'paragraph',
            content: [
               { type: 'text', text: 'It also supports ' },
               {
                   type: 'text',
                   text: 'colored large text',
                   marks: [{ type: 'textStyle', attrs: { color: RICH_TEXT_COLOR_PALETTES[0].colors[1], fontSize: vars.fontSize['2xl'] } }],
               },
               { type: 'text', text: ' and ' },
               { type: 'text', text: 'safe links', marks: [{ type: 'link', attrs: { href: 'https://example.com' } }] },
               { type: 'text', text: '.' },
            ],
        },
        {
            type: 'bulletList',
            content: [
               { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Bulleted list item' }] }] },
               { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Another list item' }] }] },
            ],
        },
        {
            type: 'orderedList',
            content: [
               { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Ordered list item' }] }] },
               { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Another ordered item' }] }] },
            ],
        },
    ],
}

const [value, setValue] = useState(initialValue)

<RichTextEditor label="Description" placeholder="Start writing..." value={value} onValueChange={setValue} />
<RichTextRenderer value={value} aria-label="Rendered result" />`),
        },
    },
    render: (args) => {
        const [value, setValue] = useState<RichTextValue>(INITIAL_VALUE)

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '42rem' }}>
                <RichTextEditor
                    {...args}
                    value={value}
                    onValueChange={setValue}
                />
                <RichTextRenderer
                    value={value}
                    aria-label={'Rendered result'}
                />
            </div>
        )
    },
}

export const States: Story = {
    parameters: {
        docs: {
            ...storySource(`
<RichTextEditor label="Read only" defaultValue={value} readOnly />
<RichTextEditor label="Disabled" defaultValue={value} disabled />
<RichTextEditor label="With error" error="A description is required." />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '42rem' }}>
            <RichTextEditor
                label={'Read only'}
                defaultValue={INITIAL_VALUE}
                readOnly
            />
            <RichTextEditor
                label={'Disabled'}
                defaultValue={INITIAL_VALUE}
                disabled
            />
            <RichTextEditor
                label={'With error'}
                error={'A description is required.'}
            />
        </div>
    ),
}
