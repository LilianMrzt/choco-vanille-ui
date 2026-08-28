import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Panel } from '@components/overlay/panel/Panel.tsx'
import { PANEL_HEADER_STYLES } from '@components/overlay/panel/components/panel-header/styles/PanelHeader.css.ts'

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

    it('keeps actions before the close button in the trailing row', () => {
        render(
            <Panel defaultOpen>
                <Panel.Content>
                    <Panel.Header
                        title="Settings"
                        actions={<button type="button">Save draft</button>}
                    />
                </Panel.Content>
            </Panel>,
        )

        const action = screen.getByRole('button', { name: 'Save draft' })
        const closeButton = screen.getByRole('button', { name: 'Close panel' })
        const actionsRow = action.parentElement

        expect(actionsRow).toBe(closeButton.parentElement)
        expect(actionsRow?.className).toContain(PANEL_HEADER_STYLES.actions)
        expect(action.nextElementSibling).toBe(closeButton)
        expect(screen.getByText('Settings').parentElement?.className).toContain(
            PANEL_HEADER_STYLES.content,
        )
    })

    it('truncates long titles and descriptions with an ellipsis', () => {
        render(
            <Panel defaultOpen>
                <Panel.Content>
                    <Panel.Header
                        title="A very long panel title"
                        description="A very long panel description"
                    />
                </Panel.Content>
            </Panel>,
        )

        expect(screen.getByText('A very long panel title').className).toContain(
            'ellipsis_true',
        )
        expect(
            screen.getByText('A very long panel description').className,
        ).toContain('ellipsis_true')
    })
})
