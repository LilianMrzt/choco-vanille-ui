import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuRadioItem', () => {
    it('renders a radio menu item', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.RadioGroup value={'a'}>
                        <DropdownMenu.RadioItem value={'a'} label={'Option A'} />
                    </DropdownMenu.RadioGroup>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menuitemradio', { name: 'Option A' })).toBeTruthy()
    })

    it('calls onSelect when activated', async () => {
        const onSelect = vi.fn()
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.RadioGroup value={'a'}>
                        <DropdownMenu.RadioItem value={'a'} label={'Option A'} onSelect={onSelect} />
                    </DropdownMenu.RadioGroup>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        await userEvent.click(screen.getByRole('menuitemradio', { name: 'Option A' }))
        expect(onSelect).toHaveBeenCalled()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.RadioItem.displayName).toBe('DropdownMenu.RadioItem')
    })
})
