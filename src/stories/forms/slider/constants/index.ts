import { Slider, type SliderColor, type SliderSize } from '@components/forms/slider'
import { md } from '@stories/_shared/utils/markdown'
import consumerSource1 from '@stories/forms/slider/sources/SliderUsage1.source.txt?raw'
import { fn } from 'storybook/test'

export const SIZES: SliderSize[] = ['sm', 'md', 'lg']
export const COLORS: SliderColor[] = ['primary', 'secondary', 'danger']
export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | Conditional | \`string\` | Visible accessible name for the slider. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`error\` | No | \`string\` | Marks the slider invalid and connects the error text. |
| \`helperText\` | No | \`string\` | Describes the slider when no error is present. |

The underlying thumbs are keyboard-operable range inputs supplied by Base UI.
`
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<import('react').ComponentProps<typeof Slider>> = {
    label: { control: 'text',
        description: 'Sets the public label prop.'
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
    size: { control: 'select', options: SIZES,
        description: 'Sets the public size prop.'
    },
    color: { control: 'select', options: COLORS,
        description: 'Sets the public color prop.'
    },
    showValue: { control: 'boolean',
        description: 'Sets the public showValue prop.'
    },
    disabled: { control: 'boolean',
        description: 'Sets the public disabled prop.'
    },
    error: { control: 'text',
        description: 'Sets the public error prop.'
    },
    helperText: { control: 'text',
        description: 'Sets the public helperText prop.'
    },
    value: { control: 'number', description: 'Controlled single value. See Range for a two-thumb example.' },
    defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
    onValueChange: { control: false,
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    onValueCommitted: { control: false,
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    'width': { control: 'text', description: 'Editable width forwarded to the rendered public component.' },
    'name': { control: 'text', description: 'Editable name forwarded to the rendered public component.' },
    'orientation': { control: 'select', options: ['horizontal','vertical'], description: 'Editable orientation forwarded to the rendered public component.' },
    'largeStep': { control: 'number', description: 'Editable largeStep forwarded to the rendered public component.' },
    'minStepsBetweenValues': { control: 'number', description: 'Editable minStepsBetweenValues forwarded to the rendered public component.' },
    'thumbAlignment': { control: 'select', options: ['center','edge'], description: 'Editable thumbAlignment forwarded to the rendered public component.' },
    'format': { control: 'object', description: 'Editable format forwarded to the rendered public component.' },
    'locale': { control: 'text', description: 'Editable locale forwarded to the rendered public component.' },
    'className': { control: 'text', description: 'Editable className forwarded to the rendered public component.' },
    'ref': { control: false, description: 'Ref target is not serializable; attach it in consumer code.' }
}
export const DEFAULT_ARGS = {
    label: 'Volume',
    value: 40,
    onValueChange: fn(),
    onValueCommitted: fn(),
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    color: 'primary',
    showValue: true,
} satisfies Partial<import('react').ComponentProps<typeof Slider>>
export const DESCRIPTION = md /* language=markdown */ `
A keyboard-accessible single-value slider and range slider for form controls such as volume, price and filters.

~~~tsx
${consumerSource1}
~~~
                `
