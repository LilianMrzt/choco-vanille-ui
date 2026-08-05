import { RICH_TEXT_COLORS, RICH_TEXT_FONT_SIZES } from '@components/forms/rich-text-editor/constants'
import { RICH_TEXT_COLOR_VALUES } from '@components/forms/rich-text-editor/constants/richTextColorValues.const.ts'
import type { RichTextColor } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'

const SAFE_PROTOCOL = /^(https?:|mailto:|tel:)/i

export const getRichTextColorValue = (color: RichTextColor): string =>
    RICH_TEXT_COLOR_VALUES[color]

export const normalizeRichTextColorValue = (value: unknown): string | undefined => {
    if (typeof value !== 'string') {
        return undefined
    }

    if (Object.values(RICH_TEXT_COLOR_VALUES).includes(value)) {
        return value
    }

    const color = (Object.values(RICH_TEXT_COLORS) as RichTextColor[]).find((item) => item === value)

    return color ? getRichTextColorValue(color) : undefined
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
