import type * as React from 'react'
import type { RefAttributes } from 'react'

export type MarkdownRendererProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'children'
> &
    RefAttributes<HTMLDivElement> & {
        /** Markdown source to render. Raw HTML is intentionally not rendered. */
        markdown: string
    }
