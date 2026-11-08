import { LIST_ICON as ListIcon, LIST_ORDERED_ICON as ListOrderedIcon } from '@constants/icon-registry'
import { IconButton } from '@components/actions/icon-button'
import { Tooltip } from '@components/overlay/tooltip'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useState } from 'react'

import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { LISTS_GROUP_STYLES } from '@components/forms/rich-text-editor/components/lists-group/styles/ListsGroup.css.ts'
import type { ListsGroupProps } from '@components/forms/rich-text-editor/components/lists-group/types/ListsGroup.props.ts'

/**
 * Toolbar group for list commands: bulleted and numbered lists. Use
 * `presentation="inline"` for individual icon buttons or `"menu"` (default)
 * for a dropdown trigger.
 */
const ListsGroup = ({ presentation = 'menu' }: ListsGroupProps) => {
    const { editor, disabled, labels } = useRichTextEditorContext()
    const [listsOpen, setListsOpen] = useState(false)

    if (!editor) {
        return null
    }

    const isBulletList = editor.isActive('bulletList')
    const isOrderedList = editor.isActive('orderedList')

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
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={ListIcon}
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
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={ListOrderedIcon}
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
                        openOnFocus={false}
                        position={'top'}
                    >
                        <DropdownMenu.Trigger>
                            <IconButton
                                type={'button'}
                                icon={ListIcon}
                                aria-label={labels.listsTrigger}
                                variant={'ghost'}
                                color={'primary'}
                                size={'sm'}
                                active={listsOpen}
                                disabled={disabled}
                            />
                        </DropdownMenu.Trigger>
                    </Tooltip>
                    <DropdownMenu.Content aria-label={labels.listOptions}>
                        <DropdownMenu.Item
                            label={labels.bulletedList}
                            startIcon={ListIcon}
                            active={isBulletList}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                        />
                        <DropdownMenu.Item
                            label={labels.numberedList}
                            startIcon={ListOrderedIcon}
                            active={isOrderedList}
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
