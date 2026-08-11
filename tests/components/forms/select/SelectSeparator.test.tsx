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
            const separator = document.querySelector(
                '[role="separator"]',
            ) as HTMLElement
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
