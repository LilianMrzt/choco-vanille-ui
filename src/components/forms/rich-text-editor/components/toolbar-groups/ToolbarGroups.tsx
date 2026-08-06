import AlignmentGroup from '@components/forms/rich-text-editor/components/alignment-group/AlignmentGroup.tsx'
import BlockFormatGroup from '@components/forms/rich-text-editor/components/block-format-group/BlockFormatGroup.tsx'
import ImageGroup from '@components/forms/rich-text-editor/components/image-group/ImageGroup.tsx'
import LinkGroup from '@components/forms/rich-text-editor/components/link-group/LinkGroup.tsx'
import ListsGroup from '@components/forms/rich-text-editor/components/lists-group/ListsGroup.tsx'
import TextColorMenu from '@components/forms/rich-text-editor/components/text-appearance-group/TextColorMenu.tsx'
import TextSizeMenu from '@components/forms/rich-text-editor/components/text-appearance-group/TextSizeMenu.tsx'
import TextStyleGroup from '@components/forms/rich-text-editor/components/text-style-group/TextStyleGroup.tsx'
import ToolbarGroup from '@components/forms/rich-text-editor/components/toolbar-group/ToolbarGroup.tsx'
import ToolbarSeparator from '@components/forms/rich-text-editor/components/toolbar-separator/ToolbarSeparator.tsx'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

const ToolbarGroups = () => {
    const { labels } = useRichTextEditorContext()

    return (
        <>
            <ToolbarGroup aria-label={labels.fontSizeAndBlockFormatGroup}>
                <TextSizeMenu />
                <BlockFormatGroup />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup aria-label={labels.textStyleGroup}>
                <TextStyleGroup />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup aria-label={labels.textAppearanceGroup}>
                <TextColorMenu />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup aria-label={labels.alignmentAndListsGroup}>
                <AlignmentGroup />
                <ListsGroup />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup aria-label={labels.linksAndImagesGroup}>
                <LinkGroup />
                <ImageGroup />
            </ToolbarGroup>
        </>
    )
}

ToolbarGroups.displayName = 'RichTextEditor.ToolbarGroups'

export default ToolbarGroups
