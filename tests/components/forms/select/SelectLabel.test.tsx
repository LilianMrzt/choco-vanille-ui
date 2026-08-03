import { addIcon } from '@iconify/react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

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

describe('SelectLabel', () => {
    describe('rendering', () => {
        it('renders the label text inside a group', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Group>
                                <Select.Label>Tropical fruits</Select.Label>
                                <Select.Item value={'mango'} label={'Mango'} />
                            </Select.Group>
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(screen.getByText('Tropical fruits')).toBeTruthy()
        })

        it('renders multiple labels for different groups', async () => {
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
        })

        it('renders with a non-empty className by default', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Group>
                                <Select.Label>Group label</Select.Label>
                                <Select.Item value={'x'} label={'X'} />
                            </Select.Group>
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            const label = screen.getByText('Group label').closest('[class]') as HTMLElement
            expect(label.className.length).toBeGreaterThan(0)
        })
    })

    describe('custom className', () => {
        it('merges a custom className onto the label element', async () => {
            render(
                <Select>
                    <Select.Trigger />
                    <Select.Content>
                        <Select.List>
                            <Select.Group>
                                <Select.Label className={'my-label'}>My group</Select.Label>
                                <Select.Item value={'a'} label={'A'} />
                            </Select.Group>
                        </Select.List>
                    </Select.Content>
                </Select>,
            )
            await openSelect()
            expect(document.querySelector('.my-label')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Select.Label"', () => {
            expect(Select.Label.displayName).toBe('Select.Label')
        })
    })
})
