import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('Toolbar', () => {
    it('renders the toolbar landmark', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.Toolbar>
                    <span>Action</span>
                </RichTextEditor.Toolbar>
            </RichTextEditor>,
        )

        expect(screen.getByRole('toolbar', { name: 'Text formatting' })).toBeTruthy()
    })
})
