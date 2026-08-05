import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'

import { RichTextEditor, type RichTextValue } from '@components/forms/rich-text-editor'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const INITIAL_VALUE: RichTextValue = {
    type: 'doc',
    content: [
        {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Select text, then apply formatting from the toolbar.' }],
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
                component: 'A Tiptap-powered rich-text field with a keyboard-accessible formatting toolbar.',
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
            ...storySource('<RichTextEditor label="Description" placeholder="Start writing..." />'),
        },
    },
    render: (args) => {
        const [value, setValue] = useState<RichTextValue>(INITIAL_VALUE)

        return (
            <RichTextEditor
                {...args}
                value={value}
                onValueChange={setValue}
            />
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
