import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('TextColorMenu', () => {
    it('renders the text color control', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.TextAppearanceGroup.TextColorMenu />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Text color' })).toBeTruthy()
    })
})
