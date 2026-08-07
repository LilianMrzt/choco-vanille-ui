import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('ReadOnlyField', () => {
    it('renders the read-only document', () => {
        render(
            <RichTextEditor
                label={'Description'}
                readOnly
                defaultValue={{
                    type: 'doc',
                    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Read-only content' }] }],
                }}
            >
                <RichTextEditor.ReadOnlyField />
            </RichTextEditor>,
        )

        expect(screen.getByText('Read-only content')).toBeTruthy()
    })
})
