import { RICH_TEXT_FONT_SIZES } from '@components/forms/rich-text-editor/constants'
import type { RichTextFontSize } from '@components/forms/rich-text-editor/types'
import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { useState } from 'react'

const TextSizeMenu = () => {
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

    return (
        <DropdownMenu
            modal={false}
            open={open}
            onOpenChange={setOpen}
        >
            <DropdownMenu.Trigger>
                <IconButton
                    type={'button'}
                    icon={'lucide:text-cursor-input'}
                    aria-label={labels.textSizeTrigger}
                    variant={'ghost'}
                    color={'primary'}
                    size={'sm'}
                    active={open}
                    disabled={disabled}
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                aria-label={labels.textSizeOptions}
                side={'bottom'}
                align={'start'}
            >
                <DropdownMenu.RadioGroup value={selectedFontSizeKey ?? ''}>
                    {(Object.keys(RICH_TEXT_FONT_SIZES) as RichTextFontSize[]).map(
                        (fontSize) => (
                            <DropdownMenu.RadioItem
                                key={fontSize}
                                value={fontSize}
                                label={fontSize}
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
                </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
        </DropdownMenu>
    )
}

TextSizeMenu.displayName = 'RichTextEditor.TextAppearanceGroup.TextSizeMenu'

export default TextSizeMenu
