import { RICH_TEXT_FONT_SIZES } from '@components/forms/rich-text-editor/constants'
import { RICH_TEXT_COLOR_PALETTES } from '@components/forms/rich-text-editor/constants/richTextColorPalettes.const.ts'

const SAFE_PROTOCOL = /^(https?:|mailto:|tel:)/i

export const normalizeRichTextColorValue = (value: unknown): string | undefined => {
    if (typeof value !== 'string') {
        return undefined
    }

    const paletteValues = RICH_TEXT_COLOR_PALETTES.flatMap((palette) => palette.colors)

    if (paletteValues.some((paletteValue) => paletteValue === value)) {
        return value
    }

    return undefined
}

export const normalizeRichTextFontSizeValue = (value: unknown): string | undefined =>
    typeof value === 'string' && Object.values(RICH_TEXT_FONT_SIZES).some((fontSize) => fontSize === value)
        ? value
        : undefined

export const normalizeRichTextUrl = (url: string): string | undefined => {
    const value = url.trim()

    if (!value || value.startsWith('//')) {
        return undefined
    }

    if (value.startsWith('#') || value.startsWith('./') || value.startsWith('../')) {
        return value
    }

    if (value.startsWith('/')) {
        return value
    }

    return SAFE_PROTOCOL.test(value) ? value : undefined
}
