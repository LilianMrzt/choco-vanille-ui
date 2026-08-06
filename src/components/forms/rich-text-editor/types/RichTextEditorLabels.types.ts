/**
 * All user-facing strings surfaced by the RichTextEditor and its compound
 * slots. Pass a partial object to `RichTextEditor` `labels` to override only
 * the strings you need; English values are used for every key you omit.
 */
export type RichTextEditorLabels = {
    // Toolbar
    /** Default `aria-label` for the toolbar when no `aria-label` prop is provided. */
    toolbar: string
    /** `aria-label` for the combined font-size and block-format group. */
    fontSizeAndBlockFormatGroup: string
    /** `aria-label` for the combined alignment and lists group. */
    alignmentAndListsGroup: string
    /** `aria-label` for the combined links and images group. */
    linksAndImagesGroup: string

    // History
    /** `aria-label` for the history group. */
    historyGroup: string
    /** `aria-label` for the Undo button. */
    undo: string
    /** `aria-label` for the Redo button. */
    redo: string

    // Text style
    /** `aria-label` for the text style group. */
    textStyleGroup: string
    /** `aria-label` for the Bold toggle. */
    bold: string
    /** `aria-label` for the Italic toggle. */
    italic: string
    /** `aria-label` for the Underline toggle. */
    underline: string
    /** `aria-label` for the Strikethrough toggle. */
    strikethrough: string

    // Text appearance
    /** `aria-label` for the text appearance group. */
    textAppearanceGroup: string
    /** `aria-label` for the text size trigger button. */
    textSizeTrigger: string
    /** `aria-label` for the text size dropdown content. */
    textSizeOptions: string
    /** `aria-label` for the text color trigger button. */
    textColorTrigger: string
    /** `aria-label` for the text color popover content. */
    textColorPalette: string
    /** `aria-label` for a color palette group. Receives the palette name. */
    textColorGroup: (paletteName: string) => string
    /** `aria-label` for a color swatch button. Receives the palette name and 0-based color index. */
    textColorSwatch: (paletteName: string, colorIndex: number) => string

    // Link
    /** `aria-label` for the link group. */
    linkGroup: string
    /** `aria-label` for the Add / edit link button. */
    addOrEditLink: string
    /** `window.prompt` message asking for a link URL. */
    linkUrlPrompt: string
    /** `aria-label` for the Remove link button. */
    removeLink: string

    // Image
    /** `aria-label` for the image group. */
    imageGroup: string
    /** `aria-label` for the image actions dropdown trigger button (menu presentation). */
    imageGroupTrigger: string
    /** `aria-label` for the image options dropdown content. */
    imageOptions: string
    /** Shared `aria-label` and menu item label for Insert image URL. */
    insertImageUrl: string
    /** `window.prompt` message asking for an image URL. */
    imageUrlPrompt: string
    /** Shared `aria-label` and menu item label for Upload image. */
    uploadImage: string
    /** Shared `aria-label` and menu item label for Edit image details. */
    editImageDetails: string
    /** `window.prompt` message asking for image alternative text. */
    imageAltPrompt: string
    /** `window.prompt` message asking for image width. */
    imageWidthPrompt: string
    /** Shared `aria-label` and menu item label for Remove image. */
    removeImage: string

    // Block format
    /** `aria-label` for the block format group. */
    blockFormatGroup: string
    /** `aria-label` for the block format dropdown trigger button. */
    blockFormatTrigger: string
    /** `aria-label` for the block format dropdown content. */
    blockFormatOptions: string
    /** Shared `aria-label` and menu item label for Paragraph. */
    paragraph: string
    /** Shared `aria-label` and menu item label for Heading 1. */
    heading1: string
    /** Shared `aria-label` and menu item label for Heading 2. */
    heading2: string
    /** Shared `aria-label` and menu item label for Heading 3. */
    heading3: string
    /** Shared `aria-label` and menu item label for Block quote. */
    blockQuote: string
    /** Shared `aria-label` and menu item label for Code block. */
    codeBlock: string
    /** Shared `aria-label` and menu item label for Insert horizontal rule. */
    insertHorizontalRule: string

    // Lists
    /** `aria-label` for the lists group. */
    listsGroup: string
    /** `aria-label` for the lists dropdown trigger button. */
    listsTrigger: string
    /** `aria-label` for the list options dropdown content. */
    listOptions: string
    /** Shared `aria-label` and menu item label for Bulleted list. */
    bulletedList: string
    /** Shared `aria-label` and menu item label for Numbered list. */
    numberedList: string

    // Alignment
    /** `aria-label` for the alignment group. */
    alignmentGroup: string
    /** `aria-label` for the alignment dropdown trigger button. */
    alignmentTrigger: string
    /** `aria-label` for the alignment options dropdown content. */
    alignmentOptions: string
    /** Shared `aria-label` and menu item label for Align left. */
    alignLeft: string
    /** Shared `aria-label` and menu item label for Align center. */
    alignCenter: string
    /** Shared `aria-label` and menu item label for Align right. */
    alignRight: string
    /** Shared `aria-label` and menu item label for Justify. */
    justify: string
}
