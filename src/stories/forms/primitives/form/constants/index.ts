import { type Meta } from '@storybook/react-vite'
import { Form } from '@/components/forms/primitives/form'
import { md } from '@stories/_shared/utils/markdown'
import { fn } from 'storybook/test'

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`onSubmit\` | Conditional | \`function\` | Prevent the default action when handling submission in JavaScript. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Name the form when it has no visible heading. |
`

export const ARG_TYPES = {
    'aria-label': { control: 'text', description: 'Accessible name for the form landmark.' },
    name: { control: 'text', description: 'Native form name.' },
    noValidate: { control: 'boolean', description: 'Disable browser constraint validation.' },
    onSubmit: { control: false, description: 'Native submit event, observable in Actions.' },
    children: { control: false, description: 'The example supplies sign-in fields.' },
    ref: { control: false, description: 'Ref forwarded to the form element.' },
} satisfies NonNullable<Meta<typeof Form>['argTypes']>

export const DEFAULT_ARGS = {
    'aria-label': 'Sign in form',
    onSubmit: fn(),
} satisfies NonNullable<Meta<typeof Form>['args']>
export const DESCRIPTION = 'A native form wrapper that forwards attributes, events and its ref. Name the form when it needs to be exposed as a landmark.'
