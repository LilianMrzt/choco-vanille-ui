import type { RichTextValue } from '@components/forms/rich-text-editor'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'
import type { RichTextEditorPlaygroundArgs } from '@stories/forms/rich-text-editor/types'

/**
 * Produces a consumer example for the controlled rich-text field.
 * @internal Storybook-only utility; not part of the public package API.
 * @param fallbackValue - Initial document when the value arg is absent.
 * @returns A Storybook source transform.
 * @example createRichTextPlaygroundSource({ type: 'doc', content: [] })
 */
export const createRichTextPlaygroundSource = (fallbackValue: RichTextValue) => {
    const transform = createControlledSource<RichTextEditorPlaygroundArgs>({
        component: 'RichTextEditorField',
        stateProp: 'value',
        eventProp: 'onValueChange',
        stateType: 'RichTextValue',
        handler: 'setValue',
        additionalImports: "import type { RichTextValue } from '@choco-vanille/ui'\n",
    })

    return (source: string, { args }: Readonly<{ args: RichTextEditorPlaygroundArgs }>): string =>
        transform(source, { args: { ...args, value: args.value ?? fallbackValue } })
}
