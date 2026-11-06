import type { RichTextValue } from '@components/forms/rich-text-editor'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/createControlledSource.utils'
import type { RichTextEditorPlaygroundArgs } from '@stories/forms/rich-text-editor/types'

const makeCompoundChildren = (args: RichTextEditorPlaygroundArgs): string => {
    const toolbar: string[] = []
    const separator = () => {
        if (args.showToolbarSeparator) {
            toolbar.push('            <RichTextEditor.ToolbarSeparator />')
        }
    }
    if (args.showToolbarGroups) {
        toolbar.push('            <RichTextEditor.ToolbarGroups />')
    }
    if (args.showTextAppearanceGroup) {
        toolbar.push('            <RichTextEditor.TextAppearanceGroup />')
        separator()
    }
    if (args.showTextSizeMenu) {
        const presentation = args.textSizePresentation === undefined
            ? ''
            : ` presentation={${JSON.stringify(args.textSizePresentation)}}`
        toolbar.push(`            <RichTextEditor.TextAppearanceGroup.TextSizeMenu${presentation} />`)
    }
    if (args.showTextStyleGroup) {
        toolbar.push('            <RichTextEditor.TextStyleGroup />')
        separator()
    }
    if (args.showTextColorMenu) {
        toolbar.push('            <RichTextEditor.TextAppearanceGroup.TextColorMenu />')
    }
    if (args.showAlignmentGroup) {
        toolbar.push('            <RichTextEditor.AlignmentGroup />')
        separator()
    }
    if (args.showListsGroup) {
        toolbar.push('            <RichTextEditor.ListsGroup />')
    }
    if (args.showAlignmentGroup || args.showListsGroup) {
        separator()
    }
    if (args.showLinkGroup) {
        toolbar.push('            <RichTextEditor.LinkGroup />')
        separator()
    }
    if (args.showSetLink) {
        toolbar.push('            <RichTextEditor.SetLink />')
    }
    if (args.showUnsetLink) {
        toolbar.push('            <RichTextEditor.UnsetLink />')
    }
    if (args.showImageGroup) {
        toolbar.push('            <RichTextEditor.ImageGroup />')
    }

    const label = JSON.stringify(args.label ?? 'Description')
    const field = args.readOnly
        ? '        <RichTextEditor.ReadOnlyField />'
        : `        <RichTextEditor.Toolbar>\n${toolbar.join('\n')}\n        </RichTextEditor.Toolbar>\n        <RichTextEditor.EditorField />`
    return `        <RichTextEditor.Label>{${label}}</RichTextEditor.Label>\n${field}\n        <RichTextEditor.HelperText />`
}

/**
 * Produces a consumer example matching the selected rich-text playground layout.
 * @param fallbackValue - Initial document used when the value arg is absent.
 * @returns A Storybook source transform.
 */
export const createRichTextPlaygroundSource = (fallbackValue: RichTextValue) => (
    source: string,
    { args }: Readonly<{ args: RichTextEditorPlaygroundArgs }>,
): string => {
    const { useCompoundLayout } = args
    const transform = createControlledSource<RichTextEditorPlaygroundArgs>({
        component: useCompoundLayout ? 'RichTextEditor' : 'RichTextEditorField',
        stateProp: 'value',
        eventProp: 'onValueChange',
        stateType: 'RichTextValue',
        handler: 'setValue',
        omitted: [
            'useCompoundLayout',
            'showToolbarGroups',
            'showTextStyleGroup',
            'showTextAppearanceGroup',
            'showTextColorMenu',
            'showTextSizeMenu',
            'textSizePresentation',
            'showLinkGroup',
            'showSetLink',
            'showUnsetLink',
            'showListsGroup',
            'showAlignmentGroup',
            'showImageGroup',
            'showToolbarSeparator',
        ],
        additionalImports: "import { RichTextRenderer, type RichTextValue } from '@choco-vanille/ui'\n",
        children: useCompoundLayout ? () => makeCompoundChildren(args) : undefined,
        wrapElement: (element) => `(
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '42rem' }}>
            ${element}
            <RichTextRenderer value={value} aria-label="Rendered result" />
        </div>
    )`,
    })
    return transform(source, { args: { ...args, value: args.value ?? fallbackValue } })
}
