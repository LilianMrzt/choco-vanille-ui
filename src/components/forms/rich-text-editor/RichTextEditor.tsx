import { useEditor, EditorContent } from '@tiptap/react'
import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { memo, useEffect, useId, useReducer, useRef } from 'react'

import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import EditorToolbar from '@components/forms/rich-text-editor/internal/editor-toolbar/EditorToolbar.tsx'
import { RichTextEditorLabel } from '@components/forms/rich-text-editor/components/rich-text-editor-label'
import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import { cn } from '@utils/cn.ts'

import { RICH_TEXT_EDITOR_STYLES } from '@components/forms/rich-text-editor/styles/RichTextEditor.css.ts'
import type {
    RichTextEditorCompound,
    RichTextEditorProps,
    RichTextValue,
} from '@components/forms/rich-text-editor/types'
import { normalizeRichTextUrl } from '@components/forms/rich-text-editor/utils/richText.utils.ts'

const EMPTY_DOCUMENT: RichTextValue = {
    type: 'doc',
    content: [{ type: 'paragraph' }],
}

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
    const onValueChangeRef = useRef(onValueChange)
    const lastEmittedValueRef = useRef<string | undefined>(undefined)
    const [, refresh] = useReducer((count: number) => count + 1, 0)
    const isDisabled = disabled || readOnly

    useEffect(() => {
        onValueChangeRef.current = onValueChange
    }, [onValueChange])

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ link: false }),
            TextStyle,
            Color,
            Link.configure({
                autolink: true,
                linkOnPaste: true,
                openOnClick: false,
                enableClickSelection: true,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
                isAllowedUri: (url) => Boolean(normalizeRichTextUrl(url)),
                shouldAutoLink: (url) => Boolean(normalizeRichTextUrl(url)),
            }),
        ],
        content: value ?? defaultValue ?? EMPTY_DOCUMENT,
        editable: !isDisabled,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                ...(error || helperText ? { 'aria-describedby': helperId } : {}),
                ...(error ? { 'aria-invalid': 'true' } : {}),
                ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
                ...(ariaLabelledBy || label ? { 'aria-labelledby': ariaLabelledBy ?? labelId } : {}),
                'aria-multiline': 'true',
                ...(required ? { 'aria-required': 'true' } : {}),
                'data-placeholder': placeholder ?? '',
                role: 'textbox',
            },
        },
        onUpdate: ({ editor: updatedEditor }) => {
            const nextValue = updatedEditor.getJSON() as RichTextValue

            lastEmittedValueRef.current = JSON.stringify(nextValue)
            onValueChangeRef.current?.(nextValue)
        },
        onTransaction: () => refresh(),
    })

    useEffect(() => {
        if (!editor) {
            return
        }

        editor.setEditable(!isDisabled)
    }, [editor, isDisabled])

    useEffect(() => {
        if (!editor || value === undefined) {
            return
        }

        const nextValue = JSON.stringify(value)
        const currentValue = JSON.stringify(editor.getJSON())

        if (nextValue === lastEmittedValueRef.current || nextValue === currentValue) {
            return
        }

        const { from, to } = editor.state.selection
        editor.commands.setContent(value, { emitUpdate: false })
        const documentSize = editor.state.doc.content.size

        editor.commands.setTextSelection({
            from: Math.min(from, documentSize),
            to: Math.min(to, documentSize),
        })
        refresh()
    }, [editor, value])

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
                    value={value ?? defaultValue ?? EMPTY_DOCUMENT}
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
