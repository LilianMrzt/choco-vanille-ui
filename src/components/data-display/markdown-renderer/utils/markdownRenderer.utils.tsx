import { type ElementType, type ReactNode } from 'react'
import type { Components } from 'react-markdown'

import { extractTextFromReactNode } from '@components/data-display/_shared/utils/extractText.utils.ts'
import { Typography } from '@components/foundation/typography'
import type { TypographyVariant } from '@components/foundation/typography/types/Typography.types.ts'
import { Link } from '@components/navigation/link'

const SAFE_PROTOCOL = /^(https?:|mailto:|tel:)/i
const HAS_PROTOCOL = /^[a-z][a-z\d+\-.]*:/i

export const sanitizeMarkdownUrl = (url: string): string => {
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

type TypographyRendererProps = {
    children?: ReactNode
    className?: string
    id?: string
}

const createTypographyRenderer = (variant: TypographyVariant, as?: ElementType) =>
    ({ children, className, id }: TypographyRendererProps) => (
        <Typography
            as={as}
            variant={variant}
            className={className}
            id={id}
        >
            {children}
        </Typography>
    )

export const MARKDOWN_COMPONENTS: Components = {
    h1: createTypographyRenderer('h1'),
    h2: createTypographyRenderer('h2'),
    h3: createTypographyRenderer('h3'),
    h4: createTypographyRenderer('h4'),
    h5: createTypographyRenderer('h5'),
    h6: createTypographyRenderer('h6'),
    p: createTypographyRenderer('p'),
    strong: createTypographyRenderer('strong', 'strong'),
    em: createTypographyRenderer('em', 'em'),
    del: createTypographyRenderer('del', 'del'),
    blockquote: createTypographyRenderer('blockquote'),
    pre: createTypographyRenderer('pre'),
    code: createTypographyRenderer('code', 'code'),
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
        const safeHref = href ? sanitizeMarkdownUrl(href) : ''
        const label = extractTextFromReactNode(children)

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
