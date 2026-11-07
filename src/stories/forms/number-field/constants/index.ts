import {
    NumberField, type NumberFieldSize } from '@components/forms/number-field'
import { md } from '@stories/_shared/utils/markdown'
import { fn } from 'storybook/test'

export const SIZES: NumberFieldSize[] = ['sm', 'md', 'lg']
export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute                 | Required    | Type     | Notes                                                              |
| -------------------------------- | ----------- | -------- | ------------------------------------------------------------------ |
| \`label\`                          | Recommended | \`string\` | Visible label linked to the numeric input.                         |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Use when \`label\` is omitted.                                       |
| \`error\`                          | No          | \`string\` | Sets \`aria-invalid="true"\` and describes the input with the error. |
| \`min\` / \`max\`                    | No          | \`number\` | Native range validation and bounded stepper behavior.              |

The input is a native numeric control enhanced with keyboard and button increments.
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<import('react').ComponentProps<typeof NumberField>> = {
    label: { control: 'text',
        description: 'Sets the public label prop.'
    },
    helperText: { control: 'text',
        description: 'Sets the public helperText prop.'
    },
    error: { control: 'text',
        description: 'Sets the public error prop.'
    },
    size: { control: 'select', options: SIZES,
        description: 'Sets the public size prop.'
    },
    min: { control: 'number',
        description: 'Sets the public min prop.'
    },
    max: { control: 'number',
        description: 'Sets the public max prop.'
    },
    step: { control: 'number',
        description: 'Sets the public step prop.'
    },
    disabled: { control: 'boolean',
        description: 'Sets the public disabled prop.'
    },
    required: { control: 'boolean',
        description: 'Sets the public required prop.'
    },
    readOnly: { control: 'boolean',
        description: 'Sets the public readOnly prop.'
    },
    value: { control: 'number',
        description: 'Sets the public value prop.'
    },
    defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
    onValueChange: { control: false,
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    onValueCommitted: { control: false,
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    'width': { control: 'text', description: 'Editable width forwarded to the rendered public component.' },
    'name': { control: 'text', description: 'Editable name forwarded to the rendered public component.' },
    'form': { control: 'text', description: 'Editable form forwarded to the rendered public component.' },
    'id': { control: 'text', description: 'Editable id forwarded to the rendered public component.' },
    'allowOutOfRange': { control: 'boolean', description: 'Editable allowOutOfRange forwarded to the rendered public component.' },
    'allowWheelScrub': { control: 'boolean', description: 'Editable allowWheelScrub forwarded to the rendered public component.' },
    'largeStep': { control: 'number', description: 'Editable largeStep forwarded to the rendered public component.' },
    'smallStep': { control: 'number', description: 'Editable smallStep forwarded to the rendered public component.' },
    'snapOnStep': { control: 'boolean', description: 'Editable snapOnStep forwarded to the rendered public component.' },
    'format': { control: 'object', description: 'Editable format forwarded to the rendered public component.' },
    'locale': { control: 'text', description: 'Editable locale forwarded to the rendered public component.' },
    'className': { control: 'text', description: 'Editable className forwarded to the rendered public component.' },
    'ref': { control: false, description: 'Ref target is not serializable; attach it in consumer code.' }
}
export const DEFAULT_ARGS = {
    label: 'Quantity',
    value: 2,
    onValueChange: fn(),
    onValueCommitted: fn(),
    min: 0,
    max: 10,
    step: 1,
    size: 'md',
} satisfies Partial<import('react').ComponentProps<typeof NumberField>>
export const DESCRIPTION = md /* language=markdown */ `
A numeric field with min/max constraints, keyboard and button increments, and TextField-compatible helper and error messaging.
        `
