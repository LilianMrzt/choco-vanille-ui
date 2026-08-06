import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useState } from 'react'

import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'
import type { ListsGroupProps } from '@components/forms/rich-text-editor/components/lists-group/types/ListsGroup.props.ts'

const ListsGroup = ({ presentation = 'menu' }: ListsGroupProps) => {
    const { editor, disabled } = useRichTextEditorContext()
    const [listsOpen, setListsOpen] = useState(false)

    if (!editor) {
        return null
    }

    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.group}
            role={'group'}
            aria-label={'Lists'}
        >
            {presentation === 'inline' ? (
                <>
                    <IconButton
                        type={'button'}
                        icon={'lucide:list'}
                        aria-label={'Bulleted list'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:list-ordered'}
                        aria-label={'Numbered list'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    />
                </>
            ) : (
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
            )}
        </div>
    )
}

ListsGroup.displayName = 'RichTextEditor.ListsGroup'

export default ListsGroup
