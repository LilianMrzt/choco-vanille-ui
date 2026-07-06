import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '@components/actions/button'
import { Dialog } from '@components/overlay/dialog/Dialog.tsx'

describe('Dialog', () => {
    describe('compound components', () => {
        it('exposes all sub-components', () => {
            expect(Dialog.Trigger).toBeDefined()
            expect(Dialog.Content).toBeDefined()
            expect(Dialog.Header).toBeDefined()
            expect(Dialog.Body).toBeDefined()
            expect(Dialog.Footer).toBeDefined()
            expect(Dialog.Title).toBeDefined()
            expect(Dialog.Description).toBeDefined()
            expect(Dialog.Close).toBeDefined()
        })
    })

    describe('default rendering', () => {
        it('renders a dialog with Header, Body and Footer', () => {
            render(
                <Dialog defaultOpen>
                    <Dialog.Content>
                        <Dialog.Header title="Title" description="Description" />
                        <Dialog.Body>Body content</Dialog.Body>
                        <Dialog.Footer>Footer content</Dialog.Footer>
                    </Dialog.Content>
                </Dialog>,
            )

            expect(screen.getByText('Title')).toBeTruthy()
            expect(screen.getByText('Description')).toBeTruthy()
            expect(screen.getByText('Body content')).toBeTruthy()
            expect(screen.getByText('Footer content')).toBeTruthy()
        })

        it('renders a close button by default in the header', () => {
            render(
                <Dialog defaultOpen>
                    <Dialog.Content>
                        <Dialog.Header title="Title" />
                    </Dialog.Content>
                </Dialog>,
            )

            expect(screen.getByLabelText('Close dialog')).toBeTruthy()
        })

        it('hides the close button when showCloseButton is false', () => {
            render(
                <Dialog defaultOpen>
                    <Dialog.Content>
                        <Dialog.Header title="Title" showCloseButton={false} />
                    </Dialog.Content>
                </Dialog>,
            )

            expect(screen.queryByLabelText('Close dialog')).toBeNull()
        })
    })

    describe('interactions', () => {
        it('opens the dialog when the trigger is clicked', async () => {
            render(
                <Dialog>
                    <Dialog.Trigger>
                        <Button label="Open" />
                    </Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Header title="Title" />
                    </Dialog.Content>
                </Dialog>,
            )

            expect(screen.queryByText('Title')).toBeNull()

            await userEvent.click(screen.getByText('Open'))

            expect(screen.getByText('Title')).toBeTruthy()
        })

        it('closes the dialog when the close button is clicked', async () => {
            render(
                <Dialog defaultOpen>
                    <Dialog.Content>
                        <Dialog.Header title="Title" />
                    </Dialog.Content>
                </Dialog>,
            )

            expect(screen.getByText('Title')).toBeTruthy()

            await userEvent.click(screen.getByLabelText('Close dialog'))

            expect(screen.queryByText('Title')).toBeNull()
        })

        it('calls onOpenChange when the dialog closes', async () => {
            const onOpenChange = vi.fn()

            render(
                <Dialog
                    defaultOpen
                    onOpenChange={onOpenChange}
                >
                    <Dialog.Content>
                        <Dialog.Header title="Title" />
                    </Dialog.Content>
                </Dialog>,
            )

            await userEvent.click(screen.getByLabelText('Close dialog'))

            expect(onOpenChange).toHaveBeenCalledWith(false)
        })
    })

    describe('displayName', () => {
        it('is set to "Dialog"', () => {
            expect(Dialog.displayName).toBe('Dialog')
        })
    })
})
