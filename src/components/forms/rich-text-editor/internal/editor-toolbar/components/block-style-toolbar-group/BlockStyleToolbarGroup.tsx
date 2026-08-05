import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useState } from 'react'
import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const BlockStyleToolbarGroup = ({ editor, disabled }: EditorToolbarProps) => {
    const [blockFormatOpen, setBlockFormatOpen] = useState(false)
    const [listsOpen, setListsOpen] = useState(false)
    const toggleCurrentHeading = (level: 1 | 2) => {
        const { from } = editor.state.selection

        editor.chain().focus().setTextSelection(from).toggleHeading({ level }).run()
    }

    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.group}
            role={'group'}
            aria-label={'Block formatting'}
        >
            <DropdownMenu
                modal={false}
                open={blockFormatOpen}
                onOpenChange={setBlockFormatOpen}
            >
                <DropdownMenu.Trigger>
                    <IconButton
                        type={'button'}
                        icon={'lucide:pilcrow'}
                        aria-label={'Block format'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        active={blockFormatOpen}
                        disabled={disabled}
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content aria-label={'Block format options'}>
                    <DropdownMenu.Item
                        label={'Paragraph'}
                        startIcon={'lucide:pilcrow'}
                        onClick={() => editor.chain().focus().setParagraph().run()}
                    />
                    <DropdownMenu.Item
                        label={'Heading 1'}
                        startIcon={'lucide:heading-1'}
                        onClick={() => toggleCurrentHeading(1)}
                    />
                    <DropdownMenu.Item
                        label={'Heading 2'}
                        startIcon={'lucide:heading-2'}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    />
                    <DropdownMenu.Item
                        label={'Heading 3'}
                        startIcon={'lucide:heading-3'}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    />
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                        label={'Block quote'}
                        startIcon={'lucide:quote'}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    />
                    <DropdownMenu.Item
                        label={'Code block'}
                        startIcon={'lucide:square-code'}
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    />
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                        label={'Insert horizontal rule'}
                        startIcon={'lucide:minus'}
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    />
                </DropdownMenu.Content>
            </DropdownMenu>
            <DropdownMenu
                modal={false}
                open={listsOpen}
                onOpenChange={setListsOpen}
            >
                <DropdownMenu.Trigger>
                    <IconButton
                        type={'button'}
                        icon={'lucide:list'}
                        aria-label={'Lists'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        active={listsOpen}
                        disabled={disabled}
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content aria-label={'List options'}>
                    <DropdownMenu.Item
                        label={'Bulleted list'}
                        startIcon={'lucide:list'}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    />
                    <DropdownMenu.Item
                        label={'Numbered list'}
                        startIcon={'lucide:list-ordered'}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    />
                </DropdownMenu.Content>
            </DropdownMenu>
        </div>
    )
}

export default BlockStyleToolbarGroup
