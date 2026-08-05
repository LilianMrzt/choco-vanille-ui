import { RICH_TEXT_COLORS } from '@components/forms/rich-text-editor/constants'
import { vars } from '@theme/contract.css.ts'
import type { RichTextColor } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'

const SAFE_PROTOCOL = /^(https?:|mailto:|tel:)/i

const RICH_TEXT_COLOR_VALUES: Record<RichTextColor, string> = {
    [RICH_TEXT_COLORS.primary]: vars.color.primary,
    [RICH_TEXT_COLORS.secondary]: vars.color.secondary,
    [RICH_TEXT_COLORS.success]: vars.color.success,
    [RICH_TEXT_COLORS.warning]: vars.color.warning,
    [RICH_TEXT_COLORS.info]: vars.color.info,
    [RICH_TEXT_COLORS.destructive]: vars.color.destructive,
    [RICH_TEXT_COLORS.purple]: vars.color.purple,
    [RICH_TEXT_COLORS.pink]: vars.color.pink,
    [RICH_TEXT_COLORS.orange]: vars.color.orange,
    [RICH_TEXT_COLORS.teal]: vars.color.teal,
    [RICH_TEXT_COLORS.cyan]: vars.color.cyan,
    [RICH_TEXT_COLORS.indigo]: vars.color.indigo,
}

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
