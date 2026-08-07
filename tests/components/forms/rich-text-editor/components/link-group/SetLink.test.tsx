import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('SetLink', () => {
    it('renders the set-link action', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.SetLink />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Add or edit link' })).toBeTruthy()
    })
})
