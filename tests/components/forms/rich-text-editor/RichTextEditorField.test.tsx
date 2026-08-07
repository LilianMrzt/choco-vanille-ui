import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditorField } from '@components/forms/rich-text-editor'

describe('RichTextEditorField', () => {
    it('renders the standard labelled editor layout', () => {
        render(<RichTextEditorField label={'Description'} />)

        expect(screen.getByRole('textbox', { name: 'Description' })).toBeTruthy()
        expect(screen.getByRole('toolbar', { name: 'Text formatting' })).toBeTruthy()
    })
})
