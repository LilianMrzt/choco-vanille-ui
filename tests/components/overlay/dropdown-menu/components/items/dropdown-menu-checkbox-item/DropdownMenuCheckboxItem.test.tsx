import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuCheckboxItem', () => {
    it('renders a checkbox menu item', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger asChild>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.CheckboxItem label={'Show'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menuitemcheckbox', { name: 'Show' })).toBeTruthy()
    })

    it('reflects the checked state', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger asChild>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.CheckboxItem label={'Show'} checked />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menuitemcheckbox', { name: 'Show' }).getAttribute('aria-checked')).toBe('true')
    })

    it('calls onSelect when activated', async () => {
        const onSelect = vi.fn()
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger asChild>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.CheckboxItem label={'Show'} onSelect={onSelect} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        await userEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Show' }))
        expect(onSelect).toHaveBeenCalled()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.CheckboxItem.displayName).toBe('DropdownMenuCheckboxItem')
    })
})
