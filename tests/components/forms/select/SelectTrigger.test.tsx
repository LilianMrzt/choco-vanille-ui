import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { createRef } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Select from '@components/forms/select/Select.tsx'

describe('SelectTrigger', () => {
    describe('default rendering', () => {
        it('renders a combobox button', () => {
            render(
                <Select>
                    <Select.Trigger />
                </Select>,
            )
            expect(screen.getByRole('combobox')).toBeTruthy()
        })

        it('renders a chevron-down icon', () => {
            render(
                <Select>
                    <Select.Trigger />
                </Select>,
            )
            // At least the chevron icon SVG should be present
            expect(document.querySelector('svg')).toBeTruthy()
        })
    })

    describe('placeholder prop', () => {
        it('renders the placeholder text when no value is selected', () => {
            render(
                <Select>
                    <Select.Trigger placeholder={'Select an option'} />
                </Select>,
            )
            expect(screen.getByRole('combobox').textContent).toContain(
                'Select an option',
            )
        })
    })

    describe('startIcon prop', () => {
        it('renders an additional icon when startIcon is provided', () => {
            render(
                <Select>
                    <Select.Trigger startIcon={SearchIcon} />
                </Select>,
            )
            // Both start icon and chevron → at least 2 SVGs
            expect(document.querySelectorAll('svg').length).toBeGreaterThanOrEqual(2)
        })
    })

    describe('size prop', () => {
        it('applies a non-empty className for each size variant', () => {
            for (const size of ['sm', 'md', 'lg'] as const) {
                const { unmount } = render(
                    <Select>
                        <Select.Trigger size={size} />
                    </Select>,
                )
                expect(screen.getByRole('combobox').className.length).toBeGreaterThan(
                    0,
                )
                unmount()
            }
        })
    })

    describe('hasError prop', () => {
        it('applies a non-empty className in error state', () => {
            render(
                <Select>
                    <Select.Trigger hasError />
                </Select>,
            )
            expect(screen.getByRole('combobox').className.length).toBeGreaterThan(0)
        })
    })

    describe('disabled state', () => {
        it('disables the trigger button when the Select is disabled', () => {
            render(
                <Select disabled>
                    <Select.Trigger />
                </Select>,
            )
            expect((screen.getByRole('combobox') as HTMLButtonElement).disabled).toBe(
                true,
            )
        })
    })

    describe('interaction', () => {
        it('opens the listbox when clicked', async () => {
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
            await userEvent.click(screen.getByRole('combobox'))
            await waitFor(() => {
                expect(document.querySelector('[data-open]')).not.toBeNull()
            })
        })

        it('shows the selected value after picking an item', async () => {
            render(
                <Select>
                    <Select.Trigger placeholder={'Pick one'} />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'banana'} label={'Banana'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            await waitFor(() => {
                expect(document.querySelector('[data-open]')).not.toBeNull()
            })
            await userEvent.click(screen.getByRole('option', { name: 'Banana' }))
            await waitFor(() => {
                // BaseSelect.Value in jsdom renders the raw value string; the
                // placeholder is no longer shown once a value is selected.
                expect(screen.getByRole('combobox').textContent).not.toContain(
                    'Pick one',
                )
            })
        })
    })

    describe('custom className', () => {
        it('merges a custom className onto the trigger button', () => {
            render(
                <Select>
                    <Select.Trigger className={'my-trigger'} />
                </Select>,
            )
            expect(screen.getByRole('combobox').className).toContain('my-trigger')
        })
    })

    describe('width prop', () => {
        it('applies a custom width via inline style', () => {
            render(
                <Select>
                    <Select.Trigger width={'12rem'} />
                </Select>,
            )
            expect((screen.getByRole('combobox') as HTMLElement).style.width).toBe(
                '12rem',
            )
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the trigger button element', () => {
            const ref = createRef<HTMLButtonElement>()
            render(
                <Select>
                    <Select.Trigger ref={ref} />
                </Select>,
            )
            expect(ref.current).toBe(screen.getByRole('combobox'))
        })
    })

    describe('displayName', () => {
        it('is set to "Select.Trigger"', () => {
            expect(Select.Trigger.displayName).toBe('Select.Trigger')
        })
    })
})
