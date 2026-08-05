import rehypeSanitize from 'rehype-sanitize'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { isValidElement, memo, type ReactNode } from 'react'

import { Typography } from '@components/foundation/typography'
import { Link } from '@components/navigation/link'
import { cn } from '@utils/cn.ts'
import { MARKDOWN_RENDERER_STYLES } from '@components/data-display/markdown-renderer/styles/MarkdownRenderer.css.ts'
import type { MarkdownRendererProps } from '@components/data-display/markdown-renderer/types'

const ALLOWED_ELEMENTS = [
    'a',
    'blockquote',
    'br',
    'code',
    'del',
    'em',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'li',
    'ol',
    'p',
    'pre',
    'strong',
    'table',
    'tbody',
    'td',
    'th',
    'thead',
    'tr',
    'ul',
] as const

const SAFE_PROTOCOL = /^(https?:|mailto:|tel:)/i
const HAS_PROTOCOL = /^[a-z][a-z\d+\-.]*:/i

const sanitizeUrl = (url: string): string => {
    const value = url.trim()

    if (
        value.startsWith('#') ||
        value.startsWith('/') ||
        !HAS_PROTOCOL.test(value)
    ) {
        return value
    }

    return SAFE_PROTOCOL.test(value) ? value : ''
}

const extractText = (value: ReactNode): string => {
    if (typeof value === 'string' || typeof value === 'number') {
        return String(value)
    }

    if (Array.isArray(value)) {
        return value.map(extractText).join('')
    }

    if (isValidElement<{ children?: ReactNode }>(value)) {
        return extractText(value.props.children)
    }

    return ''
}

const components: Components = {
    h1: ({ children, className, id }) => (
        <Typography
            variant={'h1'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    h2: ({ children, className, id }) => (
        <Typography
            variant={'h2'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    h3: ({ children, className, id }) => (
        <Typography
            variant={'h3'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    h4: ({ children, className, id }) => (
        <Typography
            variant={'h4'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    h5: ({ children, className, id }) => (
        <Typography
            variant={'h5'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    h6: ({ children, className, id }) => (
        <Typography
            variant={'h6'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    p: ({ children, className, id }) => (
        <Typography
            variant={'p'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    strong: ({ children, className, id }) => (
        <Typography
            as={'strong'}
            variant={'strong'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    em: ({ children, className, id }) => (
        <Typography
            as={'em'}
            variant={'em'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    del: ({ children, className, id }) => (
        <Typography
            as={'del'}
            variant={'del'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    blockquote: ({ children, className, id }) => (
        <Typography
            variant={'blockquote'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    pre: ({ children, className, id }) => (
        <Typography
            variant={'pre'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    code: ({ children, className, id }) => (
        <Typography
            as={'code'}
            variant={'code'}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    ),
    a: ({
        children,
        className,
        href,
        id,
        rel,
        target,
        title,
        'aria-label': ariaLabel,
    }) => {
        const safeHref = href ? sanitizeUrl(href) : ''
        const label = extractText(children)

        if (!safeHref || !label) {
            return (
                <span
                    className={className}
                    id={id}
                >
                    {children}
                </span>
            )
        }

        return (
            <Link
                href={safeHref}
                label={label}
                className={className}
                id={id}
                rel={rel}
                target={target}
                title={title}
                aria-label={ariaLabel}
            />
        )
    },
}

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
            allowedElements={ALLOWED_ELEMENTS.slice()}
            skipHtml
            unwrapDisallowed
            urlTransform={sanitizeUrl}
            components={components}
        >
            {markdown}
        </ReactMarkdown>
    </div>
))

MarkdownRenderer.displayName = 'MarkdownRenderer'

export default MarkdownRenderer
