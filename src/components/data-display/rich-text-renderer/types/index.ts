import type { ElementType, ReactElement } from 'react'

import type { RichTextValue } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'
import type { BoxProps } from '@components/layout/box'

/** Read-only document and inherited layout attributes for its container. */
export type RichTextRendererProps<Element extends ElementType = 'div'> =
    Readonly<
        Omit<BoxProps<Element>, 'children'> & {
            /** Structured document emitted by RichTextEditor; content is rendered as HTML nodes. */
            value: RichTextValue
        }
    >

/** Polymorphic RichTextRenderer with a div default. */
export type RichTextRendererComponent = {
    <Element extends ElementType>(
        props: RichTextRendererProps<Element> & Readonly<{ as: Element }>,
    ): ReactElement
    (props: RichTextRendererProps): ReactElement
}
