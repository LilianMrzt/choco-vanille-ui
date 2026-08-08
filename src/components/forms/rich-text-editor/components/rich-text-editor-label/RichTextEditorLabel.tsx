import { memo, useContext, type FC } from 'react'

import { RICH_TEXT_EDITOR_LABEL_STYLES } from '@components/forms/rich-text-editor/components/rich-text-editor-label/styles/RichTextEditorLabel.css.ts'
import type { RichTextEditorLabelProps } from '@components/forms/rich-text-editor/components/rich-text-editor-label/types/RichTextEditorLabel.props.ts'
import { RichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

/**
 * Visible `<label>` for the rich-text editor field. Reads `labelId` from
 * the `RichTextEditor` context to link the label to the editor control.
 */
const RichTextEditorLabel: FC<RichTextEditorLabelProps> = memo(({ id, disabled, children }) => {
    const context = useContext(RichTextEditorContext)
    const resolvedId = id ?? context?.labelId

    return (
        <label
            id={resolvedId}
            className={RICH_TEXT_EDITOR_LABEL_STYLES.root}
            data-disabled={disabled ? '' : undefined}
        >
            {children}
        </label>
    )
})

RichTextEditorLabel.displayName = 'RichTextEditor.Label'

export default RichTextEditorLabel
