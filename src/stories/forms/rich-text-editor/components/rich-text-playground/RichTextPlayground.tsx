import { useArgs } from 'storybook/preview-api'
import type { ReactElement } from 'react'

import { RichTextEditorField, type RichTextValue } from '@components/forms/rich-text-editor'
import { INITIAL_VALUE } from '@stories/forms/rich-text-editor/constants'
import type { RichTextEditorPlaygroundArgs } from '@stories/forms/rich-text-editor/types'

/**
 * Renders the controlled rich-text field.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The interactive editor.
 * @example <RichTextPlayground />
 */
const RichTextPlayground = (): ReactElement => {
    const [args, updateArgs] = useArgs<RichTextEditorPlaygroundArgs>()
    const handleValueChange = (value: RichTextValue): void => {
        args.onValueChange?.(value)
        updateArgs({ value })
    }

    return (
        <RichTextEditorField
            {...args}
            value={args.value ?? INITIAL_VALUE}
            onValueChange={handleValueChange}
        />
    )
}

export default RichTextPlayground
