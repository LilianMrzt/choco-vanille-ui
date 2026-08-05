import rehypeSanitize from 'rehype-sanitize'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { memo } from 'react'

import { cn } from '@utils/cn.ts'
import { MARKDOWN_RENDERER_STYLES } from '@components/data-display/markdown-renderer/styles/MarkdownRenderer.css.ts'
import { MARKDOWN_ALLOWED_ELEMENTS } from '@components/data-display/markdown-renderer/constants/markdownAllowedElements.const.ts'
import { MARKDOWN_COMPONENTS, sanitizeMarkdownUrl } from '@components/data-display/markdown-renderer/utils/markdownRenderer.utils.tsx'
import type { MarkdownRendererProps } from '@components/data-display/markdown-renderer/types'

const MarkdownRenderer = memo<MarkdownRendererProps>(({
    markdown,
    className,
    ref,
    ...props
}) => (
    <div
        ref={ref}
        className={cn(MARKDOWN_RENDERER_STYLES, className)}
        {...props}
    >
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            allowedElements={MARKDOWN_ALLOWED_ELEMENTS.slice()}
            skipHtml
            unwrapDisallowed
            urlTransform={sanitizeMarkdownUrl}
            components={MARKDOWN_COMPONENTS}
        >
            {markdown}
        </ReactMarkdown>
    </div>
))

MarkdownRenderer.displayName = 'MarkdownRenderer'

export default MarkdownRenderer
