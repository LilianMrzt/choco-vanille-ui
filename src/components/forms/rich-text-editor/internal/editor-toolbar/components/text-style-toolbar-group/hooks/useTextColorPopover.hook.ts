import { RICH_TEXT_COLOR_PALETTES } from '@components/forms/rich-text-editor/constants/richTextColorPalettes.const.ts'
import type { Editor } from '@tiptap/react'
import { vars } from '@theme/contract.css.ts'
import { useCallback, useRef, useState, type KeyboardEvent } from 'react'

const COLORS_PER_PALETTE = 3

export const useTextColorPopover = (editor: Editor) => {
    const colorButtonRefs = useRef<Array<HTMLButtonElement | null>>([])
    const [open, setOpen] = useState(false)
    const selectedColor = editor.getAttributes('textStyle').color ?? vars.editorColors.neutral.dark

    const focusColor = useCallback((paletteIndex: number, colorIndex: number) => {
        const targetIndex = paletteIndex * COLORS_PER_PALETTE + colorIndex
        colorButtonRefs.current[targetIndex]?.focus()
    }, [])

    const handleColorKeyDown = useCallback((
        event: KeyboardEvent<HTMLButtonElement>,
        paletteIndex: number,
        colorIndex: number,
    ) => {
        let nextPaletteIndex = paletteIndex
        let nextColorIndex = colorIndex

        switch (event.key) {
            case 'ArrowRight':
                nextPaletteIndex = Math.min(paletteIndex + 1, RICH_TEXT_COLOR_PALETTES.length - 1)
                break
            case 'ArrowLeft':
                nextPaletteIndex = Math.max(paletteIndex - 1, 0)
                break
            case 'ArrowDown':
                nextColorIndex = Math.min(colorIndex + 1, COLORS_PER_PALETTE - 1)
                break
            case 'ArrowUp':
                nextColorIndex = Math.max(colorIndex - 1, 0)
                break
            case 'Home':
                nextPaletteIndex = 0
                break
            case 'End':
                nextPaletteIndex = RICH_TEXT_COLOR_PALETTES.length - 1
                break
            default:
                return
        }

        event.preventDefault()
        focusColor(nextPaletteIndex, nextColorIndex)
    }, [focusColor])

    const handleColorSelect = useCallback((color: string) => {
        editor.chain().setColor(color).run()
        setOpen(false)
    }, [editor])

    return {
        colorButtonRefs,
        handleColorKeyDown,
        handleColorSelect,
        open,
        selectedColor,
        setOpen,
    }
}
