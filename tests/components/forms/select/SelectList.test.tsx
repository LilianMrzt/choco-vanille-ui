import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Select from '@components/forms/select/Select.tsx'

const openSelect = async () => {
    await userEvent.click(screen.getByRole('combobox'))
    await waitFor(() => {
        expect(document.querySelector('[data-open]')).not.toBeNull()
    })
}

describe('SelectList', () => {
    describe('rendering', () => {
        it('renders its children (items) when the Select is open', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'apple'} label={'Apple'} />
                            <Select.Item value={'banana'} label={'Banana'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(screen.getByRole('option', { name: 'Apple' })).toBeTruthy()
            expect(screen.getByRole('option', { name: 'Banana' })).toBeTruthy()
        })

        it('renders a listbox role when opened', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'apple'} label={'Apple'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(screen.getByRole('listbox')).toBeTruthy()
        })

        it('renders all provided items', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'a'} label={'Alpha'} />
                            <Select.Item value={'b'} label={'Beta'} />
                            <Select.Item value={'c'} label={'Gamma'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(screen.getAllByRole('option')).toHaveLength(3)
        })
    })

    describe('displayName', () => {
        it('is set to "Select.List"', () => {
            expect(Select.List.displayName).toBe('Select.List')
        })
    })
})
