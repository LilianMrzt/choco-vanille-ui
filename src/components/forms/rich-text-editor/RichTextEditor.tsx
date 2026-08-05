import { EditorContent } from '@tiptap/react'
import { memo, useId } from 'react'

import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import EditorToolbar from '@components/forms/rich-text-editor/internal/editor-toolbar/EditorToolbar.tsx'
import AlignmentGroup from '@components/forms/rich-text-editor/components/alignment-group/AlignmentGroup.tsx'
import BlockFormatGroup from '@components/forms/rich-text-editor/components/block-format-group/BlockFormatGroup.tsx'
import EditorField from '@components/forms/rich-text-editor/components/editor-field/EditorField.tsx'
import HistoryGroup from '@components/forms/rich-text-editor/components/history-group/HistoryGroup.tsx'
import ImageGroup from '@components/forms/rich-text-editor/components/image-group/ImageGroup.tsx'
import LinkGroup from '@components/forms/rich-text-editor/components/link-group/LinkGroup.tsx'
import ListsGroup from '@components/forms/rich-text-editor/components/lists-group/ListsGroup.tsx'
import { RichTextEditorLabel } from '@components/forms/rich-text-editor/components/rich-text-editor-label'
import { RichTextEditorFormField } from '@components/forms/rich-text-editor/components/rich-text-editor-form-field'
import TextAppearanceGroup from '@components/forms/rich-text-editor/components/text-appearance-group/TextAppearanceGroup.tsx'
import TextStyleGroup from '@components/forms/rich-text-editor/components/text-style-group/TextStyleGroup.tsx'
import Toolbar from '@components/forms/rich-text-editor/components/toolbar/Toolbar.tsx'
import ToolbarGroups from '@components/forms/rich-text-editor/components/toolbar-groups/ToolbarGroups.tsx'
import ToolbarSeparator from '@components/forms/rich-text-editor/components/toolbar-separator/ToolbarSeparator.tsx'
import { RichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
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
    onImageUpload,
    label,
    helperText,
    error,
    placeholder,
    disabled = false,
    readOnly = false,
    required = false,
    width,
    className,
    name,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
}) => {
    const labelId = useId()
    const helperId = useId()
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

    // Rebuilt on every render (including editor transactions) so that compound slots consuming
    // this context through a static `children` tree are not skipped by React's bailout optimization.
    const contextValue = {
        editor,
        disabled,
        readOnly,
        onImageUpload,
        error,
        labelId,
        helperId,
        name,
        required,
    }

    if (!editor) {
        return null
    }

    if (children !== undefined) {
        return (
            <RichTextEditorContext.Provider value={contextValue}>
                <div
                    className={cn(RICH_TEXT_EDITOR_STYLES.root, className)}
                    style={width !== undefined ? { width } : undefined}
                >
                    {children}
                </div>
            </RichTextEditorContext.Provider>
        )
    }

    if (readOnly) {
        return (
            <RichTextEditorContext.Provider value={contextValue}>
                <div
                    className={cn(RICH_TEXT_EDITOR_STYLES.root, className)}
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
                        aria-describedby={error || helperText ? helperId : undefined}
                        aria-invalid={error ? 'true' : undefined}
                        aria-label={ariaLabel}
                        aria-labelledby={ariaLabelledBy ?? (label ? labelId : undefined)}
                    />
                    {name && (
                        <RichTextEditorFormField
                            name={name}
                            value={editor.isEmpty ? '' : JSON.stringify(editor.getJSON())}
                            disabled={disabled}
                            required={false}
                        />
                    )}
                    {(error || helperText) && (
                        <HelperText
                            id={helperId}
                            hasError={Boolean(error)}
                        >
                            {error ?? helperText}
                        </HelperText>
                    )}
                </div>
            </RichTextEditorContext.Provider>
        )
    }

    return (
        <RichTextEditorContext.Provider value={contextValue}>
            <div
                className={cn(RICH_TEXT_EDITOR_STYLES.root, className)}
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
                <EditorToolbar />
                <div
                    className={RICH_TEXT_EDITOR_STYLES.editor}
                    data-disabled={disabled || undefined}
                    data-invalid={Boolean(error) || undefined}
                >
                    <EditorContent editor={editor} />
                </div>
                {name && (
                    <RichTextEditorFormField
                        name={name}
                        value={editor.isEmpty ? '' : JSON.stringify(editor.getJSON())}
                        disabled={disabled}
                        required={required}
                    />
                )}
                {(error || helperText) && (
                    <HelperText
                        id={helperId}
                        hasError={Boolean(error)}
                    >
                        {error ?? helperText}
                    </HelperText>
                )}
            </div>
        </RichTextEditorContext.Provider>
    )
}) as unknown as RichTextEditorCompound

RichTextEditor.displayName = 'RichTextEditor'
RichTextEditor.Label = RichTextEditorLabel
RichTextEditor.EditorField = EditorField
RichTextEditor.Toolbar = Toolbar
RichTextEditor.ToolbarGroups = ToolbarGroups
RichTextEditor.ToolbarSeparator = ToolbarSeparator
RichTextEditor.HistoryGroup = HistoryGroup
RichTextEditor.TextStyleGroup = TextStyleGroup
RichTextEditor.TextAppearanceGroup = TextAppearanceGroup
RichTextEditor.LinkGroup = LinkGroup
RichTextEditor.BlockFormatGroup = BlockFormatGroup
RichTextEditor.ListsGroup = ListsGroup
RichTextEditor.AlignmentGroup = AlignmentGroup
RichTextEditor.ImageGroup = ImageGroup

export default RichTextEditor
