import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuContent', () => {
    it('renders content when the menu is open by default', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label={'Item'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menu')).toBeTruthy()
        expect(screen.getByRole('menuitem', { name: 'Item' })).toBeTruthy()
    })

    it('does not render content when the menu is closed', () => {
        render(
            <DropdownMenu>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label={'Item'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.queryByRole('menu')).toBeNull()
    })

    it('opens and closes via the trigger', async () => {
        render(
            <DropdownMenu>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label={'Item'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Open' }))
        expect(screen.getByRole('menuitem', { name: 'Item' })).toBeTruthy()

        await userEvent.keyboard('{Escape}')
        expect(screen.queryByRole('menu')).toBeNull()
    }, 10000)

    it('calls onOpenChange when the open state changes', async () => {
        const onOpenChange = vi.fn()
        render(
            <DropdownMenu onOpenChange={onOpenChange}>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label={'Item'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Open' }))
        expect(onOpenChange).toHaveBeenLastCalledWith(true)
    }, 10000)

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.Content.displayName).toBe('DropdownMenu.Content')
    })

    it('applies the default width and prevents flex growth/shrink', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label={'Item'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        const content = screen.getByRole('menu')
        expect(content.style.width).toBe('14rem')
        expect(content.style.flexGrow).toBe('0')
        expect(content.style.flexShrink).toBe('0')
    })

    it('applies a custom width', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content width={'20rem'}>
                    <DropdownMenu.Item label={'Item'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menu').style.width).toBe('20rem')
    })
})
