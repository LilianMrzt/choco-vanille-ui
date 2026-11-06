import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Form from '@components/forms/form/Form.tsx'

describe('Form', () => {
    describe('default rendering', () => {
        it('renders a <form> element', () => {
            render(<Form />)
            expect(document.querySelector('form')).toBeTruthy()
        })

        it('renders children inside the form', () => {
            render(
                <Form>
                    <label htmlFor={'email'}>Email</label>
                    <input id={'email'} type={'email'} />
                    <button type={'submit'}>Send</button>
                </Form>,
            )
            expect(screen.getByLabelText('Email')).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Send' })).toBeTruthy()
        })

        it('applies a non-empty className by default', () => {
            render(<Form />)
            expect(document.querySelector('form')!.className.length).toBeGreaterThan(0)
        })
    })

    describe('className prop', () => {
        it('merges a custom className with the base styles', () => {
            render(<Form className={'my-form'} />)
            expect(document.querySelector('form')!.className).toContain('my-form')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(<Form data-testid={'my-form'} />)
            expect(screen.getByTestId('my-form').tagName.toLowerCase()).toBe('form')
        })

        it('forwards the noValidate attribute', () => {
            render(<Form noValidate />)
            expect((document.querySelector('form') as HTMLFormElement).noValidate).toBe(true)
        })

        it('forwards the method attribute', () => {
            render(<Form method={'post'} />)
            expect(document.querySelector('form')!.getAttribute('method')).toBe('post')
        })

        it('forwards the action attribute', () => {
            render(<Form action={'/submit'} />)
            expect(document.querySelector('form')!.getAttribute('action')).toBe('/submit')
        })

        it('forwards aria-label', () => {
            render(<Form aria-label={'Registration form'} />)
            expect(screen.getByRole('form', { name: 'Registration form' })).toBeTruthy()
        })
    })

    describe('submit callback', () => {
        it('fires onSubmit when the form is submitted', async () => {
            const handleSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
            render(
                <Form onSubmit={handleSubmit}>
                    <button type={'submit'}>Send</button>
                </Form>,
            )
            await userEvent.click(screen.getByRole('button', { name: 'Send' }))
            expect(handleSubmit).toHaveBeenCalledTimes(1)
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the <form> element', () => {
            const ref = createRef<HTMLFormElement>()
            render(<Form ref={ref} />)
            expect(ref.current).not.toBeNull()
            expect(ref.current!.tagName.toLowerCase()).toBe('form')
        })
    })

    describe('displayName', () => {
        it('is set to "Form"', () => {
            expect(Form.displayName).toBe('Form')
        })
    })
})
