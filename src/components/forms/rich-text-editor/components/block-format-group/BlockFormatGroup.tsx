import { IconButton } from '@components/actions/icon-button'
import { Tooltip } from '@components/overlay/tooltip'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useState } from 'react'

import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import CodeIcon from '@resources/asset/CodeIcon.svg?react'
import MinusIcon from '@resources/asset/MinusIcon.svg?react'
import PilcrowIcon from '@resources/asset/PilcrowIcon.svg?react'
import QuoteIcon from '@resources/asset/QuoteIcon.svg?react'
import { BLOCK_FORMAT_GROUP_STYLES } from '@components/forms/rich-text-editor/components/block-format-group/styles/BlockFormatGroup.css.ts'
import type { BlockFormatGroupProps } from '@components/forms/rich-text-editor/components/block-format-group/types/BlockFormatGroup.props.ts'

/**
 * Toolbar group for block-level format commands: paragraph, headings H1–H3,
 * blockquote, code block, and horizontal rule. Use `presentation="inline"`
 * for individual icon buttons or `"menu"` (default) for a dropdown trigger.
 */
const BlockFormatGroup = ({ presentation = 'menu' }: BlockFormatGroupProps) => {
    const { editor, disabled, labels } = useRichTextEditorContext()
    const [blockFormatOpen, setBlockFormatOpen] = useState(false)

    if (!editor) {
        return null
    }

    const isParagraph = editor.isActive('paragraph')
    const isHeading1 = editor.isActive('heading', { level: 1 })
    const isHeading2 = editor.isActive('heading', { level: 2 })
    const isHeading3 = editor.isActive('heading', { level: 3 })
    const isBlockquote = editor.isActive('blockquote')
    const isCodeBlock = editor.isActive('codeBlock')

    const toggleCurrentHeading = (level: 1 | 2) => {
        const { from } = editor.state.selection

        editor
            .chain()
            .focus()
            .setTextSelection(from)
            .toggleHeading({ level })
            .run()
    }

    return (
        <div
            className={BLOCK_FORMAT_GROUP_STYLES.root}
            role={'group'}
            aria-label={labels.blockFormatGroup}
        >
            {presentation === 'inline' ? (
                <>
                    <Tooltip
                        content={labels.paragraph}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={PilcrowIcon}
                            aria-label={labels.paragraph}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onClick={() => editor.chain().focus().setParagraph().run()}
                        />
                    </Tooltip>
                    <Tooltip
                        content={labels.heading1}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={PilcrowIcon}
                            aria-label={labels.heading1}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onClick={() => toggleCurrentHeading(1)}
                        />
                    </Tooltip>
                    <Tooltip
                        content={labels.heading2}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={PilcrowIcon}
                            aria-label={labels.heading2}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onClick={() =>
                                editor.chain().focus().toggleHeading({ level: 2 }).run()
                            }
                        />
                    </Tooltip>
                    <Tooltip
                        content={labels.heading3}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={PilcrowIcon}
                            aria-label={labels.heading3}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onClick={() =>
                                editor.chain().focus().toggleHeading({ level: 3 }).run()
                            }
                        />
                    </Tooltip>
                    <Tooltip
                        content={labels.blockQuote}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={QuoteIcon}
                            aria-label={labels.blockQuote}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        />
                    </Tooltip>
                    <Tooltip
                        content={labels.codeBlock}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={CodeIcon}
                            aria-label={labels.codeBlock}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        />
                    </Tooltip>
                    <Tooltip
                        content={labels.insertHorizontalRule}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={MinusIcon}
                            aria-label={labels.insertHorizontalRule}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        />
                    </Tooltip>
                </>
            ) : (
                <DropdownMenu
                    modal={false}
                    open={blockFormatOpen}
                    onOpenChange={setBlockFormatOpen}
                >
                    <Tooltip
                        content={labels.blockFormatTrigger}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <DropdownMenu.Trigger>
                            <IconButton
                                type={'button'}
                                icon={PilcrowIcon}
                                aria-label={labels.blockFormatTrigger}
                                variant={'ghost'}
                                color={'primary'}
                                size={'sm'}
                                active={blockFormatOpen}
                                disabled={disabled}
                            />
                        </DropdownMenu.Trigger>
                    </Tooltip>
                    <DropdownMenu.Content aria-label={labels.blockFormatOptions}>
                        <DropdownMenu.Item
                            label={labels.paragraph}
                            startIcon={PilcrowIcon}
                            active={isParagraph}
                            onClick={() => editor.chain().focus().setParagraph().run()}
                        />
                        <DropdownMenu.Item
                            label={labels.heading1}
                            startIcon={PilcrowIcon}
                            active={isHeading1}
                            onClick={() => toggleCurrentHeading(1)}
                        />
                        <DropdownMenu.Item
                            label={labels.heading2}
                            startIcon={PilcrowIcon}
                            active={isHeading2}
                            onClick={() =>
                                editor.chain().focus().toggleHeading({ level: 2 }).run()
                            }
                        />
                        <DropdownMenu.Item
                            label={labels.heading3}
                            startIcon={PilcrowIcon}
                            active={isHeading3}
                            onClick={() =>
                                editor.chain().focus().toggleHeading({ level: 3 }).run()
                            }
                        />
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            label={labels.blockQuote}
                            startIcon={QuoteIcon}
                            active={isBlockquote}
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        />
                        <DropdownMenu.Item
                            label={labels.codeBlock}
                            startIcon={CodeIcon}
                            active={isCodeBlock}
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        />
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            label={labels.insertHorizontalRule}
                            startIcon={MinusIcon}
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
