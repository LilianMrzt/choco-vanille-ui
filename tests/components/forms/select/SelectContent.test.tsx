import { addIcon } from '@iconify/react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import Select from '@components/forms/select/Select.tsx'

// SelectContent renders inside a BaseSelect.Portal → Positioner → Popup.
// It only mounts in the DOM when the Select is open.

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

/** Opens the Select by clicking the trigger. */
const openSelect = async () => {
    await userEvent.click(screen.getByRole('combobox'))
    await waitFor(() => {
        expect(document.querySelector('[data-open]')).not.toBeNull()
    })
}

describe('SelectContent', () => {
    describe('rendering', () => {
        it('does not render the popup before the Select is opened', () => {
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
            // Popup should not exist in DOM while closed
            expect(document.querySelector('[data-popup]')).toBeNull()
        })

        it('renders the popup when the Select is open', async () => {
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
            expect(screen.getByText('Apple')).toBeTruthy()
        })

        it('renders children inside the popup', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'banana'} label={'Banana'} />
                            <Select.Item value={'cherry'} label={'Cherry'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(screen.getByText('Banana')).toBeTruthy()
            expect(screen.getByText('Cherry')).toBeTruthy()
        })
    })

    describe('listboxAriaLabel prop', () => {
        it('applies the default aria-label "Options" to the popup', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Item value={'a'} label={'A'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            const popup = document.querySelector('[aria-label]') as HTMLElement
            expect(popup.getAttribute('aria-label')).toBe('Options')
        })

        it('applies a custom listboxAriaLabel to the popup', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content listboxAriaLabel={'Fruit list'}>
                        <Select.List>
                            <Select.Item value={'a'} label={'A'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            const popup = document.querySelector('[aria-label="Fruit list"]') as HTMLElement
            expect(popup).toBeTruthy()
        })
    })

    describe('custom className', () => {
        it('merges a custom className onto the popup', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content className={'custom-content'}>
                        <Select.List>
                            <Select.Item value={'a'} label={'A'} />
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            const popup = document.querySelector('.custom-content') as HTMLElement
            expect(popup).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Select.Content"', () => {
            expect(Select.Content.displayName).toBe('Select.Content')
        })
    })
})
