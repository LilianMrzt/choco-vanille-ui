import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import type { RichTextValue } from '@components/forms/rich-text-editor'

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
})
