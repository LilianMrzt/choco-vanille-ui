import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuGroup', () => {
    it('renders grouped items inside an open menu', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Group>
                        <DropdownMenu.Item label={'Item 1'} />
                        <DropdownMenu.Item label={'Item 2'} />
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menuitem', { name: 'Item 1' })).toBeTruthy()
        expect(screen.getByRole('menuitem', { name: 'Item 2' })).toBeTruthy()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.Group.displayName).toBe('DropdownMenu.Group')
    })
})
