import { IconButton } from '@components/actions/icon-button'
import { Icon } from '@components/foundation/icon'
import { Popover } from '@components/overlay/popover'
import { RICH_TEXT_COLOR_PALETTES } from '@components/forms/rich-text-editor/constants/richTextColorPalettes.const.ts'
import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'
import { useTextColorPopover } from '@components/forms/rich-text-editor/internal/editor-toolbar/components/text-style-toolbar-group/hooks/useTextColorPopover.hook.ts'

const TextColorPopover = ({ editor, disabled }: EditorToolbarProps) => {
    const {
        colorButtonRefs,
        handleColorKeyDown,
        handleColorSelect,
        open,
        selectedColor,
        setOpen,
    } = useTextColorPopover(editor)

    return (
        <Popover
            open={open}
            onOpenChange={(nextOpen) => setOpen(nextOpen)}
        >
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
                    <div className={EDITOR_TOOLBAR_STYLES.paletteGrid}>
                        {RICH_TEXT_COLOR_PALETTES.map((palette, paletteIndex) => (
                            <div
                                key={palette.name}
                                className={EDITOR_TOOLBAR_STYLES.paletteColumn}
                                role={'group'}
                                aria-label={`${palette.name} text colors`}
                            >
                                {palette.colors.map((color, colorIndex) => {
                                    const isSelected = selectedColor === color

                                    return (
                                        <button
                                            key={color}
                                            ref={(element) => {
                                                colorButtonRefs.current[paletteIndex * 3 + colorIndex] = element
                                            }}
                                            type={'button'}
                                            className={EDITOR_TOOLBAR_STYLES.colorSwatch}
                                            style={{ backgroundColor: color }}
                                            aria-label={`${palette.name} ${colorIndex + 1} text color`}
                                            aria-pressed={isSelected}
                                            data-selected={isSelected || undefined}
                                            tabIndex={paletteIndex === 0 && colorIndex === 0 ? 0 : -1}
                                            onKeyDown={(event) => handleColorKeyDown(event, paletteIndex, colorIndex)}
                                            onMouseDown={(event) => event.preventDefault()}
                                            onClick={() => handleColorSelect(color)}
                                        >
                                            {isSelected && (
                                                <span
                                                    className={EDITOR_TOOLBAR_STYLES.colorCheck}
                                                    aria-hidden={'true'}
                                                >
                                                    <Icon
                                                        icon={'lucide:check'}
                                                        size={'sm'}
                                                    />
                                                </span>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </Popover.Content>
        </Popover>
    )
}

export default TextColorPopover
