import { expect, userEvent, within } from 'storybook/test'
import { Form } from '@/components/forms/primitives/form'
import type { ComponentProps } from 'react'
import type { StoryContext } from '@storybook/react-vite'

/**
 * Exercises the Form Playground story.
 * @internal Not part of the public package API.
 * @param context - Storybook interaction context.
 * @param context.canvasElement - Story canvas containing the rendered example.
 * @returns A promise that resolves after the interaction.
 * @example
 * const story = { play: FormPlaygroundPlay }
 */
const FormPlaygroundPlay = async ({ canvasElement }: StoryContext<ComponentProps<typeof Form>>): Promise<void> => {
    const canvas = within(canvasElement)
    const form = canvas.getByRole('form')
    const email = canvas.getByLabelText('Email')
    const password = canvas.getByLabelText('Password')
    const submit = canvas.getByRole('button', { name: 'Sign in' })

    await expect(form).toBeInTheDocument()
    await userEvent.type(email, 'hello@example.com')
    await userEvent.type(password, 'secret')
    await userEvent.click(submit)
    await expect(canvas.getByText('Form submitted!')).toBeInTheDocument()
}

export default FormPlaygroundPlay
