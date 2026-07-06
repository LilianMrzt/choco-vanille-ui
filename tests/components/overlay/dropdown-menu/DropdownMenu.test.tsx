import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenu', () => {
    it('renders the trigger and opens the menu', async () => {
        render(
            <DropdownMenu>
                <DropdownMenu.Trigger>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label={'Item'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('button', { name: 'Open' })).toBeTruthy()

        await userEvent.click(screen.getByRole('button', { name: 'Open' }))
        expect(screen.getByRole('menuitem', { name: 'Item' })).toBeTruthy()
    }, 10000)

    it('supports controlled open state', async () => {
        const onOpenChange = vi.fn()
        render(
            <DropdownMenu open={false} onOpenChange={onOpenChange}>
                <DropdownMenu.Trigger>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label={'Item'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Open' }))
        expect(onOpenChange).toHaveBeenLastCalledWith(true)
        expect(screen.queryByRole('menu')).toBeNull()
    }, 10000)

    it('exposes all compound sub-components', () => {
        expect(DropdownMenu.displayName).toBe('DropdownMenu')
        expect(DropdownMenu.Trigger.displayName).toBe('DropdownMenu.Trigger')
        expect(DropdownMenu.Content.displayName).toBe('DropdownMenu.Content')
        expect(DropdownMenu.Group.displayName).toBe('DropdownMenu.Group')
        expect(DropdownMenu.RadioGroup.displayName).toBe('DropdownMenu.RadioGroup')
        expect(DropdownMenu.Item.displayName).toBe('DropdownMenu.Item')
        expect(DropdownMenu.CheckboxItem.displayName).toBe('DropdownMenu.CheckboxItem')
        expect(DropdownMenu.RadioItem.displayName).toBe('DropdownMenu.RadioItem')
        expect(DropdownMenu.Label.displayName).toBe('DropdownMenu.Label')
        expect(DropdownMenu.Separator.displayName).toBe('DropdownMenu.Separator')
        expect(DropdownMenu.Shortcut.displayName).toBe('DropdownMenu.Shortcut')
        expect(DropdownMenu.Sub.displayName).toBe('DropdownMenu.Sub')
        expect(DropdownMenu.SubTrigger.displayName).toBe('DropdownMenu.SubTrigger')
        expect(DropdownMenu.SubContent.displayName).toBe('DropdownMenu.SubContent')
    })
})
