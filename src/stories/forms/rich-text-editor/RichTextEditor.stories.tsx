import { useState, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'

import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import {
    RichTextEditor,
    RICH_TEXT_COLOR_PALETTES,
    type RichTextEditorProps,
    type RichTextValue,
} from '@components/forms/rich-text-editor'
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
            type: 'paragraph',
            content: [{
                type: 'image',
                attrs: {
                    src: 'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?auto=format&fit=crop&w=600&q=80',
                    alt: 'Bold typography',
                },
            }],
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

type RichTextEditorPlaygroundArgs = RichTextEditorProps & {
    useCompoundLayout?: boolean
    showToolbarGroups?: boolean
    showHistoryGroup?: boolean
    showTextStyleGroup?: boolean
    showTextAppearanceGroup?: boolean
    showTextColorMenu?: boolean
    showTextSizeMenu?: boolean
    showLinkGroup?: boolean
    showBlockFormatGroup?: boolean
    showListsGroup?: boolean
    showAlignmentGroup?: boolean
    showImageGroup?: boolean
    showToolbarSeparator?: boolean
    showFormField?: boolean
}

const meta = {
    title: 'Forms/RichTextEditor',
    component: RichTextEditor as ComponentType<RichTextEditorPlaygroundArgs>,
    parameters: {
        layout: 'centered',
        docs: {
            page: RichTextEditorDocsPage,
            description: {
                component: md /* language=markdown */ `
A Tiptap-powered rich-text editor with accessible history, link, image,
alignment, block, color, and text-formatting controls.

Use \`RichTextEditorField\` for the standard form-field layout, or compose
\`RichTextEditor\` with the slots required by your toolbar.

**Usage**

\`\`\`tsx
// Field wrapper
const [value, setValue] = useState<RichTextValue>(initialValue)

<RichTextEditorField
  label="Description"
  placeholder="Start writing..."
  value={value}
  onValueChange={setValue}
/>
\`\`\`

\`\`\`tsx
// Compound API
<RichTextEditor label="Description" value={value} onValueChange={setValue}>
  <RichTextEditor.Label>Description</RichTextEditor.Label>
  <RichTextEditor.Toolbar>
    <RichTextEditor.HistoryGroup />
    <RichTextEditor.ToolbarSeparator />
    <RichTextEditor.TextStyleGroup />
    <RichTextEditor.ToolbarSeparator />
    <RichTextEditor.TextAppearanceGroup />
    <RichTextEditor.ToolbarSeparator />
    <RichTextEditor.LinkGroup />
  </RichTextEditor.Toolbar>
  <RichTextEditor.EditorField />
</RichTextEditor>
\`\`\`
`,
            },
        },
    },
    argTypes: {
        label: {
            control: 'text',
            table: { category: 'Compound: Label' },
        },
        placeholder: {
            control: 'text',
            table: { category: 'Compound: EditorField' },
        },
        helperText: { control: 'text' },
        error: { control: 'text' },
        width: { control: 'text' },
        disabled: {
            control: 'boolean',
            table: { category: 'Compound: Toolbar' },
        },
        readOnly: {
            control: 'boolean',
            table: { category: 'Compound: EditorField' },
        },
        required: {
            control: 'boolean',
            table: { category: 'Compound: EditorField' },
        },
        name: {
            control: 'text',
            table: { category: 'Compound: EditorField' },
        },
        useCompoundLayout: {
            control: 'boolean',
            table: { category: 'Compound: Root' },
        },
        showToolbarGroups: {
            control: 'boolean',
            table: { category: 'Compound: ToolbarGroups' },
        },
        showHistoryGroup: {
            control: 'boolean',
            table: { category: 'Compound: HistoryGroup' },
        },
        showTextStyleGroup: {
            control: 'boolean',
            table: { category: 'Compound: TextStyleGroup' },
        },
        showTextAppearanceGroup: {
            control: 'boolean',
            table: { category: 'Compound: TextAppearanceGroup' },
        },
        showTextColorMenu: {
            control: 'boolean',
            table: { category: 'Compound: TextColorMenu' },
        },
        showTextSizeMenu: {
            control: 'boolean',
            table: { category: 'Compound: TextSizeMenu' },
        },
        showLinkGroup: {
            control: 'boolean',
            table: { category: 'Compound: LinkGroup' },
        },
        showBlockFormatGroup: {
            control: 'boolean',
            table: { category: 'Compound: BlockFormatGroup' },
        },
        showListsGroup: {
            control: 'boolean',
            table: { category: 'Compound: ListsGroup' },
        },
        showAlignmentGroup: {
            control: 'boolean',
            table: { category: 'Compound: AlignmentGroup' },
        },
        showImageGroup: {
            control: 'boolean',
            table: { category: 'Compound: ImageGroup' },
        },
        showToolbarSeparator: {
            control: 'boolean',
            table: { category: 'Compound: ToolbarSeparator' },
        },
        showFormField: {
            control: 'boolean',
            table: { category: 'Compound: FormField' },
        },
    },
    args: {
        label: 'Description',
        placeholder: 'Start writing...',
        helperText: 'Use the toolbar or standard keyboard shortcuts to format text.',
        width: '42rem',
        useCompoundLayout: false,
        showToolbarGroups: true,
        showFormField: false,
    },
} satisfies Meta<RichTextEditorPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Edit the document and see the semantic RichTextRenderer output update below it.',
            },
            ...storySource(`
import { useState } from 'react'
import {
    RichTextEditor,
    RichTextRenderer,
    RICH_TEXT_COLOR_PALETTES,
    type RichTextValue,
    vars,
} from '@choco-vanille/ui'

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
            type: 'paragraph',
            content: [{
                type: 'image',
                attrs: {
                    src: 'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?auto=format&fit=crop&w=600&q=80',
                    alt: 'Bold typography',
                },
            }],
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

const [value, setValue] = useState<RichTextValue>(initialValue)

<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '42rem' }}>
    <RichTextEditor label="Description" placeholder="Start writing..." value={value} onValueChange={setValue} />
    <RichTextRenderer value={value} aria-label="Rendered result" />
</div>`),
        },
    },
    render: ({
        useCompoundLayout,
        showToolbarGroups,
        showHistoryGroup,
        showTextStyleGroup,
        showTextAppearanceGroup,
        showTextColorMenu,
        showTextSizeMenu,
        showLinkGroup,
        showBlockFormatGroup,
        showListsGroup,
        showAlignmentGroup,
        showImageGroup,
        showToolbarSeparator,
        showFormField,
        ...args
    }) => {
        const [value, setValue] = useState<RichTextValue>(INITIAL_VALUE)
        const separator = showToolbarSeparator && <RichTextEditor.ToolbarSeparator />

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '42rem' }}>
                {useCompoundLayout ? (
                    <RichTextEditor
                        {...args}
                        name={showFormField ? (args.name ?? 'description') : undefined}
                        value={value}
                        onValueChange={setValue}
                    >
                        <RichTextEditor.Label>{args.label ?? 'Description'}</RichTextEditor.Label>
                        <RichTextEditor.Toolbar>
                            {showToolbarGroups && <RichTextEditor.ToolbarGroups />}
                            {showHistoryGroup && <><RichTextEditor.HistoryGroup />{separator}</>}
                            {showTextStyleGroup && <><RichTextEditor.TextStyleGroup />{separator}</>}
                            {showTextAppearanceGroup && <><RichTextEditor.TextAppearanceGroup />{separator}</>}
                            {showTextColorMenu && <RichTextEditor.TextAppearanceGroup.TextColorMenu />}
                            {showTextSizeMenu && <RichTextEditor.TextAppearanceGroup.TextSizeMenu />}
                            {showLinkGroup && <><RichTextEditor.LinkGroup />{separator}</>}
                            {showBlockFormatGroup && <><RichTextEditor.BlockFormatGroup />{separator}</>}
                            {showListsGroup && <><RichTextEditor.ListsGroup />{separator}</>}
                            {showAlignmentGroup && <><RichTextEditor.AlignmentGroup />{separator}</>}
                            {showImageGroup && <RichTextEditor.ImageGroup />}
                        </RichTextEditor.Toolbar>
                        <RichTextEditor.EditorField />
                    </RichTextEditor>
                ) : (
                    <RichTextEditor
                        {...args}
                        value={value}
                        onValueChange={setValue}
                    />
                )}
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

export const CompoundUsage: Story = {
    parameters: {
        docs: {
            description: {
                story: 'RichTextEditor also exposes a compound API: pass `children` to compose the label, toolbar groups and editable document explicitly instead of using the default RichTextEditorField-style layout.',
            },
            ...storySource(`
import { useState } from 'react'
import { RichTextEditor, type RichTextValue } from '@choco-vanille/ui'

const [value, setValue] = useState<RichTextValue>(initialValue)

<RichTextEditor label="Description" value={value} onValueChange={setValue} width="42rem">
    <RichTextEditor.Label>Description</RichTextEditor.Label>
    <RichTextEditor.Toolbar>
        <RichTextEditor.HistoryGroup />
        <RichTextEditor.ToolbarSeparator />
        <RichTextEditor.TextStyleGroup />
        <RichTextEditor.ToolbarSeparator />
        <RichTextEditor.TextAppearanceGroup />
        <RichTextEditor.ToolbarSeparator />
        <RichTextEditor.LinkGroup />
        <RichTextEditor.ToolbarSeparator />
        <RichTextEditor.BlockFormatGroup />
        <RichTextEditor.ListsGroup />
        <RichTextEditor.ToolbarSeparator />
        <RichTextEditor.AlignmentGroup />
        <RichTextEditor.ToolbarSeparator />
        <RichTextEditor.ImageGroup />
    </RichTextEditor.Toolbar>
    <RichTextEditor.EditorField />
</RichTextEditor>`),
        },
    },
    render: () => {
        const [value, setValue] = useState<RichTextValue>(INITIAL_VALUE)

        return (
            <RichTextEditor
                label={'Description'}
                value={value}
                onValueChange={setValue}
                width={'42rem'}
            >
                <RichTextEditor.Label>Description</RichTextEditor.Label>
                <RichTextEditor.Toolbar>
                    <RichTextEditor.HistoryGroup />
                    <RichTextEditor.ToolbarSeparator />
                    <RichTextEditor.TextStyleGroup />
                    <RichTextEditor.ToolbarSeparator />
                    <RichTextEditor.TextAppearanceGroup />
                    <RichTextEditor.ToolbarSeparator />
                    <RichTextEditor.LinkGroup />
                    <RichTextEditor.ToolbarSeparator />
                    <RichTextEditor.BlockFormatGroup />
                    <RichTextEditor.ListsGroup />
                    <RichTextEditor.ToolbarSeparator />
                    <RichTextEditor.AlignmentGroup />
                    <RichTextEditor.ToolbarSeparator />
                    <RichTextEditor.ImageGroup />
                </RichTextEditor.Toolbar>
                <RichTextEditor.EditorField />
            </RichTextEditor>
        )
    },
}
