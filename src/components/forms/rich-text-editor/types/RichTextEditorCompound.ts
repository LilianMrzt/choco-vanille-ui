import type { NamedExoticComponent } from 'react'

import type { AlignmentGroup } from '@components/forms/rich-text-editor/components/alignment-group'
import type { BlockFormatGroup } from '@components/forms/rich-text-editor/components/block-format-group'
import type { EditorField } from '@components/forms/rich-text-editor/components/editor-field'
import type { HistoryGroup } from '@components/forms/rich-text-editor/components/history-group'
import type { ImageGroup } from '@components/forms/rich-text-editor/components/image-group'
import type { LinkGroup } from '@components/forms/rich-text-editor/components/link-group'
import type { ListsGroup } from '@components/forms/rich-text-editor/components/lists-group'
import type RichTextEditorLabel from '@components/forms/rich-text-editor/components/rich-text-editor-label/RichTextEditorLabel.tsx'
import type { TextAppearanceGroup } from '@components/forms/rich-text-editor/components/text-appearance-group'
import type { TextStyleGroup } from '@components/forms/rich-text-editor/components/text-style-group'
import type { Toolbar } from '@components/forms/rich-text-editor/components/toolbar'
import type { ToolbarGroups } from '@components/forms/rich-text-editor/components/toolbar-groups'
import type { ToolbarSeparator } from '@components/forms/rich-text-editor/components/toolbar-separator'

import type { RichTextEditorProps } from '@components/forms/rich-text-editor/types/RichTextEditor.props.ts'

export type RichTextEditorCompound = NamedExoticComponent<RichTextEditorProps> & {
    Label: typeof RichTextEditorLabel
    EditorField: typeof EditorField
    Toolbar: typeof Toolbar
    ToolbarGroups: typeof ToolbarGroups
    ToolbarSeparator: typeof ToolbarSeparator
    HistoryGroup: typeof HistoryGroup
    TextStyleGroup: typeof TextStyleGroup
    TextAppearanceGroup: typeof TextAppearanceGroup
    LinkGroup: typeof LinkGroup
    BlockFormatGroup: typeof BlockFormatGroup
    ListsGroup: typeof ListsGroup
    AlignmentGroup: typeof AlignmentGroup
    ImageGroup: typeof ImageGroup
}
