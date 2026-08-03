import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Tooltip, TooltipProvider } from '@components/overlay/tooltip'

// Suites

describe('TooltipProvider', () => {
    describe('default rendering', () => {
        it('renders its children', () => {
            render(
                <TooltipProvider>
                    <button type={'button'}>Trigger</button>
                </TooltipProvider>,
            )
            expect(
                screen.getByRole('button', { name: 'Trigger' }),
            ).toBeTruthy()
        })

        it('renders multiple children', () => {
            render(
                <TooltipProvider>
                    <button type={'button'}>First</button>
                    <button type={'button'}>Second</button>
                </TooltipProvider>,
            )
            expect(screen.getByRole('button', { name: 'First' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Second' })).toBeTruthy()
        })
    })

    describe('nested Tooltip integration', () => {
        it('a Tooltip inside a TooltipProvider renders its trigger', () => {
            render(
                <TooltipProvider>
                    <Tooltip content={'Hint'}>
                        <button type={'button'}>Hover me</button>
                    </Tooltip>
                </TooltipProvider>,
            )
            expect(
                screen.getByRole('button', { name: 'Hover me' }),
            ).toBeTruthy()
        })

        it('a Tooltip inside a TooltipProvider renders content when open={true}', () => {
            render(
                <TooltipProvider>
                    <Tooltip content={'Shared hint'} open>
                        <button type={'button'}>Hover me</button>
                    </Tooltip>
                </TooltipProvider>,
            )
            expect(screen.getByRole('tooltip').textContent).toBe('Shared hint')
        })

        it('calls onOpenChange when the trigger is hovered', async () => {
            const onOpenChange = vi.fn()
            render(
                <TooltipProvider delayDuration={0}>
                    <Tooltip
                        content={'Hint'}
                        delayDuration={0}
                        onOpenChange={onOpenChange}
                    >
                        <button type={'button'}>Hover me</button>
                    </Tooltip>
                </TooltipProvider>,
            )
            await userEvent.hover(
                screen.getByRole('button', { name: 'Hover me' }),
            )
            expect(onOpenChange).toHaveBeenCalledWith(true)
        })

        it('does not render tooltip content when Tooltip is disabled', () => {
            render(
                <TooltipProvider>
                    <Tooltip content={'Hint'} disabled>
                        <button type={'button'}>Hover me</button>
                    </Tooltip>
                </TooltipProvider>,
            )
            expect(screen.queryByRole('tooltip')).toBeNull()
        })
    })

    describe('props', () => {
        it('accepts delayDuration without throwing', () => {
            expect(() =>
                render(
                    <TooltipProvider delayDuration={200}>
                        <button type={'button'}>Child</button>
                    </TooltipProvider>,
                ),
            ).not.toThrow()
        })

        it('accepts skipDelayDuration without throwing', () => {
            expect(() =>
                render(
                    <TooltipProvider skipDelayDuration={100}>
                        <button type={'button'}>Child</button>
                    </TooltipProvider>,
                ),
            ).not.toThrow()
        })
    })

    describe('displayName', () => {
        it('is set to "TooltipProvider"', () => {
            expect(TooltipProvider.displayName).toBe('TooltipProvider')
        })
    })
})
