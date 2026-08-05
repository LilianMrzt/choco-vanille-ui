import { useEditor, type Editor } from '@tiptap/react'
import Color from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { FontSize, TextStyle } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useReducer, useRef } from 'react'

import { EMPTY_RICH_TEXT_DOCUMENT } from '@components/forms/rich-text-editor/constants/richTextEmptyDocument.const.ts'
import type { RichTextValue } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'
import { handleRichTextImagePaste } from '@components/forms/rich-text-editor/utils/richTextImagePaste.utils.ts'
import { normalizeRichTextUrl } from '@components/forms/rich-text-editor/utils/richText.utils.ts'

type UseRichTextEditorOptions = {
    value?: RichTextValue
    defaultValue?: RichTextValue
    onValueChange?: (value: RichTextValue) => void
    disabled: boolean
    readOnly: boolean
    required: boolean
    label?: string
    placeholder?: string
    error?: string
    helperText?: string
    labelId: string
    helperId: string
    ariaLabel?: string
    ariaLabelledBy?: string
}

export const useRichTextEditor = ({
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
}: UseRichTextEditorOptions): Editor | null => {
    const onValueChangeRef = useRef(onValueChange)
    const lastEmittedValueRef = useRef<string | undefined>(undefined)
    const [, refresh] = useReducer((count: number) => count + 1, 0)
    const isDisabled = disabled || readOnly

    useEffect(() => {
        onValueChangeRef.current = onValueChange
    }, [onValueChange])

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                link: false,
            }),
            TextStyle,
            FontSize,
            Color,
            Image.configure({
                allowBase64: true,
                inline: true,
            }),
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
        content: value ?? defaultValue ?? EMPTY_RICH_TEXT_DOCUMENT,
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
            handlePaste: handleRichTextImagePaste,
        },
        onUpdate: ({ editor: updatedEditor }) => {
            const nextValue = updatedEditor.getJSON() as RichTextValue

            lastEmittedValueRef.current = JSON.stringify(nextValue)
            onValueChangeRef.current?.(nextValue)
        },
        onTransaction: refresh,
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

    return editor
}
