import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('AlignmentGroup', () => {
    it('renders its labelled toolbar action', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.AlignmentGroup />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Text alignment' })).toBeTruthy()
    })
})
