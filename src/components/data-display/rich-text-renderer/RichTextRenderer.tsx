import { memo } from 'react'

import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import { RICH_TEXT_RENDERER_STYLES } from '@components/data-display/rich-text-renderer/styles/RichTextRenderer.css.ts'
import type { RichTextRendererProps } from '@components/data-display/rich-text-renderer/types'
import { renderRichTextNodes } from '@components/data-display/rich-text-renderer/utils/renderRichTextNodes.utils.tsx'

const RichTextRenderer = memo<RichTextRendererProps>(({
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
))

RichTextRenderer.displayName = 'RichTextRenderer'

export default RichTextRenderer
