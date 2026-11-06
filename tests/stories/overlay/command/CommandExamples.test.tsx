import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import CommandStates from '@stories/overlay/command/components/command-states/CommandStates'
import CommandWithIcons from '@stories/overlay/command/components/command-with-icons/CommandWithIcons'

describe('Command examples', () => {
    it('opens the item states example', async () => {
        const user = userEvent.setup()
        render(<CommandStates />)
        await user.click(screen.getByRole('button', { name: 'Show item states' }))
        expect(await screen.findByText('Disabled item')).toBeTruthy()
    })

    it('opens the icon variants example', async () => {
        const user = userEvent.setup()
        render(<CommandWithIcons />)
        await user.click(screen.getByRole('button', { name: 'Show icon variants' }))
        expect(await screen.findByText('Icon and shortcut')).toBeTruthy()
    })
})
