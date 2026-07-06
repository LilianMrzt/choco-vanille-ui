import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuShortcut', () => {
    it('renders shortcut text inside an item', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Item label={'Edit'} shortcut={'⌘E'} />
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByText('⌘E')).toBeTruthy()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.Shortcut.displayName).toBe('DropdownMenu.Shortcut')
    })
})
