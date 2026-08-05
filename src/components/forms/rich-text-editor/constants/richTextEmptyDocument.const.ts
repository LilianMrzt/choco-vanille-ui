import type { RichTextValue } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'

export const EMPTY_RICH_TEXT_DOCUMENT: RichTextValue = {
    type: 'doc',
    content: [{ type: 'paragraph' }],
}
