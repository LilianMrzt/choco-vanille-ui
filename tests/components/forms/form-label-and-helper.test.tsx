import { render, screen } from '@testing-library/react'
import { act } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { describe, expect, expectTypeOf, it } from 'vitest'

import { AutocompleteField, Checkbox, CheckboxGroup, DatePicker, FormLabel, HelperText, NumberField, RadioGroup, SelectField, Slider, TextArea, TextField, type AutocompleteFieldProps, type DatePickerProps, type FormLabelProps, type LegendProps, type NumberFieldProps, type SelectFieldProps, type TextAreaProps, type TextFieldProps, type TimePickerProps } from '@/index'
import type { AutocompleteInputProps } from '@components/forms/autocomplete/components/autocomplete-input/types/AutocompleteInput.props.ts'
import type { SelectTriggerProps } from '@components/forms/select/components/select-trigger/types/SelectTrigger.props.ts'
import { FORM_LABEL_STYLES } from '@components/forms/primitives/form-label/styles/FormLabel.css.ts'

describe('Form labels and supporting text', () => {
    it('exports the shared primitives with a consistent default label size', () => {
        render(<><FormLabel>Label</FormLabel><HelperText>Hint</HelperText></>)

        expect(screen.getByText('Label').className).toBe(FORM_LABEL_STYLES.root)
        expect(screen.getByRole('status').textContent).toBe('Hint')
    })

    it.each([
        ['text field', <TextField label={'Field'} style={{ fontSize: '20px' }} helperText={'Hint'} aria-describedby={'external'} />],
        ['text area', <TextArea label={'Field'} style={{ fontSize: '20px' }} helperText={'Hint'} aria-describedby={'external'} />],
    ])('preserves %s style overrides and combines descriptions', (_name, field) => {
        render(<><span id={'external'}>External</span>{field}</>)

        const input = screen.getByRole('textbox', { name: 'Field' })
        const hint = screen.getByText('Hint')
        expect(screen.getByText('Field').className).toBe(FORM_LABEL_STYLES.root)
        expect(input.style.fontSize).toBe('20px')
        expect(input.getAttribute('aria-describedby')?.split(' ')).toEqual(['external', hint.id])
    })

    it.each([
        ['number', <NumberField label={'Field'} />],
        ['date', <DatePicker label={'Field'} />],
        ['select', <SelectField label={'Field'} options={[]} />],
        ['autocomplete', <AutocompleteField label={'Field'} options={[]} />],
    ])('uses the shared label for %s', (_name, field) => {
        render(field)
        expect(screen.getByText('Field').className).toBe(FORM_LABEL_STYLES.root)
    })

    it('does not expose fontSize on form contracts', () => {
        expectTypeOf<'fontSize'>().not.toMatchTypeOf<keyof FormLabelProps>()
        expectTypeOf<'fontSize'>().not.toMatchTypeOf<keyof LegendProps>()
        expectTypeOf<'fontSize'>().not.toMatchTypeOf<keyof TextFieldProps>()
        expectTypeOf<'fontSize'>().not.toMatchTypeOf<keyof TextAreaProps>()
        expectTypeOf<'fontSize'>().not.toMatchTypeOf<keyof NumberFieldProps>()
        expectTypeOf<'fontSize'>().not.toMatchTypeOf<keyof DatePickerProps>()
        expectTypeOf<'fontSize'>().not.toMatchTypeOf<keyof TimePickerProps>()
        expectTypeOf<'fontSize'>().not.toMatchTypeOf<keyof SelectFieldProps>()
        expectTypeOf<'fontSize'>().not.toMatchTypeOf<keyof SelectTriggerProps>()
        expectTypeOf<'fontSize'>().not.toMatchTypeOf<keyof AutocompleteFieldProps>()
        expectTypeOf<'fontSize'>().not.toMatchTypeOf<keyof AutocompleteInputProps>()
    })

    it('aligns checkbox and label and associates error text without losing other descriptions', () => {
        render(<><span id={'external'}>External</span><Checkbox label={'Accept'} helperText={'Hint'} error={'Required'} aria-describedby={'external'} /></>)

        const checkbox = screen.getByRole('checkbox', { name: 'Accept' })
        const label = screen.getByText('Accept')
        expect(checkbox.parentElement).toBe(label.parentElement)
        expect(checkbox.parentElement?.style.alignItems).toBe('center')
        expect(checkbox.getAttribute('aria-invalid')).toBe('true')
        expect(checkbox.getAttribute('aria-describedby')?.split(' ')).toEqual(['external', screen.getByRole('alert').id])
        expect(screen.queryByText('Hint')).toBeNull()
    })

    it('associates labels and supporting text with a group and its radio item', () => {
        render(
            <RadioGroup label={'Preference'} helperText={'Select one'}>
                <RadioGroup.Item value={'a'} label={'Option'} helperText={'Item hint'} />
            </RadioGroup>,
        )

        const group = screen.getByRole('radiogroup', { name: 'Preference' })
        const radio = screen.getByRole('radio', { name: 'Option' })
        expect(group.getAttribute('aria-describedby')).toBe(screen.getByText('Select one').id)
        expect(radio.getAttribute('aria-describedby')).toBe(screen.getByText('Item hint').id)
    })

    it('associates checkbox group errors and retains additional descriptions', () => {
        render(
            <CheckboxGroup label={'Channels'} error={'Choose a channel'} aria-describedby={'external'} data-testid={'group'}>
                <CheckboxGroup.Item value={'email'} label={'Email'} />
            </CheckboxGroup>,
        )

        const group = screen.getByTestId('group')
        expect(group.getAttribute('aria-labelledby')).toBe(screen.getByText('Channels').id)
        expect(group.getAttribute('aria-describedby')?.split(' ')).toEqual(['external', screen.getByRole('alert').id])
        expect(group.getAttribute('aria-invalid')).toBe('true')
    })

    it('associates shared error text and additional descriptions with every slider thumb', () => {
        render(<Slider label={'Range'} defaultValue={[20, 80]} error={'Invalid'} aria-describedby={'external'} />)

        const alert = screen.getByRole('alert')
        for (const thumb of screen.getAllByRole('slider')) {
            expect(thumb.getAttribute('aria-describedby')?.split(' ')).toEqual(['external', alert.id])
        }
    })

    it('preserves generated label and description IDs during hydration', async () => {
        const element = <CheckboxGroup label={'Options'} helperText={'Choose one'}><CheckboxGroup.Item value={'a'} label={'A'} helperText={'First option'} /></CheckboxGroup>
        const container = document.createElement('div')
        container.innerHTML = renderToString(element)
        document.body.appendChild(container)

        let root: ReturnType<typeof hydrateRoot> | undefined
        await act(async () => { root = hydrateRoot(container, element) })

        const checkbox = screen.getByRole('checkbox', { name: 'A' })
        expect(checkbox.getAttribute('aria-describedby')).toBe(screen.getByText('First option').id)
        expect(screen.getByText('Options').id).toBe(container.firstElementChild?.getAttribute('aria-labelledby'))

        await act(async () => { root?.unmount() })
        container.remove()
    })
})
