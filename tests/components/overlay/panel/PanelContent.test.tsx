import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Panel } from '@components/overlay/panel'

describe('Panel.Content', () => {
    it('renders the configured position and width', () => {
        render(
            <Panel defaultOpen>
                <Panel.Content position="left" width="42rem">
          Content
                </Panel.Content>
            </Panel>,
        )

        const dialog = screen.getByRole('dialog')

        expect(dialog.className).toContain('Panel_left')
        expect(dialog.style.width).toBe('42rem')
    })
})
