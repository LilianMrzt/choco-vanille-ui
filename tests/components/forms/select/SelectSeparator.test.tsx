import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Select from '@components/forms/select/Select.tsx'

const openSelect = async () => {
    await userEvent.click(screen.getByRole('combobox'))
    await waitFor(() => {
        expect(document.querySelector('[data-open]')).not.toBeNull()
    })
}

describe('SelectSeparator', () => {
    describe('rendering', () => {
        it('renders a presentational separator between items', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'apple'} label={'Apple'} />
                            <Select.Separator />
                            <Select.Item value={'carrot'} label={'Carrot'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(within(screen.getByRole('listbox')).getByRole('presentation')).toBeTruthy()
        })

        it('renders with a non-empty className by default', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'a'} label={'A'} />
                            <Select.Separator />
                            <Select.Item value={'b'} label={'B'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            const separator = within(screen.getByRole('listbox')).getByRole('presentation')
            expect(separator.className.length).toBeGreaterThan(0)
        })

        it('does not interfere with item selection', async () => {
            const handleChange = vi.fn()
            render(
                <Select onValueChange={handleChange}>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'apple'} label={'Apple'} />
                            <Select.Separator />
                            <Select.Item value={'carrot'} label={'Carrot'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            await userEvent.click(screen.getByRole('option', { name: 'Carrot' }))
            expect(handleChange).toHaveBeenCalledWith('carrot', expect.any(Object))
        })
    })

    describe('custom className', () => {
        it('merges a custom className onto the separator', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'a'} label={'A'} />
                            <Select.Separator className={'my-separator'} />
                            <Select.Item value={'b'} label={'B'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(document.querySelector('.my-separator')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Select.Separator"', () => {
            expect(Select.Separator.displayName).toBe('Select.Separator')
        })
    })
})
