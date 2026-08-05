import { RICH_TEXT_COLORS } from '@components/forms/rich-text-editor/constants/richTextColors.const.ts'
import type { RichTextColor } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'
import { vars } from '@theme/contract.css.ts'

export const RICH_TEXT_COLOR_VALUES: Record<RichTextColor, string> = {
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
