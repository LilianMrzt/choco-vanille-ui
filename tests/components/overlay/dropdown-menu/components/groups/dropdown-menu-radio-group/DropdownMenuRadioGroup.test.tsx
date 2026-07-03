import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DropdownMenu } from '@components/overlay/dropdown-menu'

describe('DropdownMenuRadioGroup', () => {
    it('renders radio items and enforces a single selection', () => {
        render(
            <DropdownMenu defaultOpen>
                <DropdownMenu.Trigger asChild>
                    <button type={'button'}>Open</button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.RadioGroup value={'b'}>
                        <DropdownMenu.RadioItem value={'a'} label={'Option A'} />
                        <DropdownMenu.RadioItem value={'b'} label={'Option B'} />
                    </DropdownMenu.RadioGroup>
                </DropdownMenu.Content>
            </DropdownMenu>,
        )

        const options = screen.getAllByRole('menuitemradio')
        expect(options).toHaveLength(2)
        expect(options[1].getAttribute('aria-checked')).toBe('true')
        expect(options[0].getAttribute('aria-checked')).toBe('false')
    })

    it('is attached to the DropdownMenu compound component', () => {
        expect(DropdownMenu.RadioGroup.displayName).toBe('DropdownMenuRadioGroup')
    })
})
