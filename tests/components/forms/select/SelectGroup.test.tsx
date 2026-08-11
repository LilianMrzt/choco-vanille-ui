import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Select from '@components/forms/select/Select.tsx'
/** Opens the select by clicking the combobox trigger. */
const openSelect = async () => {
    await userEvent.click(screen.getByRole('combobox'))
    await waitFor(() => {
        expect(document.querySelector('[data-open]')).not.toBeNull()
    })
}

describe('SelectGroup', () => {
    describe('rendering', () => {
        it('renders a group container with children when the Select is open', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Group>
                                <Select.Item value={'a'} label={'Option A'} />
                                <Select.Item value={'b'} label={'Option B'} />
                            </Select.Group>
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(screen.getByText('Option A')).toBeTruthy()
            expect(screen.getByText('Option B')).toBeTruthy()
        })

        it('renders multiple groups', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Group>
                                <Select.Label>Fruits</Select.Label>
                                <Select.Item value={'apple'} label={'Apple'} />
                            </Select.Group>
                            <Select.Group>
                                <Select.Label>Vegetables</Select.Label>
                                <Select.Item value={'carrot'} label={'Carrot'} />
                            </Select.Group>
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(screen.getByText('Fruits')).toBeTruthy()
            expect(screen.getByText('Vegetables')).toBeTruthy()
            expect(screen.getByText('Apple')).toBeTruthy()
            expect(screen.getByText('Carrot')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Select.Group"', () => {
            expect(Select.Group.displayName).toBe('Select.Group')
        })
    })
})
