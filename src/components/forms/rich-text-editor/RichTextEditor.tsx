import { EditorContent } from '@tiptap/react'
import { memo, useId } from 'react'

import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import EditorToolbar from '@components/forms/rich-text-editor/internal/editor-toolbar/EditorToolbar.tsx'
import { RichTextEditorLabel } from '@components/forms/rich-text-editor/components/rich-text-editor-label'
import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import { cn } from '@utils/cn.ts'
import { EMPTY_RICH_TEXT_DOCUMENT } from '@components/forms/rich-text-editor/constants/richTextEmptyDocument.const.ts'
import { RICH_TEXT_EDITOR_STYLES } from '@components/forms/rich-text-editor/styles/RichTextEditor.css.ts'
import { useRichTextEditor } from '@components/forms/rich-text-editor/hooks/useRichTextEditor.hook.ts'
import type {
    RichTextEditorCompound,
    RichTextEditorProps,
} from '@components/forms/rich-text-editor/types'

const RichTextEditor = memo<RichTextEditorProps>(({
    value,
    defaultValue,
    onValueChange,
    label,
    helperText,
    error,
    placeholder,
    disabled = false,
    readOnly = false,
    required = false,
    width,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}) => {
    const labelId = useId()
    const helperId = useId()
    const isDisabled = disabled || readOnly
    const editor = useRichTextEditor({
        value,
        defaultValue,
        onValueChange,
        disabled,
        readOnly,
        required,
        label,
        placeholder,
        error,
        helperText,
        labelId,
        helperId,
        ariaLabel,
        ariaLabelledBy,
    })

    if (!editor) {
        return null
    }

    if (readOnly) {
        return (
            <div
                className={RICH_TEXT_EDITOR_STYLES.root}
                style={width !== undefined ? { width } : undefined}
            >
                {label && (
                    <RichTextEditorLabel
                        id={labelId}
                        disabled={false}
                    >
                        {label}
                    </RichTextEditorLabel>
                )}
                <RichTextRenderer
                    value={value ?? defaultValue ?? EMPTY_RICH_TEXT_DOCUMENT}
                    className={className}
                    aria-describedby={error || helperText ? helperId : undefined}
                    aria-invalid={error ? 'true' : undefined}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy ?? (label ? labelId : undefined)}
                />
                {(error || helperText) && (
                    <HelperText
                        id={helperId}
                        hasError={Boolean(error)}
                    >
                        {error ?? helperText}
                    </HelperText>
                )}
            </div>
        )
    }

    return (
        <div
            className={RICH_TEXT_EDITOR_STYLES.root}
            style={width !== undefined ? { width } : undefined}
        >
            {label && (
                <RichTextEditorLabel
                    id={labelId}
                    disabled={disabled}
                >
                    {label}
                </RichTextEditorLabel>
            )}
            <EditorToolbar
                editor={editor}
                disabled={isDisabled}
            />
            <div
                className={cn(RICH_TEXT_EDITOR_STYLES.editor, className)}
                data-disabled={disabled || undefined}
                data-invalid={Boolean(error) || undefined}
            >
                <EditorContent editor={editor} />
            </div>
            {(error || helperText) && (
                <HelperText
                    id={helperId}
                    hasError={Boolean(error)}
                >
                    {error ?? helperText}
                </HelperText>
            )}
        </div>
    )
}) as unknown as RichTextEditorCompound

RichTextEditor.displayName = 'RichTextEditor'
RichTextEditor.Label = RichTextEditorLabel

export default RichTextEditor
