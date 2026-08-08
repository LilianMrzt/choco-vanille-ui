import { IconButton } from '@components/actions/icon-button'
import { Tooltip } from '@components/overlay/tooltip'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useState } from 'react'

import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { ALIGNMENT_GROUP_STYLES } from '@components/forms/rich-text-editor/components/alignment-group/styles/AlignmentGroup.css.ts'
import type { AlignmentGroupProps } from '@components/forms/rich-text-editor/components/alignment-group/types/AlignmentGroup.props.ts'

/**
 * Toolbar group for text alignment commands: left, center, right, and
 * justify. Use `presentation="inline"` for individual icon buttons or
 * `"menu"` (default) for a dropdown trigger.
 */
const AlignmentGroup = ({ presentation = 'menu' }: AlignmentGroupProps) => {
    const { editor, disabled, labels } = useRichTextEditorContext()
    const [open, setOpen] = useState(false)

    if (!editor) {
        return null
    }

    const currentAlignment =
        editor.getAttributes('paragraph').textAlign
        ?? editor.getAttributes('heading').textAlign
        ?? 'left'

    return (
        <div
            className={ALIGNMENT_GROUP_STYLES.root}
            role={'group'}
            aria-label={labels.alignmentGroup}
        >
            {presentation === 'inline' ? (
                <>
                    <Tooltip
                        content={labels.alignLeft}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
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
                    </Tooltip>
                    <Tooltip
                        content={labels.alignCenter}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={'lucide:align-center'}
                            aria-label={labels.alignCenter}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() =>
                                editor.chain().focus().setTextAlign('center').run()
                            }
                        />
                    </Tooltip>
                    <Tooltip
                        content={labels.alignRight}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
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
                    </Tooltip>
                    <Tooltip
                        content={labels.justify}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={'lucide:align-justify'}
                            aria-label={labels.justify}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() =>
                                editor.chain().focus().setTextAlign('justify').run()
                            }
                        />
                    </Tooltip>
                </>
            ) : (
                <DropdownMenu
                    modal={false}
                    open={open}
                    onOpenChange={setOpen}
                >
                    <Tooltip
                        content={labels.alignmentTrigger}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
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
                    </Tooltip>
                    <DropdownMenu.Content aria-label={labels.alignmentOptions}>
                        <DropdownMenu.Item
                            label={labels.alignLeft}
                            startIcon={'lucide:align-left'}
                            active={currentAlignment === 'left'}
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        />
                        <DropdownMenu.Item
                            label={labels.alignCenter}
                            startIcon={'lucide:align-center'}
                            active={currentAlignment === 'center'}
                            onClick={() =>
                                editor.chain().focus().setTextAlign('center').run()
                            }
                        />
                        <DropdownMenu.Item
                            label={labels.alignRight}
                            startIcon={'lucide:align-right'}
                            active={currentAlignment === 'right'}
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        />
                        <DropdownMenu.Item
                            label={labels.justify}
                            startIcon={'lucide:align-justify'}
                            active={currentAlignment === 'justify'}
                            onClick={() =>
                                editor.chain().focus().setTextAlign('justify').run()
                            }
                        />
                    </DropdownMenu.Content>
                </DropdownMenu>
            )}
        </div>
    )
}

AlignmentGroup.displayName = 'RichTextEditor.AlignmentGroup'

export default AlignmentGroup
