import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('BlockFormatGroup', () => {
    it('renders its labelled toolbar action', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.BlockFormatGroup />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Block format' })).toBeTruthy()
    })
})
