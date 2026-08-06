import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useState } from 'react'

import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { ALIGNMENT_GROUP_STYLES } from '@components/forms/rich-text-editor/components/alignment-group/styles/AlignmentGroup.css.ts'
import type { AlignmentGroupProps } from '@components/forms/rich-text-editor/components/alignment-group/types/AlignmentGroup.props.ts'

const AlignmentGroup = ({ presentation = 'menu' }: AlignmentGroupProps) => {
    const { editor, disabled, labels } = useRichTextEditorContext()
    const [open, setOpen] = useState(false)

    if (!editor) {
        return null
    }

    return (
        <div
            className={ALIGNMENT_GROUP_STYLES.root}
            role={'group'}
            aria-label={labels.alignmentGroup}
        >
            {presentation === 'inline' ? (
                <>
                    <IconButton
                        type={'button'}
                        icon={'lucide:align-left'}
                        aria-label={labels.alignLeft}
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
                        aria-label={labels.alignCenter}
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
                        aria-label={labels.alignRight}
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
                        aria-label={labels.justify}
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
                            aria-label={labels.alignmentTrigger}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            active={open}
                            disabled={disabled}
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content aria-label={labels.alignmentOptions}>
                        <DropdownMenu.Item
                            label={labels.alignLeft}
                            startIcon={'lucide:align-left'}
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        />
                        <DropdownMenu.Item
                            label={labels.alignCenter}
                            startIcon={'lucide:align-center'}
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        />
                        <DropdownMenu.Item
                            label={labels.alignRight}
                            startIcon={'lucide:align-right'}
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        />
                        <DropdownMenu.Item
                            label={labels.justify}
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
