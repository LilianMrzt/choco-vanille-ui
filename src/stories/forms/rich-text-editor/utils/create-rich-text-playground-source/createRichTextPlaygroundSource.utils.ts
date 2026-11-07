import type { RichTextValue } from '@components/forms/rich-text-editor'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'
import type { RichTextEditorPlaygroundArgs } from '@stories/forms/rich-text-editor/types'
import consumerSource1 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsTemplate1.source.txt?raw'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import consumerSource2 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsTemplate2.source.txt?raw'
import consumerSource3 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsTemplate3.source.txt?raw'
import consumerSource4 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample4.source.txt?raw'
import consumerSource5 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample5.source.txt?raw'
import consumerSource6 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample6.source.txt?raw'
import consumerSource7 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample7.source.txt?raw'
import consumerSource8 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample8.source.txt?raw'
import consumerSource9 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample9.source.txt?raw'
import consumerSource10 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample10.source.txt?raw'
import consumerSource11 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample11.source.txt?raw'
import consumerSource12 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample12.source.txt?raw'
import consumerSource13 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample13.source.txt?raw'
import consumerSource14 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample14.source.txt?raw'
import consumerSource15 from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/createRichTextPlaygroundSource.utilsExample15.source.txt?raw'
import textSizeSource from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/TextSizeMenu.source.txt?raw'
import presentationSource from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/Presentation.source.txt?raw'
import additionalImports from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/sources/AdditionalImports.source.txt?raw'

const makeCompoundChildren = (args: RichTextEditorPlaygroundArgs): string => {
    const toolbar: string[] = []
    const separator = () => {
        if (args.showToolbarSeparator) {
            toolbar.push(consumerSource15)
        }
    }
    if (args.showToolbarGroups) {
        toolbar.push(consumerSource14)
    }
    if (args.showTextAppearanceGroup) {
        toolbar.push(consumerSource13)
        separator()
    }
    if (args.showTextSizeMenu) {
        const presentation = args.textSizePresentation === undefined
            ? ''
            : ' ' + renderSource(presentationSource, { presentation: JSON.stringify(args.textSizePresentation) })
        toolbar.push(renderSource(textSizeSource, { presentation }))
    }
    if (args.showTextStyleGroup) {
        toolbar.push(consumerSource12)
        separator()
    }
    if (args.showTextColorMenu) {
        toolbar.push(consumerSource11)
    }
    if (args.showAlignmentGroup) {
        toolbar.push(consumerSource10)
        separator()
    }
    if (args.showListsGroup) {
        toolbar.push(consumerSource9)
    }
    if (args.showAlignmentGroup || args.showListsGroup) {
        separator()
    }
    if (args.showLinkGroup) {
        toolbar.push(consumerSource8)
        separator()
    }
    if (args.showSetLink) {
        toolbar.push(consumerSource7)
    }
    if (args.showUnsetLink) {
        toolbar.push(consumerSource6)
    }
    if (args.showImageGroup) {
        toolbar.push(consumerSource5)
    }

    const label = JSON.stringify(args.label ?? 'Description')
    const field = args.readOnly
        ? consumerSource4
        : renderSource(consumerSource3, { fragment1: toolbar.join('\n') })
    return renderSource(consumerSource2, { fragment1: label, fragment2: field })
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
    const transform = createControlledSource<RichTextEditorPlaygroundArgs>({
        component: 'RichTextEditor',
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
        additionalImports,
        children: () => makeCompoundChildren(args),
        wrapElement: (element) => {
            const openingTag = element.split(/\r?\n/, 1)[0].slice(0, -1)
            const field = openingTag.replace('RichTextEditor', 'RichTextEditorField') + ' />'

            return renderSource(consumerSource1, { fragment1: element, field })
        },
    })
    return transform(source, { args: { ...args, value: args.value ?? fallbackValue } })
}
