import { HelperText } from '@components/forms/primitives/helper-text'

export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<import('react').ComponentProps<typeof HelperText>> = {
    children: { control: 'text',
        description: 'Sets the public children prop.'
    },
    hasError: { control: 'boolean',
        description: 'Sets the public hasError prop.'
    },
    role: { control: false,
        description: 'React composition or non-serializable value; provide it in consumer code.'
    },
    'aria-live': { control: 'select', options: ['off', 'polite', 'assertive'],
        description: "Sets the public 'aria-live' prop."
    },
    'id': { control: 'text', description: 'Editable id forwarded to the rendered public component.' }
}
export const DEFAULT_ARGS = { children: 'Use your work email.' } satisfies Partial<import('react').ComponentProps<typeof HelperText>>
export const DESCRIPTION = 'Supporting or error text for a form control. Give it an ID and reference it from the control with `aria-describedby`.'
export const ACCESSIBILITY_DESCRIPTION = `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| id | Yes | string | Reference this ID using the control's aria-describedby. |
| hasError | No | boolean | Uses an assertive alert instead of a polite status. |
`
