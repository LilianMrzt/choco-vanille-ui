import { memo, type FC } from 'react'

import { RICH_TEXT_EDITOR_LABEL_STYLES } from '@components/forms/rich-text-editor/components/rich-text-editor-label/styles/RichTextEditorLabel.css.ts'
import type { RichTextEditorLabelProps } from '@components/forms/rich-text-editor/components/rich-text-editor-label/types/RichTextEditorLabel.props.ts'

const RichTextEditorLabel: FC<RichTextEditorLabelProps> = memo(({ id, disabled, children }) => (
    <label
        id={id}
        className={RICH_TEXT_EDITOR_LABEL_STYLES.root}
        data-disabled={disabled ? '' : undefined}
    >
        {children}
    </label>
))

RichTextEditorLabel.displayName = 'RichTextEditor.Label'

export default RichTextEditorLabel
