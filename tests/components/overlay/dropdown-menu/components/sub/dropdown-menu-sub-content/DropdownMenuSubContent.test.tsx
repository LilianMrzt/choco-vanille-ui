import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuSubContent', () => {
    it('renders nested content when the sub-menu is open', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Sub open>
                        <DropdownMenu.SubTrigger label={'More'} />
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item label={'Nested'} />
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getByRole('menuitem', { name: 'Nested' })).toBeTruthy()
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.SubContent.displayName).toBe('DropdownMenu.SubContent')
    })

    it('applies the default width and prevents flex growth/shrink', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Sub open>
                        <DropdownMenu.SubTrigger label={'More'} />
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item label={'Nested'} />
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        const content = screen.getAllByRole('menu')[1]
        expect(content.style.width).toBe('14rem')
    })

    it('applies a custom width', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger><button type={'button'}>Open</button></DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Sub open>
                        <DropdownMenu.SubTrigger label={'More'} />
                        <DropdownMenu.SubContent width={'20rem'}>
                            <DropdownMenu.Item label={'Nested'} />
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        expect(screen.getAllByRole('menu')[1].style.width).toBe('20rem')
    })
})
