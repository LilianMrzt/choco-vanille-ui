import type { NamedExoticComponent } from 'react'

import type { AlignmentGroup } from '@components/forms/rich-text-editor/components/alignment-group'
import type { BlockFormatGroup } from '@components/forms/rich-text-editor/components/block-format-group'
import type { EditorField } from '@components/forms/rich-text-editor/components/editor-field'
import type {
    HistoryGroup,
    Redo,
    Undo,
} from '@components/forms/rich-text-editor/components/history-group'
import type { ImageGroup } from '@components/forms/rich-text-editor/components/image-group'
import type { HelperText } from '@components/forms/rich-text-editor/components/helper-text'
import type {
    LinkGroup,
    SetLink,
    UnsetLink,
} from '@components/forms/rich-text-editor/components/link-group'
import type { ListsGroup } from '@components/forms/rich-text-editor/components/lists-group'
import type RichTextEditorLabel from '@components/forms/rich-text-editor/components/rich-text-editor-label/RichTextEditorLabel.tsx'
import type { TextAppearanceGroupCompound } from '@components/forms/rich-text-editor/components/text-appearance-group'
import type {
    Bold,
    Italic,
    Strike,
    TextStyleGroup,
    Underline,
} from '@components/forms/rich-text-editor/components/text-style-group'
import type { Toolbar } from '@components/forms/rich-text-editor/components/toolbar'
import type { ToolbarGroups } from '@components/forms/rich-text-editor/components/toolbar-groups'
import type { ToolbarGroup } from '@components/forms/rich-text-editor/components/toolbar-group'
import type { ToolbarSeparator } from '@components/forms/rich-text-editor/components/toolbar-separator'
import type { ReadOnlyField } from '@components/forms/rich-text-editor/components/read-only-field'

import type { RichTextEditorProps } from '@components/forms/rich-text-editor/types/RichTextEditor.props.ts'

export type RichTextEditorCompound = NamedExoticComponent<RichTextEditorProps> & {
    Label: typeof RichTextEditorLabel
    EditorField: typeof EditorField
    ReadOnlyField: typeof ReadOnlyField
    HelperText: typeof HelperText
    Toolbar: typeof Toolbar
    ToolbarGroups: typeof ToolbarGroups
    ToolbarGroup: typeof ToolbarGroup
    ToolbarSeparator: typeof ToolbarSeparator
    HistoryGroup: typeof HistoryGroup
    Undo: typeof Undo
    Redo: typeof Redo
    TextStyleGroup: typeof TextStyleGroup
    Bold: typeof Bold
    Italic: typeof Italic
    Underline: typeof Underline
    Strike: typeof Strike
    TextAppearanceGroup: TextAppearanceGroupCompound
    LinkGroup: typeof LinkGroup
    SetLink: typeof SetLink
    UnsetLink: typeof UnsetLink
    BlockFormatGroup: typeof BlockFormatGroup
    ListsGroup: typeof ListsGroup
    AlignmentGroup: typeof AlignmentGroup
    ImageGroup: typeof ImageGroup
}
