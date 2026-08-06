import { useState, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'

import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import {
    RichTextEditor,
    RichTextEditorField,
    RICH_TEXT_COLOR_PALETTES,
    type RichTextEditorFieldProps,
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
                    marks: [
                        {
                            type: 'textStyle',
                            attrs: {
                                color: RICH_TEXT_COLOR_PALETTES[0].colors[1],
                                fontSize: vars.fontSize['2xl'],
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

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
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

type RichTextEditorPlaygroundArgs = RichTextEditorFieldProps & {
  useCompoundLayout?: boolean;
  showToolbarGroups?: boolean;
  showTextStyleGroup?: boolean;
  showTextAppearanceGroup?: boolean;
  showTextColorMenu?: boolean;
  showTextSizeMenu?: boolean;
  textSizePresentation?: 'icon' | 'select';
  showLinkGroup?: boolean;
  showSetLink?: boolean;
  showUnsetLink?: boolean;
  showListsGroup?: boolean;
  showAlignmentGroup?: boolean;
  showImageGroup?: boolean;
  showToolbarSeparator?: boolean;
  showFormField?: boolean;
};

const meta = {
    title: 'Forms/RichTextEditor',
    component: RichTextEditorField as ComponentType<RichTextEditorPlaygroundArgs>,
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

~~~tsx
// Field wrapper
const [value, setValue] = useState<RichTextValue>(initialValue)

<RichTextEditorField
  label="Description"
  placeholder="Start writing..."
  value={value}
  onValueChange={setValue}
/>
~~~

~~~tsx
// Compound API
<RichTextEditor
  label="Description"
  value={value}
  onValueChange={setValue}
  labels={{
    toolbar: 'Mise en forme',
    historyGroup: 'Historique',
    undo: 'Annuler',
    redo: 'Rétablir',
    textStyleGroup: 'Style du texte',
    bold: 'Gras',
    italic: 'Italique',
    underline: 'Souligné',
    strikethrough: 'Barré',
    linkGroup: 'Liens',
    addOrEditLink: 'Ajouter ou modifier le lien',
    linkGroupTrigger: 'Actions sur les liens',
    linkOptions: 'Options de lien',
    removeLink: 'Supprimer le lien',
    blockFormatGroup: 'Format de bloc',
    listsGroup: 'Listes',
    alignmentGroup: 'Alignement du texte',
    imageGroup: 'Actions sur les images',
    fontSizeAndBlockFormatGroup: 'Taille et format de bloc',
    alignmentAndListsGroup: 'Alignement et listes',
    linksAndImagesGroup: 'Liens et images',
  }}
>
  <RichTextEditor.Label>Description</RichTextEditor.Label>
  <RichTextEditor.Toolbar aria-label="Mise en forme">
    <RichTextEditor.ToolbarGroup aria-label="Font size and block format">
      <RichTextEditor.TextAppearanceGroup.TextSizeMenu />
      <RichTextEditor.BlockFormatGroup />
    </RichTextEditor.ToolbarGroup>
    <RichTextEditor.ToolbarSeparator />
    <RichTextEditor.TextStyleGroup />
    <RichTextEditor.ToolbarSeparator />
    <RichTextEditor.TextAppearanceGroup.TextColorMenu />
    <RichTextEditor.ToolbarSeparator />
    <RichTextEditor.ToolbarGroup aria-label="Alignment and lists">
      <RichTextEditor.AlignmentGroup />
      <RichTextEditor.ListsGroup />
    </RichTextEditor.ToolbarGroup>
    <RichTextEditor.ToolbarSeparator />
    <RichTextEditor.ToolbarGroup aria-label="Links and images">
      <RichTextEditor.LinkGroup />
      <RichTextEditor.ImageGroup presentation="inline" />
    </RichTextEditor.ToolbarGroup>
  </RichTextEditor.Toolbar>
  <RichTextEditor.EditorField />
  <RichTextEditor.HelperText />
</RichTextEditor>
~~~

Pass the optional \`labels\` prop to localize every compound toolbar slot
without coupling the component to a specific i18n library:

~~~tsx
<RichTextEditor
  label="Description"
  labels={{
    toolbar: 'Mise en forme',
    undo: 'Annuler',
    redo: 'Rétablir',
    bold: 'Gras',
  }}
>
  {/* compound slots */}
</RichTextEditor>
~~~
        `,
            },
        },
    },
    argTypes: {
        label: {
            control: 'text',
            table: { category: 'Compound: Label' },
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
        },
        helperText: {
            control: 'text',
            table: { category: 'Compound: HelperText' },
        },
        error: { control: 'text' },
        width: { control: 'text' },
        disabled: {
            control: 'boolean',
            table: { category: 'Compound: Toolbar' },
        },
        readOnly: {
            control: 'boolean',
            table: { category: 'Compound: ReadOnlyField' },
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
        textSizePresentation: {
            control: 'radio',
            options: ['icon', 'select'],
            table: { category: 'Compound: TextSizeMenu' },
        },
        showLinkGroup: {
            control: 'boolean',
            table: { category: 'Compound: LinkGroup' },
        },
        showSetLink: {
            control: 'boolean',
            table: { category: 'Compound: SetLink' },
        },
        showUnsetLink: {
            control: 'boolean',
            table: { category: 'Compound: UnsetLink' },
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
        helperText:
      'Use the toolbar or standard keyboard shortcuts to format text.',
        labels: {
            toolbar: 'Text formatting',
            undo: 'Undo',
            redo: 'Redo',
            bold: 'Bold',
        },
        width: '42rem',
        useCompoundLayout: false,
        showToolbarGroups: true,
        showFormField: false,
        textSizePresentation: 'select',
    },
} satisfies Meta<RichTextEditorPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Edit the document and see the semantic RichTextRenderer output update below it.',
            },
            ...storySource(/* language=TEXT */ String.raw`
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
    <RichTextEditorField label="Description" placeholder="Start writing..." value={value} onValueChange={setValue} />
    <RichTextRenderer value={value} aria-label="Rendered result" />
</div>`),
        },
    },
    render: ({
        useCompoundLayout,
        showToolbarGroups,
        showTextStyleGroup,
        showTextAppearanceGroup,
        showTextColorMenu,
        showTextSizeMenu,
        textSizePresentation,
        showLinkGroup,
        showSetLink,
        showUnsetLink,
        showListsGroup,
        showAlignmentGroup,
        showImageGroup,
        showToolbarSeparator,
        showFormField,
        ...args
    }) => {
        const [value, setValue] = useState<RichTextValue>(INITIAL_VALUE)
        const separator = showToolbarSeparator && (
            <RichTextEditor.ToolbarSeparator />
        )

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    width: '42rem',
                }}
            >
                {useCompoundLayout ? (
                    <RichTextEditor
                        {...args}
                        name={showFormField ? (args.name ?? 'description') : undefined}
                        value={value}
                        onValueChange={setValue}
                    >
                        <RichTextEditor.Label>
                            {args.label ?? 'Description'}
                        </RichTextEditor.Label>
                        <RichTextEditor.Toolbar>
                            {showToolbarGroups && <RichTextEditor.ToolbarGroups />}
                            {showTextAppearanceGroup && (
                                <>
                                    <RichTextEditor.TextAppearanceGroup />
                                    {separator}
                                </>
                            )}
                            {showTextSizeMenu && (
                                <RichTextEditor.TextAppearanceGroup.TextSizeMenu
                                    presentation={textSizePresentation}
                                />
                            )}
                            {showTextStyleGroup && (
                                <>
                                    <RichTextEditor.TextStyleGroup />
                                    {separator}
                                </>
                            )}
                            {showTextColorMenu && (
                                <RichTextEditor.TextAppearanceGroup.TextColorMenu />
                            )}
                            {showAlignmentGroup && (
                                <>
                                    <RichTextEditor.AlignmentGroup />
                                    {separator}
                                </>
                            )}
                            {showListsGroup && <RichTextEditor.ListsGroup />}
                            {(showAlignmentGroup || showListsGroup) && separator}
                            {showLinkGroup && (
                                <>
                                    <RichTextEditor.LinkGroup />
                                    {separator}
                                </>
                            )}
                            {showSetLink && <RichTextEditor.SetLink />}
                            {showUnsetLink && <RichTextEditor.UnsetLink />}
                            {showImageGroup && <RichTextEditor.ImageGroup />}
                        </RichTextEditor.Toolbar>
                        <RichTextEditor.EditorField />
                        <RichTextEditor.HelperText />
                    </RichTextEditor>
                ) : (
                    <RichTextEditorField
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
            ...storySource(/* language=TEXT */ String.raw`
<RichTextEditorField label="Read only" defaultValue={value} readOnly />
<RichTextEditorField label="Disabled" defaultValue={value} disabled />
<RichTextEditorField label="With error" error="A description is required." />`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                width: '42rem',
            }}
        >
            <RichTextEditorField
                label={'Read only'}
                defaultValue={INITIAL_VALUE}
                readOnly
            />
            <RichTextEditorField
                label={'Disabled'}
                defaultValue={INITIAL_VALUE}
                disabled
            />
            <RichTextEditorField
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
                story:
          'RichTextEditor also exposes a compound API: pass `children` to compose the label, toolbar groups and editable document explicitly instead of using the default RichTextEditorField-style layout.',
            },
            ...storySource(/* language=TEXT */ String.raw`
import { useState } from 'react'
import { RichTextEditor, type RichTextValue } from '@choco-vanille/ui'

const [value, setValue] = useState<RichTextValue>(initialValue)

<RichTextEditor
    label="Description"
    value={value}
    onValueChange={setValue}
    width="42rem"
    labels={{
        toolbar: 'Mise en forme',
        historyGroup: 'Historique',
        undo: 'Annuler',
        redo: 'Rétablir',
        textStyleGroup: 'Style du texte',
        bold: 'Gras',
        italic: 'Italique',
        underline: 'Souligné',
        strikethrough: 'Barré',
        linkGroup: 'Liens',
        addOrEditLink: 'Ajouter ou modifier le lien',
        linkGroupTrigger: 'Actions sur les liens',
        linkOptions: 'Options de lien',
        removeLink: 'Supprimer le lien',
        blockFormatGroup: 'Format de bloc',
        listsGroup: 'Listes',
        alignmentGroup: 'Alignement du texte',
        imageGroup: 'Actions sur les images',
    }}
>
    <RichTextEditor.Label>Description</RichTextEditor.Label>
    <RichTextEditor.Toolbar aria-label="Mise en forme">
        <RichTextEditor.ToolbarGroup aria-label="Taille et format de bloc">
            <RichTextEditor.TextAppearanceGroup.TextSizeMenu />
            <RichTextEditor.BlockFormatGroup />
        </RichTextEditor.ToolbarGroup>
        <RichTextEditor.ToolbarSeparator />
        <RichTextEditor.ToolbarGroup aria-label="Style du texte">
            <RichTextEditor.TextStyleGroup />
        </RichTextEditor.ToolbarGroup>
        <RichTextEditor.ToolbarSeparator />
        <RichTextEditor.ToolbarGroup aria-label="Couleur du texte">
            <RichTextEditor.TextAppearanceGroup.TextColorMenu />
        </RichTextEditor.ToolbarGroup>
        <RichTextEditor.ToolbarSeparator />
        <RichTextEditor.ToolbarGroup aria-label="Alignement et listes">
            <RichTextEditor.AlignmentGroup />
            <RichTextEditor.ListsGroup />
        </RichTextEditor.ToolbarGroup>
        <RichTextEditor.ToolbarSeparator />
        <RichTextEditor.ToolbarGroup aria-label="Liens et images">
            <RichTextEditor.LinkGroup />
            <RichTextEditor.ImageGroup />
        </RichTextEditor.ToolbarGroup>
    </RichTextEditor.Toolbar>
    <RichTextEditor.EditorField />
    <RichTextEditor.HelperText />
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
                    <RichTextEditor.TextAppearanceGroup.TextSizeMenu />
                    <RichTextEditor.ToolbarSeparator />
                    <RichTextEditor.TextStyleGroup />
                    <RichTextEditor.ToolbarSeparator />
                    <RichTextEditor.TextAppearanceGroup.TextColorMenu />
                    <RichTextEditor.ToolbarSeparator />
                    <RichTextEditor.AlignmentGroup />
                    <RichTextEditor.ListsGroup />
                    <RichTextEditor.ToolbarSeparator />
                    <RichTextEditor.LinkGroup />
                    <RichTextEditor.ToolbarSeparator />
                    <RichTextEditor.ImageGroup />
                </RichTextEditor.Toolbar>
                <RichTextEditor.EditorField />
                <RichTextEditor.HelperText />
            </RichTextEditor>
        )
    },
}
