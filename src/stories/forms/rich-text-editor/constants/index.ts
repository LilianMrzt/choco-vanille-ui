import { md } from '@stories/_shared/utils/markdown'
import { type RichTextEditorPlaygroundArgs } from '@stories/forms/rich-text-editor/types'
import { fn } from 'storybook/test'

import {
    RICH_TEXT_COLOR_PALETTES,
    type RichTextValue,
} from '@components/forms/rich-text-editor'
import { vars } from '@theme/styles/contract/contract.css.ts'
import usageSource from '@stories/forms/rich-text-editor/sources/RichTextEditorUsage.source.txt?raw'

export const INITIAL_VALUE: RichTextValue = {
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
                    marks: [
                        {
                            type: 'textStyle',
                            attrs: {
                                color: RICH_TEXT_COLOR_PALETTES[0].colors[1],
                                fontSize: vars.fontSize[24],
                            },
                        },
                    ],
                },
                { type: 'text', text: ' and ' },
                {
                    type: 'text',
                    text: 'safe links',
                    marks: [
                        {
                            type: 'link',
                            attrs: { href: 'https://example.com' },
                        },
                    ],
                },
                { type: 'text', text: '.' },
            ],
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'image',
                    attrs: {
                        src: 'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?auto=format&fit=crop&w=600&q=80',
                        alt: 'Bold typography',
                    },
                },
            ],
        },
        {
            type: 'bulletList',
            content: [
                {
                    type: 'listItem',
                    content: [
                        {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Bulleted list item' }],
                        },
                    ],
                },
                {
                    type: 'listItem',
                    content: [
                        {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Another list item' }],
                        },
                    ],
                },
            ],
        },
        {
            type: 'orderedList',
            content: [
                {
                    type: 'listItem',
                    content: [
                        {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Ordered list item' }],
                        },
                    ],
                },
                {
                    type: 'listItem',
                    content: [
                        {
                            type: 'paragraph',
                            content: [{ type: 'text', text: 'Another ordered item' }],
                        },
                    ],
                },
            ],
        },
    ],
}
export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute                 | Required    | Type      | Notes                                                |
| -------------------------------- | ----------- | --------- | ---------------------------------------------------- |
| \`label\`                          | Conditional | \`string\`  | Visible name for the editable document.              |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\`  | Required when \`label\` is omitted.                    |
| \`error\`                          | No          | \`string\`  | Sets \`aria-invalid="true"\` and describes the editor. |
| \`disabled\` / \`readOnly\`          | No          | \`boolean\` | Prevent editing and disable formatting actions.      |

The toolbar is a named \`toolbar\`; its icon actions have accessible names and expose their active formatting state.

## Compound slots

| Slot                                                                             | Purpose                                                                       |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| \`RichTextEditor.Label\`                                                           | Visible label connected to the editable document.                             |
| \`RichTextEditor.EditorField\`                                                     | Editable Tiptap document and optional form-value proxy.                       |
| \`RichTextEditor.ReadOnlyField\`                                                   | Rendered document and non-required form-value proxy for read-only mode.       |
| \`RichTextEditor.HelperText\`                                                      | Context-driven helper or error message.                                       |
| \`RichTextEditor.Toolbar\`                                                         | Named toolbar container with arrow-key navigation.                            |
| \`RichTextEditor.ToolbarGroups\`                                                   | Default complete toolbar composition.                                         |
| \`RichTextEditor.ToolbarSeparator\`                                                | Visual and semantic separator between toolbar groups.                         |
| \`RichTextEditor.HistoryGroup\` / \`.Undo\` / \`.Redo\`                                | History controls or their individual actions.                                 |
| \`RichTextEditor.TextStyleGroup\` / \`.Bold\` / \`.Italic\` / \`.Underline\` / \`.Strike\` | Text-mark formatting controls or individual toggles.                          |
| \`RichTextEditor.TextAppearanceGroup\`                                             | Convenience group for the menu-only text color and size controls.             |
| \`RichTextEditor.TextAppearanceGroup.TextColorMenu\`                               | Text-color palette; its trigger shows the currently selected color.           |
| \`RichTextEditor.TextAppearanceGroup.TextSizeMenu\`                                | Text-size selection menu.                                                     |
| \`RichTextEditor.LinkGroup\` / \`.SetLink\` / \`.UnsetLink\`                           | Link controls or their individual actions.                                    |
| \`RichTextEditor.BlockFormatGroup\`                                                | Block-format actions; use \`presentation="inline"\` for direct toolbar actions. |
| \`RichTextEditor.ListsGroup\`                                                      | List actions; use \`presentation="inline"\` for direct toolbar actions.         |
| \`RichTextEditor.AlignmentGroup\`                                                  | Alignment actions; use \`presentation="inline"\` for direct toolbar actions.    |
| \`RichTextEditor.ImageGroup\`                                                      | Image actions; use \`presentation="inline"\` for direct toolbar actions.        |
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<RichTextEditorPlaygroundArgs> = {
    label: {
        control: 'text',
        table: { category: 'Compound: Label' },
        description: 'Sets the public label prop.'
    },
    labels: {
        control: 'object',
        description:
        'Localized accessible names and prompt messages for all compound toolbar slots.',
        table: { category: 'Compound: Labels' },
    },
    placeholder: {
        control: 'text',
        table: { category: 'Compound: EditorField' },
        description: 'Sets the public placeholder prop.'
    },
    helperText: {
        control: 'text',
        table: { category: 'Compound: HelperText' },
        description: 'Sets the public helperText prop.'
    },
    error: { control: 'text',
        description: 'Sets the public error prop.'
    },
    width: { control: 'text',
        description: 'Sets the public width prop.'
    },
    disabled: {
        control: 'boolean',
        table: { category: 'Compound: Toolbar' },
        description: 'Sets the public disabled prop.'
    },
    readOnly: {
        control: 'boolean',
        table: { category: 'Compound: ReadOnlyField' },
        description: 'Sets the public readOnly prop.'
    },
    required: {
        control: 'boolean',
        table: { category: 'Compound: EditorField' },
        description: 'Sets the public required prop.'
    },
    name: {
        control: 'text',
        table: { category: 'Compound: EditorField' },
        description: 'Sets the public name prop.'
    },
    showToolbarGroups: {
        control: 'boolean',
        table: { category: 'Compound: ToolbarGroups' },
        description: 'Sets the public showToolbarGroups prop.'
    },
    showTextStyleGroup: {
        control: 'boolean',
        table: { category: 'Compound: TextStyleGroup' },
        description: 'Sets the public showTextStyleGroup prop.'
    },
    showTextAppearanceGroup: {
        control: 'boolean',
        table: { category: 'Compound: TextAppearanceGroup' },
        description: 'Sets the public showTextAppearanceGroup prop.'
    },
    showTextColorMenu: {
        control: 'boolean',
        table: { category: 'Compound: TextColorMenu' },
        description: 'Sets the public showTextColorMenu prop.'
    },
    showTextSizeMenu: {
        control: 'boolean',
        table: { category: 'Compound: TextSizeMenu' },
        description: 'Sets the public showTextSizeMenu prop.'
    },
    textSizePresentation: {
        control: 'radio',
        options: ['icon', 'select'],
        table: { category: 'Compound: TextSizeMenu' },
        description: 'Sets the public textSizePresentation prop.'
    },
    showLinkGroup: {
        control: 'boolean',
        table: { category: 'Compound: LinkGroup' },
        description: 'Sets the public showLinkGroup prop.'
    },
    showSetLink: {
        control: 'boolean',
        table: { category: 'Compound: SetLink' },
        description: 'Sets the public showSetLink prop.'
    },
    showUnsetLink: {
        control: 'boolean',
        table: { category: 'Compound: UnsetLink' },
        description: 'Sets the public showUnsetLink prop.'
    },
    showListsGroup: {
        control: 'boolean',
        table: { category: 'Compound: ListsGroup' },
        description: 'Sets the public showListsGroup prop.'
    },
    showAlignmentGroup: {
        control: 'boolean',
        table: { category: 'Compound: AlignmentGroup' },
        description: 'Sets the public showAlignmentGroup prop.'
    },
    showImageGroup: {
        control: 'boolean',
        table: { category: 'Compound: ImageGroup' },
        description: 'Sets the public showImageGroup prop.'
    },
    showToolbarSeparator: {
        control: 'boolean',
        table: { category: 'Compound: ToolbarSeparator' },
        description: 'Sets the public showToolbarSeparator prop.'
    },
    value: { control: 'object', description: 'Controlled rich-text document.' },
    defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
    onValueChange: { control: false,
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    'className': { control: 'text', description: 'Editable className forwarded to the rendered public component.' },
    'onImageUpload': { control: false, description: 'Supply a callback in code; Actions receives the full public event payload.' },
    'aria-label': { control: 'text', description: 'Editable aria-label forwarded to the rendered public component.' },
    'aria-labelledby': { control: 'text', description: 'Editable aria-labelledby forwarded to the rendered public component.' }
}
export const DEFAULT_ARGS = {
    label: 'Description',
    placeholder: 'Start writing...',
    helperText:
              'Use the toolbar or standard keyboard shortcuts to format text.',
    labels: {
        toolbar: 'Text formatting',
        undo: 'Undo',
        redo: 'Redo',
        bold: 'Bold',
    },
    width: 'min(100%, 42rem)',
    showToolbarGroups: false,
    textSizePresentation: 'select',
    value: INITIAL_VALUE,
    onValueChange: fn(),
    showTextSizeMenu: true,
    showTextStyleGroup: true,
    showToolbarSeparator: true
} satisfies Partial<RichTextEditorPlaygroundArgs>
export const DESCRIPTION = md`A rich-text field with keyboard-accessible formatting and semantic document output. Use RichTextEditorField for the standard field, or compose the RichTextEditor slots for a custom toolbar.

~~~tsx
${usageSource}
~~~`
