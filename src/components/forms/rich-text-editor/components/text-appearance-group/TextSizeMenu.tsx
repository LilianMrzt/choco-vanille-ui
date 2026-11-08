import { CHEVRON_DOWN_ICON as ChevronDownIcon, TEXT_CURSOR_INPUT_ICON as TextCursorInputIcon } from '@constants/icon-registry'
import { Button } from '@components/actions/button'
import { RICH_TEXT_FONT_SIZES } from '@components/forms/rich-text-editor/constants'
import { RICH_TEXT_FONT_SIZE_LABELS } from '@components/forms/rich-text-editor/constants/richTextFontSizes.const.ts'
import type { RichTextFontSize } from '@components/forms/rich-text-editor/types'
import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { useState } from 'react'
import type { TextSizeMenuProps } from '@components/forms/rich-text-editor/components/text-appearance-group/types/TextSizeMenu.props.ts'
import { TEXT_SIZE_MENU_STYLES } from '@components/forms/rich-text-editor/components/text-appearance-group/styles/TextSizeMenu.css.ts'

const FONT_SIZE_KEYS = Object.keys(RICH_TEXT_FONT_SIZES).map(Number) as RichTextFontSize[]

/**
 * Font-size picker toolbar control for `TextAppearanceGroup`. Renders a
 * `DropdownMenu` showing available rich-text font sizes. Use
 * `presentation="select"` (default) for a labeled button trigger or
 * `"icon"` for an icon-only trigger.
 */
const TextSizeMenu = ({ presentation = 'select' }: TextSizeMenuProps) => {
    const [open, setOpen] = useState(false)
    const { editor, disabled, labels } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    const selectedFontSize =
    editor.getAttributes('textStyle').fontSize ?? RICH_TEXT_FONT_SIZES[16]
    const selectedFontSizeKey = FONT_SIZE_KEYS.find(
        (fontSize) => RICH_TEXT_FONT_SIZES[fontSize] === selectedFontSize,
    )

    const selectedFontSizeLabel = selectedFontSizeKey
        ? RICH_TEXT_FONT_SIZE_LABELS[selectedFontSizeKey]
        : RICH_TEXT_FONT_SIZE_LABELS[16]

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
                        endIcon={ChevronDownIcon}
                        aria-label={labels.textSizeTrigger}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        className={TEXT_SIZE_MENU_STYLES.trigger}
                        active={open}
                        disabled={disabled}
                    />
                ) : (
                    <IconButton
                        type={'button'}
                        icon={TextCursorInputIcon}
                        aria-label={labels.textSizeTrigger}
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
                {FONT_SIZE_KEYS.map(
                    (fontSize) => (
                        <DropdownMenu.Item
                            key={fontSize}
                            label={RICH_TEXT_FONT_SIZE_LABELS[fontSize]}
                            active={fontSize === selectedFontSizeKey}
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
