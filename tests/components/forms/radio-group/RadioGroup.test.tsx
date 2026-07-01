import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { RadioGroup } from '@components/forms/radio-group'

// Helpers

const renderGroup = (defaultValue?: string, disabled?: boolean) =>
    render(
        <RadioGroup defaultValue={defaultValue} disabled={disabled} aria-label={'Test group'}>
            <RadioGroup.Item value={'a'} label={'Option A'} />
            <RadioGroup.Item value={'b'} label={'Option B'} />
            <RadioGroup.Item value={'c'} label={'Option C'} />
        </RadioGroup>,
    )

const isDisabled = (el: HTMLElement) => (el as HTMLButtonElement).disabled === true

// Suites

describe('RadioGroup', () => {
    describe('default rendering', () => {
        it('renders all radio items', () => {
            renderGroup()
            expect(screen.getAllByRole('radio')).toHaveLength(3)
        })

        it('no item is checked when no defaultValue is provided', () => {
            renderGroup()
            for (const radio of screen.getAllByRole('radio')) {
                expect(radio.getAttribute('data-state')).toBe('unchecked')
            }
        })
    })

    describe('displayNames', () => {
        it('RadioGroup displayName is "RadioGroup"', () => {
            expect(RadioGroup.displayName).toBe('RadioGroup')
        })

        it('RadioItem displayName is "RadioItem"', () => {
            expect(RadioGroup.Item.displayName).toBe('RadioItem')
        })
    })
})

describe('RadioItem', () => {
    describe('default rendering', () => {
        it('renders a radio button', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioGroup.Item value={'x'} />
                </RadioGroup>,
            )
            expect(screen.getByRole('radio')).toBeTruthy()
        })

        it('renders a label when label prop is provided', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioGroup.Item value={'x'} label={'My option'} />
                </RadioGroup>,
            )
            expect(screen.getByText('My option')).toBeTruthy()
            expect(screen.getByText('My option').tagName.toLowerCase()).toBe('label')
        })

        it('associates label with the radio via htmlFor / id', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioGroup.Item value={'x'} label={'My option'} />
                </RadioGroup>,
            )
            const label = screen.getByText('My option') as HTMLLabelElement
            const radio = screen.getByRole('radio') as HTMLElement
            expect(label.htmlFor).toBe(radio.id)
        })

        it('renders without label when label prop is omitted', () => {
            const { container } = render(
                <RadioGroup aria-label={'group'}>
                    <RadioGroup.Item value={'x'} aria-label={'Option x'} />
                </RadioGroup>,
            )
            expect(container.querySelector('label')).toBeNull()
        })
    })

    describe('controlled selection', () => {
        it('marks the correct item as checked via defaultValue', () => {
            renderGroup('b')
            expect(screen.getByRole('radio', { name: 'Option B' }).getAttribute('data-state')).toBe('checked')
            expect(screen.getByRole('radio', { name: 'Option A' }).getAttribute('data-state')).toBe('unchecked')
        })

        it('calls onValueChange when a different item is clicked', async () => {
            const handler = vi.fn()
            render(
                <RadioGroup defaultValue={'a'} onValueChange={handler} aria-label={'group'}>
                    <RadioGroup.Item value={'a'} label={'A'} />
                    <RadioGroup.Item value={'b'} label={'B'} />
                </RadioGroup>,
            )
            await userEvent.click(screen.getByRole('radio', { name: 'B' }))
            expect(handler).toHaveBeenCalledWith('b')
        })

        it('does not call onValueChange when clicking the already-selected item', async () => {
            const handler = vi.fn()
            render(
                <RadioGroup defaultValue={'a'} onValueChange={handler} aria-label={'group'}>
                    <RadioGroup.Item value={'a'} label={'A'} />
                    <RadioGroup.Item value={'b'} label={'B'} />
                </RadioGroup>,
            )
            await userEvent.click(screen.getByRole('radio', { name: 'A' }))
            expect(handler).not.toHaveBeenCalled()
        })
    })

    describe('disabled state', () => {
        it('disables all items when group is disabled', () => {
            renderGroup(undefined, true)
            for (const radio of screen.getAllByRole('radio')) {
                expect(isDisabled(radio)).toBe(true)
            }
        })

        it('disables only the targeted item', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioGroup.Item value={'a'} label={'A'} />
                    <RadioGroup.Item value={'b'} label={'B'} disabled />
                </RadioGroup>,
            )
            expect(isDisabled(screen.getByRole('radio', { name: 'A' }))).toBe(false)
            expect(isDisabled(screen.getByRole('radio', { name: 'B' }))).toBe(true)
        })

        it('does not call onValueChange when a disabled item is clicked', async () => {
            const handler = vi.fn()
            render(
                <RadioGroup onValueChange={handler} aria-label={'group'}>
                    <RadioGroup.Item value={'a'} label={'A'} disabled />
                </RadioGroup>,
            )
            await userEvent.click(screen.getByRole('radio', { name: 'A' }))
            expect(handler).not.toHaveBeenCalled()
        })
    })

    describe('className passthrough', () => {
        it('merges a custom className onto the radio item', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioGroup.Item value={'x'} className={'my-radio'} aria-label={'x'} />
                </RadioGroup>,
            )
            expect(screen.getByRole('radio').className).toContain('my-radio')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards aria-label', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioGroup.Item value={'x'} aria-label={'Custom label'} />
                </RadioGroup>,
            )
            expect(screen.getByRole('radio', { name: 'Custom label' })).toBeTruthy()
        })
    })
})
