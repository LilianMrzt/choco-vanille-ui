import { memo, type FC } from 'react'

import RichTextEditor from '@components/forms/rich-text-editor/RichTextEditor.tsx'
import { RichTextEditorLabel } from '@components/forms/rich-text-editor/components/rich-text-editor-label'
import EditorField from '@components/forms/rich-text-editor/components/editor-field/EditorField.tsx'
import HelperText from '@components/forms/rich-text-editor/components/helper-text/HelperText.tsx'
import ReadOnlyField from '@components/forms/rich-text-editor/components/read-only-field/ReadOnlyField.tsx'
import Toolbar from '@components/forms/rich-text-editor/components/toolbar/Toolbar.tsx'
import ToolbarGroups from '@components/forms/rich-text-editor/components/toolbar-groups/ToolbarGroups.tsx'
import type { RichTextEditorFieldProps } from '@components/forms/rich-text-editor/types/RichTextEditorField.props.ts'

/**
 * Convenience wrapper that composes the standard rich-text form layout.
 */
const RichTextEditorField: FC<RichTextEditorFieldProps> = memo((props) => {
    const label = props.label
    const readOnly = props.readOnly ?? false
    const children = (
        <>
            {label && <RichTextEditorLabel disabled={readOnly ? false : props.disabled}>{label}</RichTextEditorLabel>}
            {readOnly ? (
                <ReadOnlyField />
            ) : (
                <>
                    <Toolbar>
                        <ToolbarGroups />
                    </Toolbar>
                    <EditorField />
                </>
            )}
            <HelperText />
        </>
    )

    if (label !== undefined || props['aria-label'] !== undefined) {
        return (
            <RichTextEditor
                {...props}
                readOnly={readOnly}
            >
                {children}
            </RichTextEditor>
        )
    }

    return (
        <RichTextEditor
            {...props}
            readOnly={readOnly}
        >
            {children}
        </RichTextEditor>
    )
})

RichTextEditorField.displayName = 'RichTextEditorField'

export default RichTextEditorField
