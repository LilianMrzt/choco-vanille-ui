import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    MarkdownRenderer,
} from '@components/data-display/markdown-renderer'
import { LINK_STYLES } from '@components/navigation/link'

describe('MarkdownRenderer', () => {
    it('renders common Markdown elements', () => {
        render(
            <MarkdownRenderer
                markdown={'# Title\n\n**Bold** and *italic*\n\n- First item'}
            />,
        )

        expect(screen.getByRole('heading', { name: 'Title' })).toBeTruthy()
        expect(screen.getByText('Bold').tagName).toBe('STRONG')
        expect(screen.getByText('italic').tagName).toBe('EM')
        expect(screen.getByRole('list')).toBeTruthy()
    })

    it('supports GFM tables', () => {
        render(
            <MarkdownRenderer
                markdown={'| Name | Status |\n| --- | --- |\n| Choco | Ready |'}
            />,
        )

        expect(screen.getByRole('table')).toBeTruthy()
        expect(screen.getByRole('cell', { name: 'Choco' })).toBeTruthy()
    })

    it('does not render raw HTML', () => {
        render(
            <MarkdownRenderer
                markdown={'<script>alert("xss")</script><span>unsafe</span>'}
            />,
        )

        expect(document.querySelector('script')).toBeNull()
        expect(document.querySelector('span')).toBeNull()
    })

    it('removes unsafe link protocols', () => {
        render(
            <MarkdownRenderer
                markdown={'[Unsafe](javascript:alert("xss")) [Safe](https://example.com)'}
            />,
        )

        expect(screen.getByText('Unsafe').closest('a')).toBeNull()
        const safeLink = screen.getByRole('link', { name: 'Safe' })

        expect(safeLink.getAttribute('href')).toBe('https://example.com')
        expect(safeLink.className).toContain(LINK_STYLES.base)
    })

    it('forwards className and ref to the root element', () => {
        const ref = createRef<HTMLDivElement>()

        render(
            <MarkdownRenderer
                ref={ref}
                className={'custom-markdown'}
                markdown={'Content'}
            />,
        )

        expect(ref.current).toBe(document.querySelector('.custom-markdown'))
    })

})
