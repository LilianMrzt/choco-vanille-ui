import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import DrawerUncontrolled from '@stories/overlay/drawer/components/drawer-uncontrolled/DrawerUncontrolled'

describe('DrawerUncontrolled', () => {
    it('opens, closes with Escape and can be reopened', async () => {
        const user = userEvent.setup()
        render(<DrawerUncontrolled />)
        const trigger = screen.getByRole('button', { name: 'Open uncontrolled drawer' })
        await user.click(trigger)
        expect(await screen.findByRole('dialog')).toBeTruthy()
        await user.keyboard('{Escape}')
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
        await user.click(trigger)
        expect(await screen.findByRole('dialog')).toBeTruthy()
    })
})
