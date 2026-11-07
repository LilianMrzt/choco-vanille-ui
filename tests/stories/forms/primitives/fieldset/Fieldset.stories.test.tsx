import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import FieldsetPlayground from '@stories/forms/primitives/fieldset/components/fieldset-playground/FieldsetPlayground'
import { createFieldsetSource } from '@stories/forms/primitives/fieldset/utils/create-fieldset-source/createFieldsetSource.utils'

describe('Fieldset stories', () => {
    it('forwards fieldset controls and keeps the radios interactive', async () => {
        const user = userEvent.setup()
        const { rerender } = render(<FieldsetPlayground legend="Plan" name="plans" />)
        const group = screen.getByRole('group', { name: 'Plan' })

        expect(group.getAttribute('name')).toBe('plans')
        await user.click(screen.getByRole('radio', { name: 'Pro' }))
        expect(screen.getByRole('radio', { name: 'Pro', checked: true })).toBeTruthy()

        rerender(<FieldsetPlayground disabled legend="Plan" name="plans" />)
        expect((group as HTMLFieldSetElement).disabled).toBe(true)
        expect(screen.getByRole('radio', { name: 'Pro' }).hasAttribute('data-disabled')).toBe(true)
        await user.click(screen.getByRole('radio', { name: 'Starter' }))
        expect(screen.getByRole('radio', { name: 'Pro', checked: true })).toBeTruthy()
    })

    it('generates source from current controls without leaking story-only props', () => {
        const source = createFieldsetSource('', {
            args: { legend: 'A "plan"', disabled: true, name: 'plans' },
        })

        expect(source).toContain('<Fieldset disabled name={"plans"}>')
        expect(source).toContain('<Legend>{"A \\"plan\\""}</Legend>')
        expect(source).not.toContain('legend=')
    })
})
