import { CHEVRON_RIGHT_ICON as ChevronRightIcon } from '@constants/icon-registry'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuSubTrigger', () => {
    it('renders a sub-menu trigger', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger label={'More'} />
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item label={'Nested'} />
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menuitem', { name: 'More' })).toBeTruthy()
    })

    it('renders a start icon when provided', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger
                            label={'More'}
                            startIcon={ChevronRightIcon}
                        />
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item label={'Nested'} />
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menuitem', { name: 'More' })).toBeTruthy()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.SubTrigger.displayName).toBe('DropdownMenu.SubTrigger')
    })
})
