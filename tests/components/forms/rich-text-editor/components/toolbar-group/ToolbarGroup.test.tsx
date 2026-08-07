import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RichTextEditor } from '@components/forms/rich-text-editor'

describe('ToolbarGroup', () => {
    it('renders a labelled toolbar group', () => {
        render(
            <RichTextEditor label={'Description'}>
                <RichTextEditor.ToolbarGroup aria-label={'Formatting'}>
                    <span>Action</span>
                </RichTextEditor.ToolbarGroup>
            </RichTextEditor>,
        )

        expect(screen.getByRole('group', { name: 'Formatting' })).toBeTruthy()
    })
})
