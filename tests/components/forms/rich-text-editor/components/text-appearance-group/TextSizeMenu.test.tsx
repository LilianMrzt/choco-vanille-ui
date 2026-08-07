import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('TextSizeMenu', () => {
    it('renders the text size control', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.TextAppearanceGroup.TextSizeMenu />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Text size' })).toBeTruthy()
    })
})
