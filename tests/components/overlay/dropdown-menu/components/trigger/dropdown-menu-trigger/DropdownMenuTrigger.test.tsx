import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuTrigger', () => {
    it('renders the trigger inside the dropdown root', () => {
        render(
            <DropdownMenu>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
            </DropdownMenu>,
        )

        expect(screen.getByRole('button', { name: 'Open' })).toBeTruthy()
    })

    it('forwards the asChild prop to the underlying Radix trigger', () => {
        render(
            <DropdownMenu>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
            </DropdownMenu>,
        )

        expect(screen.getByRole('button', { name: 'Open' })).toBeTruthy()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.Trigger.displayName).toBe('DropdownMenu.Trigger')
    })
})
