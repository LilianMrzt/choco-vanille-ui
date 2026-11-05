import { type ReactNode } from 'react'

import { extractTextFromReactNode } from '@components/data-display/rich-text-renderer/utils/extractText.utils.ts'
import { Typography } from '@components/foundation/typography'
import { Link } from '@components/navigation/link'
import type {
    RichTextMark,
    RichTextNode,
    RichTextTextNode,
} from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'
import {
    normalizeRichTextColorValue,
    normalizeRichTextFontSizeValue,
    normalizeRichTextUrl,
} from '@components/forms/rich-text-editor/utils/richText.utils.ts'

/**
 * Applies supported inline marks while retaining text for rejected link/style values.
 *
 * @param content - Inline content to wrap.
 * @param marks - Ordered marks; defaults to no formatting.
 * @returns Formatted inline content.
 * @example
 * renderMarks('Important', [{ type: 'bold' }])
 */
const renderMarks = (content: ReactNode, marks: RichTextMark[] = []): ReactNode =>
    marks.reduceRight<ReactNode>((children, mark) => {
        switch (mark.type) {
            case 'bold':
                return (
                    <Typography
                        as={'strong'}
                        variant={'strong'}
                    >
                        {children}
                    </Typography>
                )
            case 'italic':
                return (
                    <Typography
                        as={'em'}
                        variant={'em'}
                    >
                        {children}
                    </Typography>
                )
            case 'underline':
                return <u>{children}</u>
            case 'strike':
                return <s>{children}</s>
            case 'code':
                return <code>{children}</code>
            case 'textStyle': {
                const color = normalizeRichTextColorValue(mark.attrs.color)
                const fontSize = normalizeRichTextFontSizeValue(mark.attrs.fontSize)

                return color || fontSize
                    ? <span style={{ color, fontSize }}>{children}</span>
                    : children
            }
            case 'link': {
                const href = normalizeRichTextUrl(mark.attrs.href)
                const label = extractTextFromReactNode(children)

                return href && label ? (
                    <Link
                        href={href}
                        label={label}
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                    />
                ) : children
            }
        }
    }, content)

/**
 * Renders a text node and its optional formatting.
 *
 * @param node - Text and inline marks.
 * @returns The formatted text.
 * @example
 * renderTextNode({ type: 'text', text: 'Hello' })
 */
const renderTextNode = (node: RichTextTextNode): ReactNode => renderMarks(node.text, node.marks)

/**
 * Recursively renders supported rich-text blocks, images and inline nodes.
 * Unsafe URLs are omitted and invalid style values are not applied.
 *
 * @param nodes - Document children; defaults to an empty array.
 * @returns Semantic elements in document order.
 * @example
 * renderRichTextNodes([{ type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] }])
 */
export const renderRichTextNodes = (nodes: RichTextNode[] = []): ReactNode[] =>
    nodes.map((node, index) => {
        const key = `${node.type}-${index}`

        if (node.type === 'text') {
            return <span key={key}>{renderTextNode(node)}</span>
        }

        if (node.type === 'image') {
            const src = node.attrs.src.startsWith('data:image/')
                ? node.attrs.src
                : normalizeRichTextUrl(node.attrs.src)

            return src ? (
                <img
                    key={key}
                    src={src}
                    alt={node.attrs.alt ?? ''}
                    title={node.attrs.title ?? undefined}
                    style={node.attrs.width && /^\d+(?:\.\d+)?(?:%|px|rem|em)?$/.test(node.attrs.width)
                        ? { width: node.attrs.width }
                        : undefined}
                />
            ) : null
        }

        if (node.type === 'horizontalRule') {
            return <hr key={key} />
        }

        if (node.type === 'hardBreak') {
            return <br key={key} />
        }

        const children = renderRichTextNodes(node.content)
        const style = node.attrs?.textAlign
            ? { textAlign: node.attrs.textAlign }
            : undefined

        switch (node.type) {
            case 'paragraph':
                return (
                    <Typography
                        key={key}
                        variant={'p'}
                        style={style}
                    >
                        {children}
                    </Typography>
                )
            case 'heading': {
                const variant = node.attrs?.level === 1
                    ? 'h1'
                    : node.attrs?.level === 2
                        ? 'h2'
                        : 'h3'

                return (
                    <Typography
                        key={key}
                        variant={variant}
                        style={style}
                    >
                        {children}
                    </Typography>
                )
            }
            case 'bulletList':
                return <ul key={key}>{children}</ul>
            case 'orderedList':
                return <ol key={key}>{children}</ol>
            case 'listItem':
                return <li key={key}>{children}</li>
            case 'blockquote':
                return <blockquote key={key}>{children}</blockquote>
            case 'codeBlock':
                return <pre key={key}><code>{children}</code></pre>
        }
    })
