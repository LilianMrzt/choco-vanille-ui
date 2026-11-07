import { TextArea, type TextAreaSize } from '@components/forms/text-area'
import { md } from '@stories/_shared/utils/markdown'
import consumerSource1 from '@stories/forms/text-area/sources/TextAreaUsage1.source.txt?raw'
import { fn } from 'storybook/test'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'

export const SIZES: TextAreaSize[] = ['sm', 'md', 'lg']
export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute                 | Required    | Type      | Notes                                                                      |
| -------------------------------- | ----------- | --------- | -------------------------------------------------------------------------- |
| \`label\`                          | Recommended | \`string\`  | Visible label linked to the textarea via \`aria-labelledby\`.                |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\`  | Required when \`label\` is omitted.                                          |
| \`error\`                          | No          | \`string\`  | Sets \`aria-invalid="true"\` and replaces helper text in \`aria-describedby\`. |
| \`helperText\`                     | No          | \`string\`  | Described by the textarea when no error is present.                        |
| \`disabled\`                       | No          | \`boolean\` | Native disabled state, announced by screen readers.                        |
| \`required\`                       | No          | \`boolean\` | Native required state for form validation.                                 |

- The underlying element is a native \`<textarea>\`, so it is fully keyboard operable.
- Do not rely on placeholder text alone as a label.
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<import('react').ComponentProps<typeof TextArea>> = {
    label: { control: 'text',
        description: 'Sets the public label prop.'
    },
    placeholder: { control: 'text',
        description: 'Sets the public placeholder prop.'
    },
    startIcon: { control: 'select', options: ['none', 'info'], mapping: { none: undefined, info: InfoIcon },
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
    rows: { control: 'number',
        description: 'Sets the public rows prop.'
    },
    minRows: { control: 'number',
        description: 'Sets the public minRows prop.'
    },
    maxRows: { control: 'number',
        description: 'Sets the public maxRows prop.'
    },
    size: { control: 'select', options: SIZES,
        description: 'Sets the public size prop.'
    },
    disabled: { control: 'boolean',
        description: 'Sets the public disabled prop.'
    },
    required: { control: 'boolean',
        description: 'Sets the public required prop.'
    },
    'id': { control: 'text', description: 'Editable id forwarded to the rendered public component.' },
    'name': { control: 'text', description: 'Editable name forwarded to the rendered public component.' },
    'form': { control: 'text', description: 'Editable form forwarded to the rendered public component.' },
    'readOnly': { control: 'boolean', description: 'Editable readOnly forwarded to the rendered public component.' },
    'autoComplete': { control: 'text', description: 'Editable autoComplete forwarded to the rendered public component.' },
    'maxLength': { control: 'number', description: 'Editable maxLength forwarded to the rendered public component.' },
    'onBlur': { control: false, description: 'Supply a callback in code; Actions receives the full public event payload.' },
    'onFocus': { control: false, description: 'Supply a callback in code; Actions receives the full public event payload.' },
    'className': { control: 'text', description: 'Editable className forwarded to the rendered public component.' },
    'style': { control: 'object', description: 'Editable style forwarded to the rendered public component.' },
    'ref': { control: false, description: 'Ref target is not serializable; attach it in consumer code.' }
}
export const DEFAULT_ARGS = {
    label: 'Description',
    placeholder: 'Tell us more...',
    size: 'md',
    rows: 4,
    minRows: 2,
    maxRows: 6,
    width: 'min(100%, 24rem)',
    value: '',
    onChange: fn(),
} satisfies Partial<import('react').ComponentProps<typeof TextArea>>
export const DESCRIPTION = md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A styled textarea built with a native \`<textarea>\` and selectable label text connected with \`aria-labelledby\`.

Supports controlled (\`value\` + \`onChange\`) and uncontrolled (\`defaultValue\`) modes, optional label, start icon, end action, helper text, inline error, custom width and native \`rows\`.

~~~tsx
${consumerSource1}
~~~
                `
