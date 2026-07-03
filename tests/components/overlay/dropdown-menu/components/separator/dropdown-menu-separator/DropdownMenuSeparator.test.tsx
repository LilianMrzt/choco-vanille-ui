import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuSeparator', () => {
    it('renders a separator inside an open menu', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger asChild>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label={'Above'} />
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item label={'Below'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('separator')).toBeTruthy()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.Separator.displayName).toBe('DropdownMenuSeparator')
    })
})
