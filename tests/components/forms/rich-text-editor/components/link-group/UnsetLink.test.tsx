import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('UnsetLink', () => {
    it('renders the unset-link action', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.UnsetLink />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Remove link' })).toBeTruthy()
    })
})
