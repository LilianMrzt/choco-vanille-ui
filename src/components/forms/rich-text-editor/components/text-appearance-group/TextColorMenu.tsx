import { IconButton } from '@components/actions/icon-button'
import { Tooltip } from '@components/overlay/tooltip'
import { Icon } from '@components/foundation/icon'
import { Popover } from '@components/overlay/popover'
import { RICH_TEXT_COLOR_PALETTES } from '@components/forms/rich-text-editor/constants/richTextColorPalettes.const.ts'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
import { TEXT_COLOR_MENU_STYLES } from '@components/forms/rich-text-editor/components/text-appearance-group/styles/TextColorMenu.css.ts'
import { vars } from '@theme/contract.css.ts'
import { useCallback, useRef, useState, type KeyboardEvent } from 'react'

/**
 * Color picker toolbar control for `TextAppearanceGroup`. Opens a
 * `Popover` with a palette grid. Uses keyboard arrow navigation within
 * the color swatches and applies the selected color as a TipTap
 * `textStyle` mark.
 */
const TextColorMenu = () => {
    const colorButtonRefs = useRef<Array<HTMLButtonElement | null>>([])
    const [open, setOpen] = useState(false)
    const { editor, disabled, labels } = useRichTextEditorContext()
    const focusColor = useCallback((paletteIndex: number, colorIndex: number) => {
        colorButtonRefs.current[paletteIndex * 3 + colorIndex]?.focus()
    }, [])
    const handleColorKeyDown = useCallback(
        (
            event: KeyboardEvent<HTMLButtonElement>,
            paletteIndex: number,
            colorIndex: number,
        ) => {
            let nextPaletteIndex = paletteIndex
            let nextColorIndex = colorIndex
            if (event.key === 'ArrowRight') {
                nextPaletteIndex = Math.min(
                    paletteIndex + 1,
                    RICH_TEXT_COLOR_PALETTES.length - 1,
                )
            } else if (event.key === 'ArrowLeft') {
                nextPaletteIndex = Math.max(paletteIndex - 1, 0)
            } else if (event.key === 'ArrowDown') {
                nextColorIndex = Math.min(colorIndex + 1, 2)
            } else if (event.key === 'ArrowUp') {
                nextColorIndex = Math.max(colorIndex - 1, 0)
            } else if (event.key === 'Home') {
                nextPaletteIndex = 0
            } else if (event.key === 'End') {
                nextPaletteIndex = RICH_TEXT_COLOR_PALETTES.length - 1
            } else {
                return
            }
            event.preventDefault()
            focusColor(nextPaletteIndex, nextColorIndex)
        },
        [focusColor],
    )

    if (!editor) {
        return null
    }

    const selectedColor =
    editor.getAttributes('textStyle').color ?? vars.editorColors.neutral.dark
    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <Tooltip
                content={labels.textColorTrigger}
                delayDuration={700}
                openOnFocus={false}
                position={'top'}
            >
                <Popover.Trigger>
                    <IconButton
                        type={'button'}
                        aria-label={labels.textColorTrigger}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        active={open}
                        disabled={disabled}
                        onMouseDown={(event) => event.preventDefault()}
                    >
                        <span
                            className={TEXT_COLOR_MENU_STYLES.selectedColor}
                            style={{ backgroundColor: selectedColor }}
                        />
                    </IconButton>
                </Popover.Trigger>
            </Tooltip>
            <Popover.Content
                aria-label={labels.textColorPalette}
                side={'bottom'}
                align={'start'}
            >
                <div className={TEXT_COLOR_MENU_STYLES.colorPicker}>
                    <div className={TEXT_COLOR_MENU_STYLES.paletteGrid}>
                        {RICH_TEXT_COLOR_PALETTES.map((palette, paletteIndex) => (
                            <div
                                key={palette.name}
                                className={TEXT_COLOR_MENU_STYLES.paletteColumn}
                                role={'group'}
                                aria-label={labels.textColorGroup(palette.name)}
                            >
                                {palette.colors.map((color, colorIndex) => {
                                    const isSelected = selectedColor === color
                                    return (
                                        <button
                                            key={color}
                                            ref={(element) => {
                                                colorButtonRefs.current[paletteIndex * 3 + colorIndex] =
                          element
                                            }}
                                            type={'button'}
                                            className={TEXT_COLOR_MENU_STYLES.colorSwatch}
                                            style={{ backgroundColor: color }}
                                            aria-label={labels.textColorSwatch(palette.name, colorIndex)}
                                            aria-pressed={isSelected}
                                            data-selected={isSelected || undefined}
                                            tabIndex={paletteIndex === 0 && colorIndex === 0 ? 0 : -1}
                                            onKeyDown={(event) =>
                                                handleColorKeyDown(event, paletteIndex, colorIndex)
                                            }
                                            onMouseDown={(event) => event.preventDefault()}
                                            onClick={() => {
                                                editor.chain().focus().setColor(color).run()
                                                setOpen(false)
                                            }}
                                        >
                                            {isSelected && (
                                                <span className={TEXT_COLOR_MENU_STYLES.colorCheck}>
                                                    <Icon
                                                        icon={CheckIcon}
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

TextColorMenu.displayName = 'RichTextEditor.TextAppearanceGroup.TextColorMenu'

export default TextColorMenu
