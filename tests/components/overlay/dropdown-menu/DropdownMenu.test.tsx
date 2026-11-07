import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { DROPDOWN_MENU_SUB_CONTENT_STYLES } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/DropdownMenuSubContent.css.ts'

describe('DropdownMenu', () => {
    it('renders the trigger and opens the menu', async () => {
        const user = userEvent.setup()
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

        await user.click(screen.getByRole('button', { name: 'Open' }))
        await waitFor(() => {
            expect(screen.getByRole('menuitem', { name: 'Item' })).toBeTruthy()
        })
    }, 10000)

    it('supports controlled open state', async () => {
        const user = userEvent.setup()
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

        await user.click(screen.getByRole('button', { name: 'Open' }))
        await waitFor(() => {
            expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.anything())
        })
        expect(screen.queryByRole('menu')).toBeNull()
    }, 10000)

    it.each([
        { alignOffset: undefined, isAligned: true },
        { alignOffset: 0, isAligned: false },
        { alignOffset: 12, isAligned: false },
    ])('uses the default submenu alignment only without an explicit offset: $alignOffset', async ({ alignOffset, isAligned }) => {
        const user = userEvent.setup()
        render(
            <DropdownMenu>
                <DropdownMenu.Trigger>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger label={'More'} />
                        <DropdownMenu.SubContent alignOffset={alignOffset}>
                            <DropdownMenu.Item label={'First item'} />
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        await user.click(screen.getByRole('button', { name: 'Open' }))
        await user.click(await screen.findByRole('menuitem', { name: 'More' }))

        const item = await screen.findByRole('menuitem', { name: 'First item' })
        const positioner = item.closest('[data-side]')?.parentElement

        expect(positioner?.classList.contains(DROPDOWN_MENU_SUB_CONTENT_STYLES.alignedPositioner)).toBe(isAligned)
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
