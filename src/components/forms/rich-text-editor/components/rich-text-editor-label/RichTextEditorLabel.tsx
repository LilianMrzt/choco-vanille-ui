import { memo, useContext, type FC } from 'react'

import FormLabel from '@components/forms/_shared/components/form-label/FormLabel.tsx'
import type { RichTextEditorLabelProps } from '@components/forms/rich-text-editor/components/rich-text-editor-label/types/RichTextEditorLabel.props.ts'
import { RichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

/**
 * Visible label text for the rich-text editor field. Reads `labelId` from
 * the `RichTextEditor` context to link the label to the editor control.
 */
const RichTextEditorLabel: FC<RichTextEditorLabelProps> = memo(({ id, disabled, children }) => {
    const context = useContext(RichTextEditorContext)
    const resolvedId = id ?? context?.labelId

    return (
        <FormLabel
            id={resolvedId}
            disabled={disabled}
        >
            {children}
        </FormLabel>
    )
})

RichTextEditorLabel.displayName = 'RichTextEditor.Label'

export default RichTextEditorLabel
