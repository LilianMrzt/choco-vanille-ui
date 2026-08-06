import { Button } from '@components/actions/button'
import { RICH_TEXT_FONT_SIZES } from '@components/forms/rich-text-editor/constants'
import { RICH_TEXT_FONT_SIZE_LABELS } from '@components/forms/rich-text-editor/constants/richTextFontSizes.const.ts'
import type { RichTextFontSize } from '@components/forms/rich-text-editor/types'
import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { useState } from 'react'
import type { TextSizeMenuProps } from '@components/forms/rich-text-editor/components/text-appearance-group/types/TextSizeMenu.props.ts'

const TextSizeMenu = ({ presentation = 'select' }: TextSizeMenuProps) => {
    const [open, setOpen] = useState(false)
    const { editor, disabled, labels } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    const selectedFontSize =
    editor.getAttributes('textStyle').fontSize ?? RICH_TEXT_FONT_SIZES.md
    const selectedFontSizeKey = (
    Object.keys(RICH_TEXT_FONT_SIZES) as RichTextFontSize[]
    ).find((fontSize) => RICH_TEXT_FONT_SIZES[fontSize] === selectedFontSize)

    const selectedFontSizeLabel = selectedFontSizeKey
        ? RICH_TEXT_FONT_SIZE_LABELS[selectedFontSizeKey]
        : RICH_TEXT_FONT_SIZE_LABELS.md

    return (
        <DropdownMenu
            modal={false}
            open={open}
            onOpenChange={setOpen}
        >
            <DropdownMenu.Trigger>
                {presentation === 'select' ? (
                    <Button
                        type={'button'}
                        label={selectedFontSizeLabel}
                        endIcon={'lucide:chevron-down'}
                        aria-label={labels.textSizeTrigger}
                        title={labels.textSizeTrigger}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        active={open}
                        disabled={disabled}
                    />
                ) : (
                    <IconButton
                        type={'button'}
                        icon={'lucide:text-cursor-input'}
                        aria-label={labels.textSizeTrigger}
                        title={labels.textSizeTrigger}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        active={open}
                        disabled={disabled}
                    />
                )}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                aria-label={labels.textSizeOptions}
                side={'bottom'}
                align={'start'}
                width={'6rem'}
            >
                {(Object.keys(RICH_TEXT_FONT_SIZES) as RichTextFontSize[]).map(
                    (fontSize) => (
                        <DropdownMenu.Item
                            key={fontSize}
                            label={RICH_TEXT_FONT_SIZE_LABELS[fontSize]}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setFontSize(RICH_TEXT_FONT_SIZES[fontSize])
                                    .run()
                            }
                        />
                    ),
                )}
            </DropdownMenu.Content>
        </DropdownMenu>
    )
}

TextSizeMenu.displayName = 'RichTextEditor.TextAppearanceGroup.TextSizeMenu'

export default TextSizeMenu
