import type { RICH_TEXT_FONT_SIZES } from '@components/forms/rich-text-editor/constants'

export type RichTextFontSize = keyof typeof RICH_TEXT_FONT_SIZES

export type RichTextMark =
    | { type: 'bold' | 'italic' | 'underline' | 'strike' | 'code' }
    | {
          type: 'textStyle'
          attrs: {
              color?: string | null
              fontSize?: string | null
          }
      }
    | {
          type: 'link'
          attrs: {
              href: string
              target?: string | null
              rel?: string | null
          }
      }

export type RichTextTextNode = {
    type: 'text'
    text: string
    marks?: RichTextMark[]
}

export type RichTextContainerNode = {
    type: 'paragraph' | 'heading' | 'bulletList' | 'orderedList' | 'listItem' | 'blockquote' | 'codeBlock'
    content?: RichTextNode[]
    attrs?: {
        level?: 1 | 2 | 3
        textAlign?: 'left' | 'center' | 'right' | 'justify' | null
        start?: number
        language?: string | null
    }
}

export type RichTextImageNode = {
    type: 'image'
    attrs: {
        src: string
        alt?: string | null
        title?: string | null
        width?: string | null
    }
}

export type RichTextHorizontalRuleNode = {
    type: 'horizontalRule'
}

export type RichTextHardBreakNode = {
    type: 'hardBreak'
}

export type RichTextNode =
    | RichTextTextNode
    | RichTextContainerNode
    | RichTextImageNode
    | RichTextHorizontalRuleNode
    | RichTextHardBreakNode

/** Versioned JSON document emitted by RichTextEditor. */
export type RichTextValue = {
    type: 'doc'
    content?: RichTextNode[]
}
