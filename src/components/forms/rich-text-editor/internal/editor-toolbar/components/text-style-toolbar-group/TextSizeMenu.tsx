import { RICH_TEXT_FONT_SIZES } from '@components/forms/rich-text-editor/constants'
import type { RichTextFontSize } from '@components/forms/rich-text-editor/types'
import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'

const TextSizeMenu = ({ editor, disabled }: EditorToolbarProps) => {
    const selectedFontSize = editor.getAttributes('textStyle').fontSize ?? RICH_TEXT_FONT_SIZES.sm
    const selectedFontSizeKey = (Object.keys(RICH_TEXT_FONT_SIZES) as RichTextFontSize[]).find(
        (fontSize) => RICH_TEXT_FONT_SIZES[fontSize] === selectedFontSize,
    )

    return (
        <DropdownMenu
            modal={false}
        >
            <DropdownMenu.Trigger>
                <IconButton
                    type={'button'}
                    icon={'lucide:text-cursor-input'}
                    aria-label={'Text size'}
                    variant={'ghost'}
                    color={'primary'}
                    size={'sm'}
                    disabled={disabled}
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                aria-label={'Text size options'}
                side={'bottom'}
                align={'start'}
            >
                <DropdownMenu.RadioGroup value={selectedFontSizeKey ?? ''}>
                    {(Object.keys(RICH_TEXT_FONT_SIZES) as RichTextFontSize[]).map((fontSize) => (
                        <DropdownMenu.RadioItem
                            key={fontSize}
                            value={fontSize}
                            label={fontSize}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => editor.chain().focus().setFontSize(RICH_TEXT_FONT_SIZES[fontSize]).run()}
                        />
                    ))}
                </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
        </DropdownMenu>
    )
}

export default TextSizeMenu
