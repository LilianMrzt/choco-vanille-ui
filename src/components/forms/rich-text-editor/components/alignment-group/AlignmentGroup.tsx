import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useState } from 'react'

import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'
import type { AlignmentGroupProps } from '@components/forms/rich-text-editor/components/alignment-group/types/AlignmentGroup.props.ts'

const AlignmentGroup = ({ presentation = 'menu' }: AlignmentGroupProps) => {
    const { editor, disabled } = useRichTextEditorContext()
    const [open, setOpen] = useState(false)

    if (!editor) {
        return null
    }

    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.group}
            role={'group'}
            aria-label={'Text alignment'}
        >
            {presentation === 'inline' ? (
                <>
                    <IconButton
                        type={'button'}
                        icon={'lucide:align-left'}
                        aria-label={'Align left'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:align-center'}
                        aria-label={'Align center'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:align-right'}
                        aria-label={'Align right'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:align-justify'}
                        aria-label={'Justify'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    />
                </>
            ) : (
                <DropdownMenu
                    modal={false}
                    open={open}
                    onOpenChange={setOpen}
                >
                    <DropdownMenu.Trigger>
                        <IconButton
                            type={'button'}
                            icon={'lucide:align-left'}
                            aria-label={'Text alignment'}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            active={open}
                            disabled={disabled}
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content aria-label={'Text alignment options'}>
                        <DropdownMenu.Item
                            label={'Align left'}
                            startIcon={'lucide:align-left'}
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        />
                        <DropdownMenu.Item
                            label={'Align center'}
                            startIcon={'lucide:align-center'}
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        />
                        <DropdownMenu.Item
                            label={'Align right'}
                            startIcon={'lucide:align-right'}
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        />
                        <DropdownMenu.Item
                            label={'Justify'}
                            startIcon={'lucide:align-justify'}
                            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        />
                    </DropdownMenu.Content>
                </DropdownMenu>
            )}
        </div>
    )
}

AlignmentGroup.displayName = 'RichTextEditor.AlignmentGroup'

export default AlignmentGroup
