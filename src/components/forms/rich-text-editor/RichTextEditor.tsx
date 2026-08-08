import { memo, useId } from 'react'

import AlignmentGroup from '@components/forms/rich-text-editor/components/alignment-group/AlignmentGroup.tsx'
import BlockFormatGroup from '@components/forms/rich-text-editor/components/block-format-group/BlockFormatGroup.tsx'
import EditorField from '@components/forms/rich-text-editor/components/editor-field/EditorField.tsx'
import HelperText from '@components/forms/rich-text-editor/components/helper-text/HelperText.tsx'
import HistoryGroup from '@components/forms/rich-text-editor/components/history-group/HistoryGroup.tsx'
import { Redo, Undo } from '@components/forms/rich-text-editor/components/history-group'
import ImageGroup from '@components/forms/rich-text-editor/components/image-group/ImageGroup.tsx'
import LinkGroup from '@components/forms/rich-text-editor/components/link-group/LinkGroup.tsx'
import { SetLink, UnsetLink } from '@components/forms/rich-text-editor/components/link-group'
import ListsGroup from '@components/forms/rich-text-editor/components/lists-group/ListsGroup.tsx'
import { RichTextEditorLabel } from '@components/forms/rich-text-editor/components/rich-text-editor-label'
import ReadOnlyField from '@components/forms/rich-text-editor/components/read-only-field/ReadOnlyField.tsx'
import TextAppearanceGroup from '@components/forms/rich-text-editor/components/text-appearance-group/TextAppearanceGroup.tsx'
import TextStyleGroup from '@components/forms/rich-text-editor/components/text-style-group/TextStyleGroup.tsx'
import {
    Bold,
    Italic,
    Strike,
    Underline,
} from '@components/forms/rich-text-editor/components/text-style-group'
import Toolbar from '@components/forms/rich-text-editor/components/toolbar/Toolbar.tsx'
import ToolbarGroups from '@components/forms/rich-text-editor/components/toolbar-groups/ToolbarGroups.tsx'
import ToolbarGroup from '@components/forms/rich-text-editor/components/toolbar-group/ToolbarGroup.tsx'
import ToolbarSeparator from '@components/forms/rich-text-editor/components/toolbar-separator/ToolbarSeparator.tsx'
import { RichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { cn } from '@utils/cn.ts'
import { EMPTY_RICH_TEXT_DOCUMENT } from '@components/forms/rich-text-editor/constants/richTextEmptyDocument.const.ts'
import { RICH_TEXT_EDITOR_DEFAULT_LABELS } from '@components/forms/rich-text-editor/constants/richTextEditorDefaultLabels.const.ts'
import { RICH_TEXT_EDITOR_STYLES } from '@components/forms/rich-text-editor/styles/RichTextEditor.css.ts'
import { useRichTextEditor } from '@components/forms/rich-text-editor/hooks/useRichTextEditor.hook.ts'
import type {
    RichTextEditorCompound,
    RichTextEditorProps,
    RichTextValue,
} from '@components/forms/rich-text-editor/types'

/**
 * Full-featured rich-text editor compound backed by TipTap. Manages a
 * controlled/uncontrolled JSON document value and provides context to all
 * slot components.
 *
 * Compound slots: `RichTextEditor.Label`, `.EditorField`, `.ReadOnlyField`,
 * `.HelperText`, `.Toolbar`, `.ToolbarGroups`, `.ToolbarGroup`,
 * `.ToolbarSeparator`, `.HistoryGroup`, `.Undo`, `.Redo`,
 * `.TextStyleGroup`, `.Bold`, `.Italic`, `.Underline`, `.Strike`,
 * `.TextAppearanceGroup`, `.LinkGroup`, `.SetLink`, `.UnsetLink`,
 * `.BlockFormatGroup`, `.ListsGroup`, `.AlignmentGroup`, `.ImageGroup`.
 */
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
    labels,
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

    // Rebuilt on every render so static compound children observe editor transactions.
    const contextValue = {
        editor,
        disabled,
        readOnly,
        onImageUpload,
        label,
        helperText,
        error,
        ariaLabel,
        ariaLabelledBy,
        labelId,
        helperId,
        name,
        required,
        renderedValue: (editor?.getJSON() as RichTextValue | undefined)
            ?? value
            ?? defaultValue
            ?? EMPTY_RICH_TEXT_DOCUMENT,
        labels: { ...RICH_TEXT_EDITOR_DEFAULT_LABELS, ...labels },
    }

    if (!editor) {
        return null
    }

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
}) as unknown as RichTextEditorCompound

RichTextEditor.displayName = 'RichTextEditor'
RichTextEditor.Label = RichTextEditorLabel
RichTextEditor.EditorField = EditorField
RichTextEditor.ReadOnlyField = ReadOnlyField
RichTextEditor.HelperText = HelperText
RichTextEditor.Toolbar = Toolbar
RichTextEditor.ToolbarGroups = ToolbarGroups
RichTextEditor.ToolbarGroup = ToolbarGroup
RichTextEditor.ToolbarSeparator = ToolbarSeparator
RichTextEditor.HistoryGroup = HistoryGroup
RichTextEditor.Undo = Undo
RichTextEditor.Redo = Redo
RichTextEditor.TextStyleGroup = TextStyleGroup
RichTextEditor.Bold = Bold
RichTextEditor.Italic = Italic
RichTextEditor.Underline = Underline
RichTextEditor.Strike = Strike
RichTextEditor.TextAppearanceGroup = TextAppearanceGroup
RichTextEditor.LinkGroup = LinkGroup
RichTextEditor.SetLink = SetLink
RichTextEditor.UnsetLink = UnsetLink
RichTextEditor.BlockFormatGroup = BlockFormatGroup
RichTextEditor.ListsGroup = ListsGroup
RichTextEditor.AlignmentGroup = AlignmentGroup
RichTextEditor.ImageGroup = ImageGroup

export default RichTextEditor
