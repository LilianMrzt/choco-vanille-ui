import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import CollapsibleExample from '@stories/surfaces/collapsible/components/collapsible-example/CollapsibleExample'

describe('CollapsibleExample', () => {
    it('assigns slot controls without leaking them to the root', () => {
        render(
            <CollapsibleExample
                data-testid={'root'}
                defaultOpen
                panelPadding={0}
                triggerLabel={'Details'}
                triggerWidth={'12rem'}
            />,
        )

        const root = screen.getByTestId('root')
        const trigger = screen.getByRole('button', { name: 'Details' })
        expect(root.hasAttribute('triggerLabel')).toBe(false)
        expect(root.hasAttribute('panelPadding')).toBe(false)
        expect(trigger.style.width).toBe('12rem')
    })
})
