import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
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
})
