import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useState } from 'react'

import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { BLOCK_FORMAT_GROUP_STYLES } from '@components/forms/rich-text-editor/components/block-format-group/styles/BlockFormatGroup.css.ts'
import type { BlockFormatGroupProps } from '@components/forms/rich-text-editor/components/block-format-group/types/BlockFormatGroup.props.ts'

const BlockFormatGroup = ({ presentation = 'menu' }: BlockFormatGroupProps) => {
    const { editor, disabled, labels } = useRichTextEditorContext()
    const [blockFormatOpen, setBlockFormatOpen] = useState(false)

    if (!editor) {
        return null
    }

    const toggleCurrentHeading = (level: 1 | 2) => {
        const { from } = editor.state.selection

        editor.chain().focus().setTextSelection(from).toggleHeading({ level }).run()
    }

    return (
        <div
            className={BLOCK_FORMAT_GROUP_STYLES.root}
            role={'group'}
            aria-label={labels.blockFormatGroup}
        >
            {presentation === 'inline' ? (
                <>
                    <IconButton
                        type={'button'}
                        icon={'lucide:pilcrow'}
                        aria-label={labels.paragraph}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().setParagraph().run()}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:heading-1'}
                        aria-label={labels.heading1}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onClick={() => toggleCurrentHeading(1)}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:heading-2'}
                        aria-label={labels.heading2}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:heading-3'}
                        aria-label={labels.heading3}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:quote'}
                        aria-label={labels.blockQuote}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:square-code'}
                        aria-label={labels.codeBlock}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:minus'}
                        aria-label={labels.insertHorizontalRule}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    />
                </>
            ) : (
                <DropdownMenu
                    modal={false}
                    open={blockFormatOpen}
                    onOpenChange={setBlockFormatOpen}
                >
                    <DropdownMenu.Trigger>
                        <IconButton
                            type={'button'}
                            icon={'lucide:pilcrow'}
                            aria-label={labels.blockFormatTrigger}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            active={blockFormatOpen}
                            disabled={disabled}
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content aria-label={labels.blockFormatOptions}>
                        <DropdownMenu.Item
                            label={labels.paragraph}
                            startIcon={'lucide:pilcrow'}
                            onClick={() => editor.chain().focus().setParagraph().run()}
                        />
                        <DropdownMenu.Item
                            label={labels.heading1}
                            startIcon={'lucide:heading-1'}
                            onClick={() => toggleCurrentHeading(1)}
                        />
                        <DropdownMenu.Item
                            label={labels.heading2}
                            startIcon={'lucide:heading-2'}
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        />
                        <DropdownMenu.Item
                            label={labels.heading3}
                            startIcon={'lucide:heading-3'}
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        />
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            label={labels.blockQuote}
                            startIcon={'lucide:quote'}
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        />
                        <DropdownMenu.Item
                            label={labels.codeBlock}
                            startIcon={'lucide:square-code'}
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        />
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            label={labels.insertHorizontalRule}
                            startIcon={'lucide:minus'}
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        />
                    </DropdownMenu.Content>
                </DropdownMenu>
            )}
        </div>
    )
}

BlockFormatGroup.displayName = 'RichTextEditor.BlockFormatGroup'

export default BlockFormatGroup
