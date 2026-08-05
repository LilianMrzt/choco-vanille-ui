import { isValidElement, type ReactNode } from 'react'

import { Typography } from '@components/foundation/typography'
import { Link } from '@components/navigation/link'
import type {
    RichTextMark,
    RichTextNode,
    RichTextTextNode,
} from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'
import {
    normalizeRichTextColorValue,
    normalizeRichTextUrl,
} from '@components/forms/rich-text-editor/utils/richText.utils.ts'

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
            case 'textStyle': {
                const color = normalizeRichTextColorValue(mark.attrs.color)

                return color
                    ? <span style={{ color }}>{children}</span>
                    : children
            }
            case 'link': {
                const href = normalizeRichTextUrl(mark.attrs.href)
                const label = extractText(children)

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

const renderTextNode = (node: RichTextTextNode): ReactNode => renderMarks(node.text, node.marks)

export const renderRichTextNodes = (nodes: RichTextNode[] = []): ReactNode[] =>
    nodes.map((node, index) => {
        const key = `${node.type}-${index}`

        if (node.type === 'text') {
            return <span key={key}>{renderTextNode(node)}</span>
        }

        const children = renderRichTextNodes(node.content)

        switch (node.type) {
            case 'paragraph':
                return (
                    <Typography
                        key={key}
                        variant={'p'}
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
        }
    })
