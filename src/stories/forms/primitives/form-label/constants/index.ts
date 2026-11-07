import { FormLabel } from '@components/forms/primitives/form-label'

export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<import('react').ComponentProps<typeof FormLabel>> = {
    children: { control: 'text',
        description: 'Sets the public children prop.'
    },
    disabled: { control: 'boolean',
        description: 'Sets the public disabled prop.'
    },
    required: { control: 'boolean',
        description: 'Sets the public required prop.'
    },
    'id': { control: 'text', description: 'Editable id forwarded to the rendered public component.' },
    'className': { control: 'text', description: 'Editable className forwarded to the rendered public component.' },
    'style': { control: 'object', description: 'Editable style forwarded to the rendered public component.' }
}
export const DEFAULT_ARGS = { children: 'Email address', required: true } satisfies Partial<import('react').ComponentProps<typeof FormLabel>>
export const DESCRIPTION = 'Selectable form label text. Connect it to a control using `aria-labelledby`; set the required state on the control itself.'
export const ACCESSIBILITY_DESCRIPTION = `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| id | Yes | string | Reference this ID using the control's aria-labelledby. |
| required | No | boolean | Also set the control's required state. |
`
