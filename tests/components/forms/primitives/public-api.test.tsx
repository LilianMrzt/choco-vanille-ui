import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    Fieldset,
    FIELDSET_STYLES,
    Form,
    FormLabel,
    FORM_LABEL_STYLES,
    FORM_STYLES,
    HelperText,
    Legend,
    LEGEND_STYLES,
} from '@/index'

describe('Form primitives public API', () => {
    it('exports the primitives and their existing style maps', () => {
        render(
            <Form aria-label={'Preferences'}>
                <Fieldset>
                    <Legend>Notifications</Legend>
                    <FormLabel>Channel</FormLabel>
                    <HelperText>Choose a channel</HelperText>
                </Fieldset>
            </Form>,
        )

        expect(screen.getByRole('form', { name: 'Preferences' }).className).toContain(FORM_STYLES.root)
        expect(screen.getByRole('group', { name: 'Notifications' }).className).toContain(FIELDSET_STYLES.root)
        expect(screen.getByText('Notifications').className).toContain(LEGEND_STYLES.root)
        expect(screen.getByText('Channel').className).toBe(FORM_LABEL_STYLES.root)
        expect(screen.getByText('Choose a channel')).toBeTruthy()
    })
})
