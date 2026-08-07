import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('EditorField', () => {
    it('renders the labelled editor', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.EditorField />
            </RichTextEditor>,
        )

        expect(screen.getByRole('textbox', { name: 'Description' })).toBeTruthy()
    })
})
