import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('TextAppearanceGroup', () => {
    it('renders its text appearance controls', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.TextAppearanceGroup />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Text color' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Text size' })).toBeTruthy()
    })
})
