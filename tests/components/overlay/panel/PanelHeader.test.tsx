import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Panel } from '@components/overlay/panel/Panel.tsx'

describe('Panel.Header', () => {
    it('renders a localized close button label', () => {
        render(
            <Panel defaultOpen>
                <Panel.Content>
                    <Panel.Header title="Settings" closeLabel="Fermer le panneau" />
                </Panel.Content>
            </Panel>,
        )

        expect(
            screen.getByRole('button', { name: 'Fermer le panneau' }),
        ).toBeTruthy()
    })
})
