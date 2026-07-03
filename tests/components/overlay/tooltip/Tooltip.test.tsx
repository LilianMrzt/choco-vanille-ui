import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Tooltip } from '@components/overlay/tooltip'

describe('Tooltip', () => {
    it('renders the trigger child', () => {
        render(
            <Tooltip content={'Hint'}>
                <button type={'button'}>Hover me</button>
            </Tooltip>,
        )

        expect(screen.getByRole('button', { name: 'Hover me' })).toBeTruthy()
    })

    it('renders content when open is controlled', () => {
        render(
            <Tooltip content={'Hint'} open>
                <button type={'button'}>Hover me</button>
            </Tooltip>,
        )

        expect(screen.getByRole('tooltip').textContent).toBe('Hint')
    })

    it('does not render tooltip content when disabled', () => {
        render(
            <Tooltip content={'Hint'} disabled>
                <button type={'button'}>Hover me</button>
            </Tooltip>,
        )

        expect(screen.queryByRole('tooltip')).toBeNull()
    })

    it('calls onOpenChange on hover', async () => {
        const onOpenChange = vi.fn()
        render(
            <Tooltip content={'Hint'} onOpenChange={onOpenChange} delayDuration={0}>
                <button type={'button'}>Hover me</button>
            </Tooltip>,
        )

        await userEvent.hover(screen.getByRole('button', { name: 'Hover me' }))
        expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('applies a custom className to the content', () => {
        render(
            <Tooltip content={'Hint'} open className={'custom-tooltip'}>
                <button type={'button'}>Hover me</button>
            </Tooltip>,
        )

        const tooltip = document.querySelector('.custom-tooltip')
        expect(tooltip).not.toBeNull()
        expect(tooltip!.textContent).toContain('Hint')
    })

    it('has the expected display name', () => {
        expect(Tooltip.displayName).toBe('Tooltip')
    })
})
