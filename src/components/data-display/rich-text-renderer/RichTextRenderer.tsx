import type { FC } from 'react'

import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import { RICH_TEXT_RENDERER_STYLES } from '@components/data-display/rich-text-renderer/RichTextRenderer.css.ts'
import type { RichTextRendererProps } from '@components/data-display/rich-text-renderer/types'
import { renderRichTextNodes } from '@components/data-display/rich-text-renderer/utils/renderRichTextNodes.utils.tsx'

/**
 * Displays a structured RichTextEditor document as read-only semantic HTML.
 * Links and text styles use the editor's normalization rules. Supply image
 * alternatives in the document and a heading hierarchy appropriate to its context.
 * Native attributes, events, layout props and ref target the container, a div by default.
 * Consumer style overrides layout props and default container colors.
 *
 * @param props - Document and container customization.
 * @param props.value - Structured document whose supported nodes and marks are rendered as semantic HTML.
 * @param props.className - Consumer class merged with the document container class.
 * @param props.ref - Ref forwarded to the document container, a div by default.
 * @returns A container with the document's supported nodes and marks.
 * @example
 * <RichTextRenderer value={{ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] }] }} />
 */
const RichTextRenderer: FC<RichTextRendererProps> = ({
    value,
    className,
    ref,
    ...props
}) => (
    <Box
        ref={ref}
        className={cn(RICH_TEXT_RENDERER_STYLES, className)}
        {...props}
    >
        {renderRichTextNodes(value.content)}
    </Box>
)

RichTextRenderer.displayName = 'RichTextRenderer'

export default RichTextRenderer
