import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditorLabel } from '@components/forms/rich-text-editor/components/rich-text-editor-label'

describe('RichTextEditorLabel', () => {
    it('renders its content with the supplied identifier', () => {
        render(<RichTextEditorLabel id={'description-label'}>Description</RichTextEditorLabel>)

        expect(screen.getByText('Description').id).toBe('description-label')
    })

    it('exposes its disabled state', () => {
        render(
            <RichTextEditorLabel
                id={'description-label'}
                disabled
            >
                Description
            </RichTextEditorLabel>,
        )

        expect(screen.getByText('Description').hasAttribute('data-disabled')).toBe(true)
    })
})
