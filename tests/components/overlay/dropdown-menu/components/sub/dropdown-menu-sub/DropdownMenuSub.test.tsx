import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuSub', () => {
    it('renders a nested sub-menu structure', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger asChild>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger label={'More'} />
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item label={'Nested'} />
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menuitem', { name: 'More' })).toBeTruthy()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.Sub.displayName).toBe('DropdownMenuSub')
    })
})
