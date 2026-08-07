import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('ImageGroup', () => {
    it('renders its labelled toolbar action', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.ImageGroup />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Image actions' })).toBeTruthy()
    })
})
