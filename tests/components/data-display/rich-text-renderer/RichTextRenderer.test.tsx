import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import type { RichTextValue } from '@components/forms/rich-text-editor'
import { vars } from '@theme/styles/contract/contract.css.ts'

const VALUE: RichTextValue = {
    type: 'doc',
    content: [
        {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Heading' }],
        },
        {
            type: 'paragraph',
            content: [
                { type: 'text', text: 'Bold', marks: [{ type: 'bold' }] },
                { type: 'text', text: ' and italic', marks: [{ type: 'italic' }] },
            ],
        },
        {
            type: 'bulletList',
            content: [
                {
                    type: 'listItem',
                    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Item' }] }],
                },
            ],
        },
    ],
}

describe('RichTextRenderer', () => {
    it('renders the supported document nodes and marks', () => {
        render(<RichTextRenderer value={VALUE} />)

        expect(screen.getByRole('heading', { level: 2, name: 'Heading' })).toBeTruthy()
        expect(screen.getByText('Bold').tagName).toBe('STRONG')
        expect(screen.getByText('and italic').tagName).toBe('EM')
        expect(screen.getByRole('list')).toBeTruthy()
        expect(screen.getByText('Item').closest('li')).toBeTruthy()
    })

    it('renders approved colors and only safe links', () => {
        render(
            <RichTextRenderer
                value={{
                    type: 'doc',
                    content: [
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    text: 'Secure link',
                                    marks: [{
                                        type: 'link',
                                        attrs: { href: 'https://example.com' },
                                    }],
                                },
                                {
                                    type: 'text',
                                    text: ' colored',
                                    marks: [{
                                        type: 'textStyle',
                                        attrs: { color: vars.editorColors.ocean.base },
                                    }],
                                },
                                {
                                    type: 'text',
                                    text: ' unsafe link',
                                    marks: [{
                                        type: 'link',
                                        attrs: { href: 'javascript:alert(1)' },
                                    }],
                                },
                            ],
                        },
                    ],
                }}
            />,
        )

        const link = screen.getByRole('link', { name: 'Secure link' })
        expect(link.getAttribute('href')).toBe('https://example.com')
        expect(link.getAttribute('target')).toBe('_blank')
        expect(link.getAttribute('rel')).toBe('noopener noreferrer')
        expect(screen.getByText('colored').getAttribute('style')).toContain(vars.editorColors.ocean.base)
        expect(screen.queryByRole('link', { name: 'unsafe link' })).toBeNull()
    })

    it('renders every extended editor node and mark', () => {
        render(
            <RichTextRenderer
                value={{
                    type: 'doc',
                    content: [
                        {
                            type: 'paragraph',
                            attrs: { textAlign: 'center' },
                            content: [
                                { type: 'text', text: 'Centered', marks: [{ type: 'strike' }] },
                                { type: 'hardBreak' },
                                { type: 'text', text: 'line', marks: [{ type: 'code' }] },
                            ],
                        },
                        {
                            type: 'blockquote',
                            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Quoted' }] }],
                        },
                        {
                            type: 'codeBlock',
                            content: [{ type: 'text', text: 'const value = 1' }],
                        },
                        { type: 'horizontalRule' },
                        {
                            type: 'image',
                            attrs: { src: 'https://example.com/image.png', alt: 'Example', width: '50%' },
                        },
                    ],
                }}
            />,
        )

        expect(screen.getByText('Centered').closest('p')?.style.textAlign).toBe('center')
        expect(screen.getByText('Centered').tagName).toBe('S')
        expect(screen.getByText('Centered').closest('p')?.querySelector('br')).toBeTruthy()
        expect(screen.getByText('line').tagName).toBe('CODE')
        expect(screen.getByText('Quoted').closest('blockquote')).toBeTruthy()
        expect(screen.getByText('const value = 1').closest('pre')).toBeTruthy()
        expect(document.querySelector('hr')).toBeTruthy()
        expect(screen.getByRole('img', { name: 'Example' }).style.width).toBe('50%')
    })
})
