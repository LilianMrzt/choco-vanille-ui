import { memo, type FC } from 'react'

import SharedHelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import type { RichTextEditorHelperTextProps } from '@components/forms/rich-text-editor/components/helper-text/types/HelperText.props.ts'

const HelperText: FC<RichTextEditorHelperTextProps> = memo((props) => {
    const { error, helperText, helperId } = useRichTextEditorContext()
    const content = error ?? helperText

    if (!content) {
        return null
    }

    return (
        <SharedHelperText
            id={helperId}
            hasError={Boolean(error)}
            {...props}
        >
            {content}
        </SharedHelperText>
    )
})

HelperText.displayName = 'RichTextEditor.HelperText'

export default HelperText
