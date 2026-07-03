import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuLabel', () => {
    it('renders a label inside an open menu', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger asChild>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label label={'Section'} />
                    <DropdownMenu.Item label={'Item'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByText('Section')).toBeTruthy()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.Label.displayName).toBe('DropdownMenuLabel')
    })
})
