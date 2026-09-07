import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Switch } from '@components/forms/switch'

// Helpers

const getSwitch = () => screen.getByRole('switch') as HTMLButtonElement

// Suites

describe('Switch', () => {
    describe('default rendering', () => {
        it('renders a switch element', () => {
            render(<Switch />)
            expect(getSwitch()).toBeTruthy()
        })

        it('is unchecked by default', () => {
            render(<Switch />)
            expect(getSwitch().getAttribute('data-unchecked')).toBe('')
        })

        it('renders without a label when label prop is omitted', () => {
            const { container } = render(<Switch />)
            expect(container.querySelector('label')).toBeNull()
        })
    })

    describe('label', () => {
        it('renders plain text when label prop is provided', () => {
            render(<Switch label={'Airplane mode'} />)
            expect(screen.getByText('Airplane mode')).toBeTruthy()
            expect(screen.getByText('Airplane mode').tagName.toLowerCase()).toBe(
                'span',
            )
        })

        it('associates the label with the switch via aria-labelledby', () => {
            render(<Switch label={'Airplane mode'} />)
            const label = screen.getByText('Airplane mode') as HTMLLabelElement
            const switchControl = getSwitch()
            expect(switchControl.getAttribute('aria-labelledby')).toBe(label.id)
        })
    })

    describe('controlled checked state', () => {
        it('is checked when checked={true}', () => {
            render(<Switch checked onCheckedChange={() => undefined} />)
            expect(getSwitch().getAttribute('data-checked')).toBe('')
        })

        it('is unchecked when checked={false}', () => {
            render(<Switch checked={false} onCheckedChange={() => undefined} />)
            expect(getSwitch().getAttribute('data-unchecked')).toBe('')
        })
    })

    describe('uncontrolled checked state', () => {
        it('starts checked when defaultChecked is true', () => {
            render(<Switch defaultChecked />)
            expect(getSwitch().getAttribute('data-checked')).toBe('')
        })
    })

    describe('disabled state', () => {
        it('is disabled when disabled prop is passed', () => {
            render(<Switch disabled />)
            expect(getSwitch().getAttribute('aria-disabled')).toBe('true')
        })

        it('does not call onCheckedChange when disabled and clicked', async () => {
            const handler = vi.fn()
            render(<Switch disabled onCheckedChange={handler} />)
            await userEvent.click(getSwitch())
            expect(handler).not.toHaveBeenCalled()
        })
    })

    describe('interaction', () => {
        it('calls onCheckedChange when clicked', async () => {
            const handler = vi.fn()
            render(<Switch onCheckedChange={handler} />)
            await userEvent.click(getSwitch())
            expect(handler).toHaveBeenCalledTimes(1)
        })

        it('toggles checked state on click (uncontrolled)', async () => {
            render(<Switch />)
            expect(getSwitch().getAttribute('data-unchecked')).toBe('')
            await userEvent.click(getSwitch())
            expect(getSwitch().getAttribute('data-checked')).toBe('')
            await userEvent.click(getSwitch())
            expect(getSwitch().getAttribute('data-unchecked')).toBe('')
        })

        it('does not toggle when its label is clicked', async () => {
            render(<Switch label={'Airplane mode'} />)

            await userEvent.click(screen.getByText('Airplane mode'))

            expect(getSwitch().getAttribute('data-unchecked')).toBe('')
        })
    })

    describe('className passthrough', () => {
        it('merges a custom className onto the root', () => {
            render(<Switch className={'my-switch'} />)
            expect(getSwitch().className).toContain('my-switch')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(<Switch data-testid={'sw'} />)
            expect(screen.getByTestId('sw')).toBeTruthy()
        })

        it('forwards aria-label', () => {
            render(<Switch aria-label={'Enable notifications'} />)
            expect(
                screen.getByRole('switch', { name: 'Enable notifications' }),
            ).toBeTruthy()
        })
    })

    describe('size', () => {
        it('renders with md size by default', () => {
            render(<Switch data-testid={'sw'} />)
            const switchControl = screen.getByTestId('sw')
            expect(switchControl.className).toContain('md')
        })

        it('renders with sm size when size="sm"', () => {
            render(<Switch size={'sm'} data-testid={'sw'} />)
            const switchControl = screen.getByTestId('sw')
            expect(switchControl.className).toContain('sm')
        })

        it('renders with lg size when size="lg"', () => {
            render(<Switch size={'lg'} data-testid={'sw'} />)
            const switchControl = screen.getByTestId('sw')
            expect(switchControl.className).toContain('lg')
        })
    })

    describe('helperText', () => {
        it('renders helper text when provided', () => {
            render(<Switch helperText={'Toggle to enable notifications'} />)
            expect(screen.getByText('Toggle to enable notifications')).toBeTruthy()
        })

        it('does not render helper text when omitted', () => {
            const { container } = render(<Switch />)
            expect(container.querySelector('[role="status"]')).toBeNull()
        })

        it('associates the switch with helper text via aria-describedby', () => {
            render(<Switch label={'Notifications'} helperText={'Enable push notifications'} />)
            const switchControl = getSwitch()
            const helper = screen.getByText('Enable push notifications')
            expect(switchControl.getAttribute('aria-describedby')).toBe(helper.id)
        })
    })

    describe('error', () => {
        it('renders error message when provided', () => {
            render(<Switch error={'This setting is required'} />)
            expect(screen.getByText('This setting is required')).toBeTruthy()
        })

        it('hides helper text when error is provided', () => {
            render(<Switch helperText={'Helper'} error={'Error'} />)
            expect(screen.queryByText('Helper')).toBeNull()
            expect(screen.getByText('Error')).toBeTruthy()
        })

        it('marks the switch as aria-invalid when error is provided', () => {
            render(<Switch error={'Required'} />)
            expect(getSwitch().getAttribute('aria-invalid')).toBe('true')
        })

        it('applies error styling class to the switch root', () => {
            render(<Switch error={'Required'} data-testid={'sw'} />)
            const switchControl = screen.getByTestId('sw')
            expect(switchControl.className).toContain('error')
        })
    })

    describe('displayName', () => {
        it('is set to "Switch"', () => {
            expect(Switch.displayName).toBe('Switch')
        })
    })
})
