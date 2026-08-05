import AlignmentGroup from '@components/forms/rich-text-editor/components/alignment-group/AlignmentGroup.tsx'
import BlockFormatGroup from '@components/forms/rich-text-editor/components/block-format-group/BlockFormatGroup.tsx'
import HistoryGroup from '@components/forms/rich-text-editor/components/history-group/HistoryGroup.tsx'
import ImageGroup from '@components/forms/rich-text-editor/components/image-group/ImageGroup.tsx'
import LinkGroup from '@components/forms/rich-text-editor/components/link-group/LinkGroup.tsx'
import ListsGroup from '@components/forms/rich-text-editor/components/lists-group/ListsGroup.tsx'
import TextAppearanceGroup from '@components/forms/rich-text-editor/components/text-appearance-group/TextAppearanceGroup.tsx'
import TextStyleGroup from '@components/forms/rich-text-editor/components/text-style-group/TextStyleGroup.tsx'
import ToolbarSeparator from '@components/forms/rich-text-editor/components/toolbar-separator/ToolbarSeparator.tsx'

const ToolbarGroups = () => (
    <>
        <HistoryGroup />
        <ToolbarSeparator />
        <TextStyleGroup />
        <ToolbarSeparator />
        <TextAppearanceGroup />
        <ToolbarSeparator />
        <LinkGroup />
        <ToolbarSeparator />
        <BlockFormatGroup />
        <ListsGroup />
        <ToolbarSeparator />
        <AlignmentGroup />
        <ToolbarSeparator />
        <ImageGroup />
    </>
)

ToolbarGroups.displayName = 'RichTextEditor.ToolbarGroups'

export default ToolbarGroups
