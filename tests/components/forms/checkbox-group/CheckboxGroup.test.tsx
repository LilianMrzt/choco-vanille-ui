import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StrictMode, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from '@components/forms/checkbox'
import { CheckboxGroup } from '@components/forms/checkbox-group'

const renderGroup = (defaultValue?: string[], disabled?: boolean) =>
    render(
        <CheckboxGroup defaultValue={defaultValue} disabled={disabled} aria-label={'Test group'}>
            <CheckboxGroup.Item value={'email'} label={'Email'} />
            <CheckboxGroup.Item value={'sms'} label={'SMS'} />
            <CheckboxGroup.Item value={'push'} label={'Push'} />
        </CheckboxGroup>,
    )

describe('CheckboxGroup', () => {
    const allValues = ['email', 'sms', 'push']

    it('renders all checkbox items', () => {
        renderGroup()
        expect(screen.getAllByRole('checkbox')).toHaveLength(3)
    })

    it('coordinates a parent with values rendered through wrappers', async () => {
        render(
            <CheckboxGroup allValues={['email', 'sms']} defaultValue={['email']} aria-label={'Test group'}>
                <CheckboxGroup.Header label={'All notifications'} />
                <div><CheckboxGroup.Item value={'email'} label={'Email'} /></div>
                <div><CheckboxGroup.Item value={'sms'} label={'SMS'} /></div>
            </CheckboxGroup>,
        )

        const header = screen.getByRole('checkbox', { name: 'All notifications' })
        expect(header.getAttribute('data-indeterminate')).not.toBeNull()

        await userEvent.click(header)

        expect(screen.getByRole('checkbox', { name: 'Email' }).getAttribute('data-checked')).not.toBeNull()
        expect(screen.getByRole('checkbox', { name: 'SMS' }).getAttribute('data-checked')).not.toBeNull()
    })

    it('marks default values as checked', () => {
        renderGroup(['email', 'push'])
        expect(screen.getByRole('checkbox', { name: 'Email' }).getAttribute('data-checked')).not.toBeNull()
        expect(screen.getByRole('checkbox', { name: 'SMS' }).getAttribute('data-unchecked')).not.toBeNull()
        expect(screen.getByRole('checkbox', { name: 'Push' }).getAttribute('data-checked')).not.toBeNull()
    })

    it('calls onValueChange with all selected values', async () => {
        const handler = vi.fn()
        render(
            <CheckboxGroup defaultValue={['email']} onValueChange={handler} aria-label={'Test group'}>
                <CheckboxGroup.Item value={'email'} label={'Email'} />
                <CheckboxGroup.Item value={'sms'} label={'SMS'} />
            </CheckboxGroup>,
        )

        await userEvent.click(screen.getByRole('checkbox', { name: 'SMS' }))

        expect(handler).toHaveBeenCalledWith(['email', 'sms'], expect.anything())
    })

    it('checks and unchecks all items through the header', async () => {
        const handler = vi.fn()
        render(
            <CheckboxGroup
                allValues={allValues}
                defaultValue={['email']}
                onValueChange={handler}
                aria-label={'Test group'}
            >
                <CheckboxGroup.Header label={'All notifications'} />
                <CheckboxGroup.Item value={'email'} label={'Email'} />
                <CheckboxGroup.Item value={'sms'} label={'SMS'} />
                <CheckboxGroup.Item value={'push'} label={'Push'} />
            </CheckboxGroup>,
        )

        const header = screen.getByRole('checkbox', { name: 'All notifications' })
        expect(header.getAttribute('data-indeterminate')).not.toBeNull()

        await userEvent.click(header)
        expect(handler).toHaveBeenLastCalledWith(allValues, expect.anything())
        expect(screen.getByRole('checkbox', { name: 'All notifications' }).getAttribute('data-checked')).not.toBeNull()

        await userEvent.click(header)
        expect(handler).toHaveBeenLastCalledWith([], expect.anything())
    })

    it('goes directly from no selected children to all selected', async () => {
        const handler = vi.fn()
        render(
            <CheckboxGroup
                allValues={allValues}
                onValueChange={handler}
                aria-label={'Test group'}
            >
                <CheckboxGroup.Header label={'All notifications'} />
                <CheckboxGroup.Item value={'email'} label={'Email'} />
                <CheckboxGroup.Item value={'sms'} label={'SMS'} />
                <CheckboxGroup.Item value={'push'} label={'Push'} />
            </CheckboxGroup>,
        )

        const header = screen.getByRole('checkbox', { name: 'All notifications' })
        expect(header.getAttribute('data-indeterminate')).toBeNull()
        expect(header.getAttribute('data-unchecked')).not.toBeNull()

        await userEvent.click(header)

        expect(handler).toHaveBeenLastCalledWith(allValues, expect.anything())
        expect(header.getAttribute('data-indeterminate')).toBeNull()
        expect(header.getAttribute('data-checked')).not.toBeNull()
    })

    it('keeps the direct empty-to-all transition in controlled mode', async () => {
        const ControlledGroup = () => {
            const [value, setValue] = useState<string[]>([])

            return (
                <CheckboxGroup
                    allValues={allValues}
                    value={value}
                    onValueChange={setValue}
                    aria-label={'Test group'}
                >
                    <CheckboxGroup.Header label={'All notifications'} />
                    <CheckboxGroup.Item value={'email'} label={'Email'} />
                    <CheckboxGroup.Item value={'sms'} label={'SMS'} />
                    <CheckboxGroup.Item value={'push'} label={'Push'} />
                </CheckboxGroup>
            )
        }

        render(<ControlledGroup />)
        const header = screen.getByRole('checkbox', { name: 'All notifications' })

        await userEvent.click(header)

        expect(header.getAttribute('data-indeterminate')).toBeNull()
        expect(header.getAttribute('data-checked')).not.toBeNull()
    })

    it('moves from one child to all when the header is clicked once', async () => {
        const changes: string[][] = []
        const ControlledGroup = () => {
            const [value, setValue] = useState<string[]>([])

            return (
                <CheckboxGroup
                    allValues={allValues}
                    value={value}
                    onValueChange={(nextValue, details) => {
                        changes.push(nextValue)
                        setValue(nextValue)
                        return details
                    }}
                    aria-label={'Test group'}
                >
                    <CheckboxGroup.Header label={'All notifications'} />
                    <CheckboxGroup.Item value={'email'} label={'Email'} />
                    <CheckboxGroup.Item value={'sms'} label={'SMS'} />
                    <CheckboxGroup.Item value={'push'} label={'Push'} />
                </CheckboxGroup>
            )
        }

        render(<ControlledGroup />)
        await userEvent.click(screen.getByRole('checkbox', { name: 'Email' }))
        await userEvent.click(screen.getByRole('checkbox', { name: 'All notifications' }))

        expect(changes).toEqual([['email'], allValues])
        expect(screen.getByRole('checkbox', { name: 'All notifications' }).getAttribute('data-checked')).not.toBeNull()
    })

    it('disables all items when the group is disabled', () => {
        renderGroup(undefined, true)
        for (const checkbox of screen.getAllByRole('checkbox')) {
            expect(checkbox.getAttribute('aria-disabled')).toBe('true')
        }
    })

    it('exposes Checkbox as the Item slot', () => {
        expect(CheckboxGroup.Item.displayName).toBe('Checkbox')
        expect(CheckboxGroup.Header.displayName).toBe('CheckboxGroup.Header')
    })

    it('forwards a custom className to an item', () => {
        render(
            <CheckboxGroup aria-label={'Test group'}>
                <CheckboxGroup.Item value={'email'} className={'custom-checkbox'} aria-label={'Email'} />
            </CheckboxGroup>,
        )

        expect(screen.getByRole('checkbox').className).toContain('custom-checkbox')
    })

    it('preserves disabled selections when toggling the parent', async () => {
        render(
            <CheckboxGroup allValues={['email', 'sms']} defaultValue={['email']} aria-label={'Test group'}>
                <CheckboxGroup.Header label={'All'} />
                <CheckboxGroup.Item value={'email'} label={'Email'} disabled />
                <CheckboxGroup.Item value={'sms'} label={'SMS'} />
            </CheckboxGroup>,
        )
        await userEvent.click(screen.getByRole('checkbox', { name: 'All' }))
        await userEvent.click(screen.getByRole('checkbox', { name: 'All' }))
        expect(screen.getByRole('checkbox', { name: 'Email' }).getAttribute('aria-checked')).toBe('true')
        expect(screen.getByRole('checkbox', { name: 'SMS' }).getAttribute('aria-checked')).toBe('false')
    })

    it('preserves a disabled value supplied by a controlled parent', async () => {
        const handler = vi.fn()
        const group = (value: string[]) => (
            <CheckboxGroup allValues={['email', 'sms']} value={value} onValueChange={handler} aria-label={'Test group'}>
                <CheckboxGroup.Header label={'All'} />
                <CheckboxGroup.Item value={'email'} label={'Email'} disabled />
                <CheckboxGroup.Item value={'sms'} label={'SMS'} />
            </CheckboxGroup>
        )
        const { rerender } = render(group([]))
        rerender(group(['email']))
        await userEvent.click(screen.getByRole('checkbox', { name: 'All' }))
        expect(handler).toHaveBeenLastCalledWith(['email', 'sms'], expect.anything())
    })

    it('supports composed parent and item slots with accessible relationships', async () => {
        render(
            <CheckboxGroup allValues={['a', 'b']} defaultValue={['a']} aria-label={'Options'}>
                <Checkbox.Root parent aria-label={'All'} aria-controls={'extra'}><Checkbox.Indicator /></Checkbox.Root>
                <CheckboxGroup.Item.Root value={'a'} aria-label={'First'}><Checkbox.Indicator /></CheckboxGroup.Item.Root>
                <div><CheckboxGroup.Item.Root value={'b'} aria-label={'Second'} disabled><Checkbox.Indicator /></CheckboxGroup.Item.Root></div>
            </CheckboxGroup>,
        )
        const parent = screen.getByRole('checkbox', { name: 'All' })
        const first = screen.getByRole('checkbox', { name: 'First' })
        const second = screen.getByRole('checkbox', { name: 'Second' })
        expect(parent.getAttribute('aria-controls')?.split(' ')).toEqual(['extra', first.id, second.id])
        expect(parent.getAttribute('aria-checked')).toBe('mixed')
        await userEvent.click(parent)
        expect(first.getAttribute('aria-checked')).toBe('true')
        expect(second.getAttribute('aria-checked')).toBe('false')
    })

    it('updates parent relationships when items unmount under StrictMode', () => {
        const group = (showSecond: boolean) => (
            <StrictMode>
                <CheckboxGroup allValues={['a', 'b']} aria-label={'Options'}>
                    <CheckboxGroup.Header label={'All'} />
                    <CheckboxGroup.Item value={'a'} label={'First'} />
                    {showSecond && <CheckboxGroup.Item value={'b'} label={'Second'} />}
                </CheckboxGroup>
            </StrictMode>
        )
        const { rerender } = render(group(true))
        const header = screen.getByRole('checkbox', { name: 'All' })
        const firstId = screen.getByRole('checkbox', { name: 'First' }).id
        const secondId = screen.getByRole('checkbox', { name: 'Second' }).id
        expect(header.getAttribute('aria-controls')?.split(' ')).toEqual([firstId, secondId])

        rerender(group(false))

        expect(header.getAttribute('aria-controls')).toBe(firstId)
    })

    it('preserves selected values outside the parent scope', async () => {
        const handler = vi.fn()
        render(
            <CheckboxGroup allValues={['a']} defaultValue={['other']} onValueChange={handler} aria-label={'Options'}>
                <CheckboxGroup.Header label={'All'} />
                <CheckboxGroup.Item value={'a'} label={'First'} />
            </CheckboxGroup>,
        )
        await userEvent.click(screen.getByRole('checkbox', { name: 'All' }))
        expect(handler).toHaveBeenLastCalledWith(['a', 'other'], expect.anything())
    })

    it('respects cancellation of a group change', async () => {
        const handler = vi.fn((_value, details) => details.cancel())
        render(
            <CheckboxGroup onValueChange={handler} aria-label={'Test group'}>
                <CheckboxGroup.Item value={'email'} label={'Email'} />
            </CheckboxGroup>,
        )
        await userEvent.click(screen.getByRole('checkbox', { name: 'Email' }))
        expect(handler).toHaveBeenCalledTimes(1)
        expect(screen.getByRole('checkbox', { name: 'Email' }).getAttribute('aria-checked')).toBe('false')
    })

    it('allows cancellation from the parent checkbox callback', async () => {
        const onCheckedChange = vi.fn((_checked, details) => details.cancel())
        const onValueChange = vi.fn()
        render(
            <CheckboxGroup allValues={['email']} onValueChange={onValueChange} aria-label={'Test group'}>
                <CheckboxGroup.Header label={'All'} onCheckedChange={onCheckedChange} />
                <CheckboxGroup.Item value={'email'} label={'Email'} />
            </CheckboxGroup>,
        )
        await userEvent.click(screen.getByRole('checkbox', { name: 'All' }))
        expect(onCheckedChange).toHaveBeenCalledWith(true, expect.objectContaining({ cancel: expect.any(Function) }))
        expect(onValueChange).not.toHaveBeenCalled()
        expect(screen.getByRole('checkbox', { name: 'Email' }).getAttribute('aria-checked')).toBe('false')
    })

    it('respects cancellation by the group for a parent change', async () => {
        const handler = vi.fn((_value, details) => details.cancel())
        render(
            <CheckboxGroup allValues={['email']} onValueChange={handler} aria-label={'Test group'}>
                <CheckboxGroup.Header label={'All'} />
                <CheckboxGroup.Item value={'email'} label={'Email'} />
            </CheckboxGroup>,
        )
        await userEvent.click(screen.getByRole('checkbox', { name: 'All' }))
        expect(handler).toHaveBeenCalledWith(['email'], expect.anything())
        expect(screen.getByRole('checkbox', { name: 'Email' }).getAttribute('aria-checked')).toBe('false')
        expect(screen.getByRole('checkbox', { name: 'All' }).getAttribute('aria-checked')).toBe('false')
    })

    it('updates parent behavior when an item becomes disabled', async () => {
        const group = (disabled: boolean) => (
            <CheckboxGroup allValues={['email', 'sms']} defaultValue={['email']} aria-label={'Test group'}>
                <CheckboxGroup.Header label={'All'} />
                <CheckboxGroup.Item value={'email'} label={'Email'} disabled={disabled} />
                <CheckboxGroup.Item value={'sms'} label={'SMS'} />
            </CheckboxGroup>
        )
        const { rerender } = render(group(false))
        rerender(group(true))
        await userEvent.click(screen.getByRole('checkbox', { name: 'All' }))
        await userEvent.click(screen.getByRole('checkbox', { name: 'All' }))
        expect(screen.getByRole('checkbox', { name: 'Email' }).getAttribute('aria-checked')).toBe('true')
        expect(screen.getByRole('checkbox', { name: 'SMS' }).getAttribute('aria-checked')).toBe('false')
    })

    it('reports an invalid header composition', () => {
        expect(() => render(<CheckboxGroup.Header label={'All'} />)).toThrow('must be used inside CheckboxGroup')
        expect(() => render(<CheckboxGroup aria-label={'Options'}><CheckboxGroup.Header label={'All'} /></CheckboxGroup>)).toThrow('requires allValues')
    })
})
