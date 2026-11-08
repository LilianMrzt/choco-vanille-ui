import { createElement, type ElementType, type ReactElement } from 'react'

import { resolveBoxProps } from '@components/layout/box/utils/resolveBoxProps.utils'
import { cn } from '@utils/cn.ts'
import { RICH_TEXT_RENDERER_STYLES } from '@components/data-display/rich-text-renderer/RichTextRenderer.css.ts'
import type {
    RichTextRendererComponent,
    RichTextRendererProps,
} from '@components/data-display/rich-text-renderer/types'
import { renderRichTextNodes } from '@components/data-display/rich-text-renderer/utils/renderRichTextNodes.utils.tsx'

/**
 * Displays a structured RichTextEditor document as read-only semantic HTML.
 * Links and text styles use the editor's normalization rules. Supply image
 * alternatives in the document and a heading hierarchy appropriate to its context.
 * Native attributes, events, layout props and ref target the container, a div by default.
 * Consumer style overrides layout props and default container colors.
 *
 * @template Element - Native element or custom component selected by as.
 * @param props - Document and container customization.
 * @param props.value - Structured document whose supported nodes and marks are rendered as semantic HTML.
 * @param props.className - Consumer class merged with the document container class.
 * @param props.ref - Ref forwarded to the document container, a div by default.
 * @returns A container with the document's supported nodes and marks.
 * @example
 * <RichTextRenderer value={{ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] }] }} />
 */
const RichTextRenderer: RichTextRendererComponent = <
    Element extends ElementType = 'div',
>({
        value,
        className,
        ref,
        ...props
    }: RichTextRendererProps<Element> & Readonly<{ as?: Element }>): ReactElement =>
        createElement(
            props.as ?? 'div',
            resolveBoxProps({
                ref,
                className: cn(RICH_TEXT_RENDERER_STYLES, className),
                ...props,
                children: <>{renderRichTextNodes(value.content)}</>,
            }),
        )

export default RichTextRenderer
