import type { Ref } from 'react'

import type { RichTextValue } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'
import type { BoxProps } from '@components/layout/box'

/** Read-only document and inherited layout attributes for its container. */
export type RichTextRendererProps = Readonly<Omit<BoxProps, 'children' | 'ref'> & {
    /** Structured document emitted by RichTextEditor; content is rendered as HTML nodes. */
    value: RichTextValue
    /** Ref forwarded to the container, which renders as a div by default. */
    ref?: Ref<HTMLDivElement>
}>
