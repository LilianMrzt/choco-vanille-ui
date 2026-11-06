import { useState, type SubmitEvent, type ReactElement } from 'react'

import { Button } from '@/components/actions/button'
import { Form } from '@/components/layout/form'
import type { FormProps } from '@components/layout/form'
import { TextField } from '@/components/forms/text-field'
import { Flex } from '@/components/layout/flex'

/**
 * Renders the Form Playground story.
 * @internal Not part of the public package API.
 * @param props - Native form props and the submit callback.
 * @returns An interactive form.
 * @example
 * <FormPlayground aria-label="Sign in" />
 */
const FormPlayground = (props: FormProps): ReactElement => {
    const [submitted, setSubmitted] = useState(false)

    /**
     * Prevents navigation, forwards the native event and displays confirmation.
     * @param event - Native form submit event.
     * @returns Nothing.
     */
    const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault()
        props.onSubmit?.(event)
        setSubmitted(true)
    }

    return (
        <Form
            {...props}
            onSubmit={handleSubmit}
        >
            <Flex
                flexDirection={'column'}
                gap={12}
                alignItems={'start'}
            >
                <TextField
                    label={'Email'}
                    name={'email'}
                    type={'email'}
                    placeholder={'you@example.com'}
                    autoComplete={'email'}
                />
                <TextField
                    label={'Password'}
                    name={'password'}
                    type={'password'}
                    autoComplete={'current-password'}
                />
                <Button
                    type={'submit'}
                    label={'Sign in'}
                />
                {submitted && (
                    <span
                        style={{ fontSize: '0.875rem', color: 'var(--color-primary-main)' }}
                    >
                        Form submitted!
                    </span>
                )}
            </Flex>
        </Form>
    )
}

export default FormPlayground
