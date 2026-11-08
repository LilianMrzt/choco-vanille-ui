import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { TextField, type TextFieldSize } from '@components/forms/text-field'
import { md } from '@stories/_shared/utils/markdown'
import consumerSource1 from '@stories/forms/text-field/sources/TextFieldUsage1.source.txt?raw'
import { fn } from 'storybook/test'

export const SIZES: TextFieldSize[] = ['sm', 'md', 'lg']
export const TYPES = ['text', 'email', 'password', 'number', 'search', 'url'] as const
export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute                 | Required    | Type      | Notes                                                                      |
| -------------------------------- | ----------- | --------- | -------------------------------------------------------------------------- |
| \`label\`                          | Recommended | \`string\`  | Visible label linked to the input via \`aria-labelledby\`.                  |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\`  | Required when \`label\` is omitted.                                          |
| \`error\`                          | No          | \`string\`  | Sets \`aria-invalid="true"\` and replaces helper text in \`aria-describedby\`. |
| \`helperText\`                     | No          | \`string\`  | Described by the input when no error is present.                           |
| \`disabled\`                       | No          | \`boolean\` | Native disabled state, announced by screen readers.                        |
| \`required\`                       | No          | \`boolean\` | Native required state for form validation.                                 |

- The underlying element is a native \`<input>\`, so it is fully keyboard operable.
- Do not rely on placeholder text alone as a label.
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<import('react').ComponentProps<typeof TextField>> = {
    label: { control: 'text',
        description: 'Sets the public label prop.'
    },
    placeholder: { control: 'text',
        description: 'Sets the public placeholder prop.'
    },
    startIcon: { control: 'select', options: ['none', 'search'], mapping: { none: undefined, search: SearchIcon },
        description: 'Sets the public startIcon prop.'
    },
    endAction: { control: false, description: 'React node; use composition to provide a custom action.' },
    onChange: { control: false,
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    value: { control: 'text',
        description: 'Sets the public value prop.'
    },
    defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
    helperText: { control: 'text',
        description: 'Sets the public helperText prop.'
    },
    error: { control: 'text',
        description: 'Sets the public error prop.'
    },
    width: { control: 'text',
        description: 'Sets the public width prop.'
    },
    size: { control: 'select', options: SIZES,
        description: 'Sets the public size prop.'
    },
    type: { control: 'select', options: TYPES,
        description: 'Sets the public type prop.'
    },
    disabled: { control: 'boolean',
        description: 'Sets the public disabled prop.'
    },
    required: { control: 'boolean',
        description: 'Sets the public required prop.'
    },
    showRequiredIndicator: { control: 'boolean',
        description: 'Sets the public showRequiredIndicator prop.'
    },
    'id': { control: 'text', description: 'Editable id forwarded to the rendered public component.' },
    'name': { control: 'text', description: 'Editable name forwarded to the rendered public component.' },
    'form': { control: 'text', description: 'Editable form forwarded to the rendered public component.' },
    'readOnly': { control: 'boolean', description: 'Editable readOnly forwarded to the rendered public component.' },
    'autoComplete': { control: 'text', description: 'Editable autoComplete forwarded to the rendered public component.' },
    'maxLength': { control: 'number', description: 'Editable maxLength forwarded to the rendered public component.' },
    'pattern': { control: 'text', description: 'Editable pattern forwarded to the rendered public component.' },
    'inputMode': { control: 'select', options: ['text','email','numeric','decimal','search','tel','url','none'], description: 'Editable inputMode forwarded to the rendered public component.' },
    'onBlur': { control: false, description: 'Supply a callback in code; Actions receives the full public event payload.' },
    'onFocus': { control: false, description: 'Supply a callback in code; Actions receives the full public event payload.' },
    'className': { control: 'text', description: 'Editable className forwarded to the rendered public component.' },
    'style': { control: 'object', description: 'Editable style forwarded to the rendered public component.' },
    'ref': { control: false, description: 'Ref target is not serializable; attach it in consumer code.' }
}
export const DEFAULT_ARGS = {
    label: 'Email address',
    placeholder: 'you@example.com',
    size: 'md',
    type: 'text',
    width: 'min(100%, 24rem)',
    required: true,
    showRequiredIndicator: true,
    value: '',
    onChange: fn(),
} satisfies Partial<import('react').ComponentProps<typeof TextField>>
export const DESCRIPTION = md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A styled text input built with a native \`<input>\` and selectable label text connected with \`aria-labelledby\`.

Supports controlled (\`value\` + \`onChange\`) and uncontrolled (\`defaultValue\`) modes, optional label, start icon, end action, helper text, inline error, password toggle and custom width.

~~~tsx
${consumerSource1}
~~~
        `
