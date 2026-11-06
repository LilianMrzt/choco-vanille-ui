import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '@components/actions/button'
import { BottomSheet } from '@components/overlay/bottom-sheet'
import { BOTTOM_SHEET_CLOSE_STYLES } from '@components/overlay/bottom-sheet/components/bottom-sheet-close/BottomSheetClose.css.ts'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'

const ControlledRadioGroup = ({ onValueChange }: { onValueChange: (value: unknown) => void }) => {
    const [value, setValue] = useState<unknown>('light')

    return (
        <BottomSheet defaultOpen>
            <BottomSheet.Content>
                <BottomSheet.RadioGroup
                    aria-label="Theme"
                    onValueChange={(nextValue) => {
                        setValue(nextValue)
                        onValueChange(nextValue)
                    }}
                    value={value}
                >
                    <BottomSheet.RadioItem
                        label="Light"
                        value="light"
                    />
                    <BottomSheet.RadioItem
                        label="Dark"
                        value="dark"
                    />
                </BottomSheet.RadioGroup>
            </BottomSheet.Content>
        </BottomSheet>
    )
}

describe('BottomSheet', () => {
    describe('compound components', () => {
        it('exposes all sub-components', () => {
            expect(BottomSheet.Trigger).toBeDefined()
            expect(BottomSheet.Content).toBeDefined()
            expect(BottomSheet.Header).toBeDefined()
            expect(BottomSheet.Item).toBeDefined()
            expect(BottomSheet.RadioGroup).toBeDefined()
            expect(BottomSheet.RadioItem).toBeDefined()
            expect(BottomSheet.Separator).toBeDefined()
            expect(BottomSheet.Close).toBeDefined()
        })

        it('sets display names', () => {
            expect(BottomSheet.displayName).toBe('BottomSheet')
            expect(BottomSheet.Content.displayName).toBe('BottomSheet.Content')
            expect(BottomSheet.Item.displayName).toBe('BottomSheet.Item')
            expect(BottomSheet.RadioItem.displayName).toBe('BottomSheet.RadioItem')
        })
    })

    describe('Content', () => {
        it('renders a dialog with a drag handle', () => {
            render(
                <BottomSheet defaultOpen>
                    <BottomSheet.Content>
                        <BottomSheet.Item label="Share" />
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            const dialog = screen.getByRole('dialog')
            expect(dialog.querySelector('div[aria-hidden="true"]')).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Share' })).toBeTruthy()
        })

        it('hides the drag handle when showHandle is false', () => {
            render(
                <BottomSheet defaultOpen>
                    <BottomSheet.Content showHandle={false}>
                        <BottomSheet.Item label="Share" />
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            expect(screen.getByRole('dialog').querySelector('div[aria-hidden="true"]')).toBeNull()
        })

        it('falls back to defaultAriaLabel for the accessible name', () => {
            render(
                <BottomSheet defaultOpen>
                    <BottomSheet.Content defaultAriaLabel="Actions">
                        <BottomSheet.Item label="Share" />
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            expect(screen.getByRole('dialog', { name: 'Actions' })).toBeTruthy()
        })

        it('is labelled and described by the Header', () => {
            render(
                <BottomSheet defaultOpen>
                    <BottomSheet.Content>
                        <BottomSheet.Header
                            description="Choose the appearance"
                            title="Theme"
                        />
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            const dialog = screen.getByRole('dialog', { name: 'Theme' })
            expect(screen.getByRole('heading', { name: 'Theme' })).toBeTruthy()
            expect(dialog.getAttribute('aria-describedby')).toBe(
                screen.getByText('Choose the appearance').id,
            )
        })
    })

    describe('interactions', () => {
        it('opens when the trigger is clicked', async () => {
            render(
                <BottomSheet>
                    <BottomSheet.Trigger>
                        <Button label="Open" />
                    </BottomSheet.Trigger>
                    <BottomSheet.Content>
                        <BottomSheet.Item label="Share" />
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            expect(screen.queryByRole('dialog')).toBeNull()

            await userEvent.click(screen.getByRole('button', { name: 'Open' }))

            expect(screen.getByRole('dialog')).toBeTruthy()
        })

        it('calls onClick and closes when an item is activated', async () => {
            const onClick = vi.fn()
            const onOpenChange = vi.fn()

            render(
                <BottomSheet
                    defaultOpen
                    onOpenChange={onOpenChange}
                >
                    <BottomSheet.Content>
                        <BottomSheet.Item
                            label="Share"
                            onClick={onClick}
                        />
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            await userEvent.click(screen.getByRole('button', { name: 'Share' }))

            expect(onClick).toHaveBeenCalledTimes(1)
            expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
            await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
        })

        it('keeps the sheet open when closeOnClick is false', async () => {
            const onClick = vi.fn()
            const onOpenChange = vi.fn()

            render(
                <BottomSheet
                    defaultOpen
                    onOpenChange={onOpenChange}
                >
                    <BottomSheet.Content>
                        <BottomSheet.Item
                            closeOnClick={false}
                            label="Share"
                            onClick={onClick}
                        />
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            await userEvent.click(screen.getByRole('button', { name: 'Share' }))

            expect(onClick).toHaveBeenCalledTimes(1)
            expect(onOpenChange).not.toHaveBeenCalled()
            expect(screen.getByRole('dialog')).toBeTruthy()
        })

        it('does not call onClick on a disabled item', async () => {
            const onClick = vi.fn()

            render(
                <BottomSheet defaultOpen>
                    <BottomSheet.Content>
                        <BottomSheet.Item
                            disabled
                            label="Share"
                            onClick={onClick}
                        />
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            await userEvent.click(screen.getByRole('button', { name: 'Share' }))

            expect(onClick).not.toHaveBeenCalled()
        })

        it('closes through BottomSheet.Close', async () => {
            const onOpenChange = vi.fn()

            render(
                <BottomSheet
                    defaultOpen
                    onOpenChange={onOpenChange}
                >
                    <BottomSheet.Content>
                        <BottomSheet.Close>
                            <Button label="Cancel" />
                        </BottomSheet.Close>
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

            expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
        })

        it('merges the spacing class with the close element classes', () => {
            render(
                <BottomSheet defaultOpen>
                    <BottomSheet.Content>
                        <BottomSheet.Close className="custom-close">
                            <Button label="Cancel" className="own-class" />
                        </BottomSheet.Close>
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            const { classList } = screen.getByRole('button', { name: 'Cancel' })

            expect(classList.contains(BOTTOM_SHEET_CLOSE_STYLES.root)).toBe(true)
            expect(classList.contains('custom-close')).toBe(true)
            expect(classList.contains('own-class')).toBe(true)
        })

        it('closes on Escape', async () => {
            const onOpenChange = vi.fn()

            render(
                <BottomSheet
                    defaultOpen
                    onOpenChange={onOpenChange}
                >
                    <BottomSheet.Content>
                        <BottomSheet.Item label="Share" />
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            await userEvent.keyboard('{Escape}')

            expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
        })
    })

    describe('Item', () => {
        it('renders a native button with icons', () => {
            render(
                <BottomSheet defaultOpen>
                    <BottomSheet.Content>
                        <BottomSheet.Item
                            destructive
                            endIcon={CheckIcon}
                            label="Delete"
                            startIcon={TrashIcon}
                        />
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            const item = screen.getByRole('button', { name: 'Delete' })
            expect(item.tagName).toBe('BUTTON')
            expect(item.getAttribute('type')).toBe('button')
            expect(item.querySelectorAll('svg')).toHaveLength(2)
        })
    })

    describe('RadioGroup', () => {
        it('renders a named radio group with the selected option checked', () => {
            render(<ControlledRadioGroup onValueChange={vi.fn()} />)

            expect(screen.getByRole('radiogroup', { name: 'Theme' })).toBeTruthy()
            expect(screen.getByRole('radio', { name: 'Light' }).getAttribute('aria-checked')).toBe('true')
            expect(screen.getByRole('radio', { name: 'Dark' }).getAttribute('aria-checked')).toBe('false')
        })

        it('forwards value changes with their event details', async () => {
            const onValueChange = vi.fn()

            render(
                <BottomSheet defaultOpen>
                    <BottomSheet.Content>
                        <BottomSheet.RadioGroup
                            aria-label="Theme"
                            onValueChange={onValueChange}
                        >
                            <BottomSheet.RadioItem
                                label="Dark"
                                value="dark"
                            />
                        </BottomSheet.RadioGroup>
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            await userEvent.click(screen.getByRole('radio', { name: 'Dark' }))

            expect(onValueChange).toHaveBeenCalledWith('dark', expect.anything())
        })

        it('updates the checked option on selection', async () => {
            const onValueChange = vi.fn()

            render(<ControlledRadioGroup onValueChange={onValueChange} />)

            await userEvent.click(screen.getByRole('radio', { name: 'Dark' }))

            expect(onValueChange).toHaveBeenCalledWith('dark')
            expect(screen.getByRole('radio', { name: 'Dark' }).getAttribute('aria-checked')).toBe('true')
        })
    })

    describe('Separator', () => {
        it('renders a separator', () => {
            render(
                <BottomSheet defaultOpen>
                    <BottomSheet.Content>
                        <BottomSheet.Item label="Share" />
                        <BottomSheet.Separator />
                        <BottomSheet.Item label="Delete" />
                    </BottomSheet.Content>
                </BottomSheet>,
            )

            expect(screen.getByRole('separator')).toBeTruthy()
        })
    })
})
