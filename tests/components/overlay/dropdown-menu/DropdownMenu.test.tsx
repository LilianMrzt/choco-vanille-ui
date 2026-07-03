import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenu', () => {
    it('renders the trigger and opens the menu', async () => {
        render(
            <DropdownMenu>
                <DropdownMenu.Trigger asChild>
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
                <DropdownMenu.Trigger asChild>
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
        expect(DropdownMenu.Trigger.displayName).toBe('DropdownMenuTrigger')
        expect(DropdownMenu.Content.displayName).toBe('DropdownMenuContent')
        expect(DropdownMenu.Group.displayName).toBe('DropdownMenuGroup')
        expect(DropdownMenu.RadioGroup.displayName).toBe('DropdownMenuRadioGroup')
        expect(DropdownMenu.Item.displayName).toBe('DropdownMenuItem')
        expect(DropdownMenu.CheckboxItem.displayName).toBe('DropdownMenuCheckboxItem')
        expect(DropdownMenu.RadioItem.displayName).toBe('DropdownMenuRadioItem')
        expect(DropdownMenu.Label.displayName).toBe('DropdownMenuLabel')
        expect(DropdownMenu.Separator.displayName).toBe('DropdownMenuSeparator')
        expect(DropdownMenu.Shortcut.displayName).toBe('DropdownMenuShortcut')
        expect(DropdownMenu.Sub.displayName).toBe('DropdownMenuSub')
        expect(DropdownMenu.SubTrigger.displayName).toBe('DropdownMenuSubTrigger')
        expect(DropdownMenu.SubContent.displayName).toBe('DropdownMenuSubContent')
    })
})
