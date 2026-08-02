import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/actions/button'
import { Form } from '@/components/layout/form'
import { TextField } from '@/components/forms/text-field'
import { Flex } from '@/components/layout/flex'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

type FormPlaygroundArgs = ComponentProps<typeof Form>;

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`onSubmit\` | Conditional | \`function\` | Prevent the default action when handling submission in JavaScript. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Name the form when it has no visible heading. |
`

const FormDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<FormPlaygroundArgs> = {
    title: 'Layout/Form',
    component: Form,
    parameters: {
        layout: 'centered',
        docs: {
            page: FormDocsPage,
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A thin, unstyled wrapper around the native \`<form>\` element.

**When to use**

Use \`Form\` whenever you collect user input that will be submitted as a unit. It gives assistive technology a clear form boundary and provides a single place to wire submission, validation, and reset behavior.

- **Login, registration, and contact forms** — the whole page section is a form.
- **Search or filter bars** — even a single input benefits from the semantic \`<form>\` root.
- **Dialogs with inputs** — wrap dialog content in \`Form\` so the submit action is scoped.

**How to use**

\`Form\` forwards every native \`<form>\` attribute, so you can use it exactly like the HTML element. The component only removes default browser inconsistencies and sets the width to \`100\%\`.

~~~tsx
<Form
  onSubmit={(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // send data…
  }}
>
  <TextField label="Email" name="email" type="email" />
  <TextField label="Password" name="password" type="password" />
  <Button type="submit" label="Sign in" />
</Form>
~~~

        `,
            },
        },
    },
    argTypes: {
        onSubmit: { action: 'submitted', table: { disable: true } },
    },
    args: {},
    decorators: [
        (Story) => (
            <div style={{ width: '320px' }}>
                <Story />
            </div>
        ),
    ],
}

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'A simple sign-in form. Fill the fields and click **Sign in** (or press **Enter**) to trigger the submit handler.',
            },
            ...storySource(/* language=tsx */ `
<Form aria-label="Sign in form">
    <Flex flexDirection="column" gap="md" alignItems="start">
        <TextField label="Email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
        <TextField label="Password" name="password" type="password" autoComplete="current-password" />
        <Button type="submit" label="Sign in" />
    </Flex>
</Form>`),
        },
    },
    render: () => {
        const [submitted, setSubmitted] = useState(false)

        return (
            <Form
                aria-label={'Sign in form'}
                onSubmit={(event) => {
                    event.preventDefault()
                    setSubmitted(true)
                }}
            >
                <Flex
                    flexDirection={'column'}
                    gap={'md'}
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
                            style={{ fontSize: '0.875rem', color: 'var(--color-primary)' }}
                        >
                            Form submitted!
                        </span>
                    )}
                </Flex>
            </Form>
        )
    },
    play: async ({ canvasElement }) => {
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
    },
}
