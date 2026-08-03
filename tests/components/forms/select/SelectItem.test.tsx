import { addIcon } from '@iconify/react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import Select from '@components/forms/select/Select.tsx'

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:check', {
        body: '<path d="M20 6 9 17l-5-5"/>',
        width: 24,
        height: 24,
    })
})

const openSelect = async () => {
    await userEvent.click(screen.getByRole('combobox'))
    await waitFor(() => {
        expect(document.querySelector('[data-open]')).not.toBeNull()
    })
}

describe('SelectItem', () => {
    describe('rendering', () => {
        it('renders an option inside the listbox', async () => {
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
            expect(screen.getByRole('option', { name: 'Apple' })).toBeTruthy()
        })

        it('renders multiple options', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'apple'} label={'Apple'} />
                            <Select.Item value={'banana'} label={'Banana'} />
                            <Select.Item value={'cherry'} label={'Cherry'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(screen.getAllByRole('option')).toHaveLength(3)
        })

        it('renders children text when label is omitted', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'mango'}>Mango</Select.Item>
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(screen.getByText('Mango')).toBeTruthy()
        })
    })

    describe('disabled state', () => {
        it('marks the item as disabled with data-disabled', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'apple'} label={'Apple'} disabled />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            const option = screen.getByRole('option', { name: 'Apple' })
            expect(option.getAttribute('data-disabled')).toBe('')
        })

        it('does not call onValueChange for a disabled item', async () => {
            const handleChange = vi.fn()
            render(
                <Select onValueChange={handleChange}>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'apple'} label={'Apple'} disabled />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            await userEvent.click(screen.getByRole('option', { name: 'Apple' }))
            expect(handleChange).not.toHaveBeenCalled()
        })
    })

    describe('selection behavior', () => {
        it('calls onValueChange with the item value when clicked', async () => {
            const handleChange = vi.fn()
            render(
                <Select onValueChange={handleChange}>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'banana'} label={'Banana'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            await userEvent.click(screen.getByRole('option', { name: 'Banana' }))
            expect(handleChange).toHaveBeenCalledWith('banana', expect.any(Object))
        })
    })

    describe('custom className', () => {
        it('merges a custom className onto the option element', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item
                                value={'apple'}
                                label={'Apple'}
                                className={'custom-item'}
                            />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(document.querySelector('.custom-item')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Select.Item"', () => {
            expect(Select.Item.displayName).toBe('Select.Item')
        })
    })
})
