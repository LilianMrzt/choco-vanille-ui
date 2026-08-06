import { IconButton } from '@components/actions/icon-button'
import { Tooltip } from '@components/overlay/tooltip'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useState } from 'react'

import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { LISTS_GROUP_STYLES } from '@components/forms/rich-text-editor/components/lists-group/styles/ListsGroup.css.ts'
import type { ListsGroupProps } from '@components/forms/rich-text-editor/components/lists-group/types/ListsGroup.props.ts'

const ListsGroup = ({ presentation = 'menu' }: ListsGroupProps) => {
    const { editor, disabled, labels } = useRichTextEditorContext()
    const [listsOpen, setListsOpen] = useState(false)

    if (!editor) {
        return null
    }

    return (
        <div
            className={LISTS_GROUP_STYLES.root}
            role={'group'}
            aria-label={labels.listsGroup}
        >
            {presentation === 'inline' ? (
                <>
                    <Tooltip
                        content={labels.bulletedList}
                        delayDuration={700}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={'lucide:list'}
                            aria-label={labels.bulletedList}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                        />
                    </Tooltip>
                    <Tooltip
                        content={labels.numberedList}
                        delayDuration={700}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={'lucide:list-ordered'}
                            aria-label={labels.numberedList}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        />
                    </Tooltip>
                </>
            ) : (
                <DropdownMenu
                    modal={false}
                    open={listsOpen}
                    onOpenChange={setListsOpen}
                >
                    <Tooltip
                        content={labels.listsTrigger}
                        delayDuration={700}
                        position={'top'}
                    >
                        <DropdownMenu.Trigger>
                            <IconButton
                                type={'button'}
                                icon={'lucide:list'}
                                aria-label={labels.listsTrigger}
                                variant={'ghost'}
                                color={'primary'}
                                size={'sm'}
                                active={listsOpen}
                                disabled={disabled}
                                title={labels.listsTrigger}
                            />
                        </DropdownMenu.Trigger>
                    </Tooltip>
                    <DropdownMenu.Content aria-label={labels.listOptions}>
                        <DropdownMenu.Item
                            label={labels.bulletedList}
                            startIcon={'lucide:list'}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                        />
                        <DropdownMenu.Item
                            label={labels.numberedList}
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
