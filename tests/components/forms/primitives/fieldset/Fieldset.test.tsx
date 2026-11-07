import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Fieldset } from '@components/forms/primitives/fieldset'

describe('Fieldset', () => {
    describe('default rendering', () => {
        it('renders a <fieldset> element', () => {
            render(<Fieldset />)
            expect(document.querySelector('fieldset')).toBeTruthy()
        })

        it('renders children inside the fieldset', () => {
            render(
                <Fieldset>
                    <legend>Group label</legend>
                    <input type={'checkbox'} />
                </Fieldset>,
            )
            expect(screen.getByText('Group label')).toBeTruthy()
            expect(document.querySelector('input[type="checkbox"]')).toBeTruthy()
        })

        it('applies a non-empty className by default', () => {
            render(<Fieldset />)
            expect(document.querySelector('fieldset')!.className.length).toBeGreaterThan(0)
        })
    })

    describe('className prop', () => {
        it('merges a custom className with the base styles', () => {
            render(<Fieldset className={'my-fieldset'} />)
            expect(document.querySelector('fieldset')!.className).toContain('my-fieldset')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards the disabled attribute', () => {
            render(<Fieldset disabled />)
            expect((document.querySelector('fieldset') as HTMLFieldSetElement).disabled).toBe(true)
        })

        it('forwards the name attribute', () => {
            render(<Fieldset name={'preferences'} />)
            expect(document.querySelector('fieldset')!.getAttribute('name')).toBe('preferences')
        })

        it('forwards data-* attributes', () => {
            render(<Fieldset data-testid={'my-fieldset'} />)
            expect(screen.getByTestId('my-fieldset').tagName.toLowerCase()).toBe('fieldset')
        })

        it('forwards aria-* attributes', () => {
            render(<Fieldset aria-describedby={'helper-id'} />)
            expect(document.querySelector('fieldset')!.getAttribute('aria-describedby')).toBe('helper-id')
        })
    })

    describe('form prop', () => {
        it('forwards the form attribute linking fieldset to a form', () => {
            render(
                <>
                    <form id={'my-form'} />
                    <Fieldset form={'my-form'} />
                </>,
            )
            expect(document.querySelector('fieldset')!.getAttribute('form')).toBe('my-form')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the <fieldset> element', () => {
            const ref = createRef<HTMLFieldSetElement>()
            render(<Fieldset ref={ref} />)
            expect(ref.current).not.toBeNull()
            expect(ref.current!.tagName.toLowerCase()).toBe('fieldset')
        })
    })

    describe('displayName', () => {
        it('is set to "Fieldset"', () => {
            expect(Fieldset.displayName).toBe('Fieldset')
        })
    })
})
