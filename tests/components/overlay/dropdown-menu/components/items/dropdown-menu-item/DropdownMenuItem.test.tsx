import { BOLD_ICON as BoldIcon, CHEVRON_RIGHT_ICON as ChevronRightIcon } from '@constants/icon-registry'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuItem', () => {
    it('renders an actionable menu item', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label={'Edit'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeTruthy()
    })

    it('calls onClick when activated', async () => {
        const onClick = vi.fn()
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label={'Edit'} onClick={onClick} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        await userEvent.click(screen.getByRole('menuitem', { name: 'Edit' }))
        expect(onClick).toHaveBeenCalled()
    })

    it('renders start and end icons', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item
                        label={'Edit'}
                        startIcon={BoldIcon}
                        endIcon={ChevronRightIcon}
                    />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeTruthy()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.Item.displayName).toBe('DropdownMenu.Item')
    })
})
