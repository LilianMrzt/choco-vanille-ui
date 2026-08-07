import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('LinkGroup', () => {
    it('renders the link group action', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.LinkGroup />
            </RichTextEditor>,
        )

        expect(screen.getByRole('button', { name: 'Link actions' })).toBeTruthy()
    })
})
