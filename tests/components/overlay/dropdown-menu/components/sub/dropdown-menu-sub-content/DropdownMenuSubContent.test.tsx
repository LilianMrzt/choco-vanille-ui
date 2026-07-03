import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuSubContent', () => {
    it('renders nested content when the sub-menu is open', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger asChild>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Sub open>
                        <DropdownMenu.SubTrigger label={'More'} />
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item label={'Nested'} />
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menuitem', { name: 'Nested' })).toBeTruthy()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.SubContent.displayName).toBe('DropdownMenuSubContent')
    })
})
