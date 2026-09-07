import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from '@components/forms/checkbox'

// Helpers

const getCheckbox = () => screen.getByRole('checkbox') as HTMLButtonElement

// Suites

describe('Checkbox', () => {
    describe('default rendering', () => {
        it('renders a checkbox element', () => {
            render(<Checkbox />)
            expect(getCheckbox()).toBeTruthy()
        })

        it('is unchecked by default', () => {
            render(<Checkbox />)
            expect(getCheckbox().getAttribute('data-unchecked')).not.toBeNull()
        })

        it('renders without a label when label prop is omitted', () => {
            const { container } = render(<Checkbox />)
            expect(container.querySelector('label')).toBeNull()
        })
    })

    describe('label', () => {
        it('renders plain text when label prop is provided', () => {
            render(<Checkbox label={'Accept terms'} />)
            expect(screen.getByText('Accept terms')).toBeTruthy()
            expect(screen.getByText('Accept terms').tagName.toLowerCase()).toBe('span')
        })

        it('associates the label with the checkbox via aria-labelledby', () => {
            render(<Checkbox label={'Subscribe'} />)
            const label = screen.getByText('Subscribe') as HTMLLabelElement
            const checkbox = getCheckbox()
            expect(checkbox.getAttribute('aria-labelledby')).toBe(label.id)
        })
    })

    describe('controlled checked state', () => {
        it('is checked when checked={true}', () => {
            render(<Checkbox checked onCheckedChange={() => undefined} />)
            expect(getCheckbox().getAttribute('data-checked')).not.toBeNull()
        })

        it('is unchecked when checked={false}', () => {
            render(<Checkbox checked={false} onCheckedChange={() => undefined} />)
            expect(getCheckbox().getAttribute('data-unchecked')).not.toBeNull()
        })
    })

    describe('uncontrolled checked state', () => {
        it('starts checked when defaultChecked is true', () => {
            render(<Checkbox defaultChecked />)
            expect(getCheckbox().getAttribute('data-checked')).not.toBeNull()
        })
    })

    describe('disabled state', () => {
        it('is disabled when disabled prop is passed', () => {
            render(<Checkbox disabled />)
            expect(getCheckbox().getAttribute('aria-disabled')).toBe('true')
        })

        it('does not call onCheckedChange when disabled and clicked', async () => {
            const handler = vi.fn()
            render(<Checkbox disabled onCheckedChange={handler} />)
            await userEvent.click(getCheckbox())
            expect(handler).not.toHaveBeenCalled()
        })
    })

    describe('interaction', () => {
        it('calls onCheckedChange when clicked', async () => {
            const handler = vi.fn()
            render(<Checkbox onCheckedChange={handler} />)
            await userEvent.click(getCheckbox())
            expect(handler).toHaveBeenCalledTimes(1)
        })

        it('toggles checked state on click (uncontrolled)', async () => {
            render(<Checkbox />)
            expect(getCheckbox().getAttribute('data-unchecked')).not.toBeNull()
            await userEvent.click(getCheckbox())
            expect(getCheckbox().getAttribute('data-checked')).not.toBeNull()
            await userEvent.click(getCheckbox())
            expect(getCheckbox().getAttribute('data-unchecked')).not.toBeNull()
        })

        it('does not toggle when its label is clicked', async () => {
            render(<Checkbox label={'Accept terms'} />)

            await userEvent.click(screen.getByText('Accept terms'))

            expect(getCheckbox().getAttribute('data-unchecked')).not.toBeNull()
        })
    })

    describe('className passthrough', () => {
        it('merges a custom className onto the root', () => {
            render(<Checkbox className={'my-checkbox'} />)
            expect(getCheckbox().className).toContain('my-checkbox')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(<Checkbox data-testid={'chk'} />)
            expect(screen.getByTestId('chk')).toBeTruthy()
        })

        it('forwards aria-label', () => {
            render(<Checkbox aria-label={'Enable notifications'} />)
            expect(screen.getByRole('checkbox', { name: 'Enable notifications' })).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Checkbox"', () => {
            expect(Checkbox.displayName).toBe('Checkbox')
        })
    })
})
