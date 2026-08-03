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

describe('SelectSeparator', () => {
    describe('rendering', () => {
        it('renders a separator element between groups of items', async () => {
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
            expect(document.querySelector('[role="separator"]')).toBeTruthy()
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
            const separator = document.querySelector('[role="separator"]') as HTMLElement
            expect(separator.className.length).toBeGreaterThan(0)
        })

        it('does not interfere with item selection', async () => {
            const items = screen.queryAllByRole('option')
            expect(items).toHaveLength(0) // not open yet
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
