export type RichTextMark = {
    type: 'bold' | 'italic' | 'underline'
}

export type RichTextTextNode = {
    type: 'text'
    text: string
    marks?: RichTextMark[]
}

export type RichTextContainerNode = {
    type: 'paragraph' | 'heading' | 'bulletList' | 'orderedList' | 'listItem'
    content?: RichTextNode[]
    attrs?: {
        level?: 1 | 2 | 3
    }
}

export type RichTextNode = RichTextTextNode | RichTextContainerNode

/** Versioned JSON document emitted by RichTextEditor. */
export type RichTextValue = {
    type: 'doc'
    content?: RichTextNode[]
}
