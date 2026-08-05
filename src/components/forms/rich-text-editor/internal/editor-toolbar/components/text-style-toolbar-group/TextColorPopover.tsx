import { IconButton } from '@components/actions/icon-button'
import { Popover } from '@components/overlay/popover'
import { RICH_TEXT_COLORS } from '@components/forms/rich-text-editor/constants'
import type { RichTextColor } from '@components/forms/rich-text-editor/types'
import { getRichTextColorValue } from '@components/forms/rich-text-editor/utils/richText.utils.ts'
import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const TextColorPopover = ({ editor, disabled }: EditorToolbarProps) => (
    <Popover>
        <Popover.Trigger>
            <IconButton
                type={'button'}
                icon={'lucide:palette'}
                aria-label={'Text color'}
                variant={'ghost'}
                color={'primary'}
                size={'sm'}
                disabled={disabled}
                onMouseDown={(event) => event.preventDefault()}
            />
        </Popover.Trigger>
        <Popover.Content
            aria-label={'Text color palette'}
            side={'bottom'}
            align={'start'}
        >
            <div className={EDITOR_TOOLBAR_STYLES.colorPicker}>
                {(Object.values(RICH_TEXT_COLORS) as RichTextColor[]).map((color) => {
                    const colorValue = getRichTextColorValue(color)

                    return (
                        <button
                            key={color}
                            type={'button'}
                            className={EDITOR_TOOLBAR_STYLES.colorSwatch}
                            style={{ backgroundColor: colorValue }}
                            aria-label={`${color} text color`}
                            aria-pressed={editor.getAttributes('textStyle').color === colorValue}
                            data-selected={editor.getAttributes('textStyle').color === colorValue || undefined}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => editor.chain().focus().setColor(colorValue).run()}
                        />
                    )
                })}
            </div>
        </Popover.Content>
    </Popover>
)

export default TextColorPopover
