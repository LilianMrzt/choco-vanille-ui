import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import type { SwitchProps, SwitchSize } from '@components/forms/switch'

export const SIZES: SwitchSize[] = ['sm', 'md', 'lg']

export const DEFAULT_ARGS = {
    label: 'Airplane mode',
    checked: false,
    onCheckedChange: fn(),
} satisfies NonNullable<Meta<SwitchProps>['args']>

export const ARG_TYPES = {
    label: { control: 'text', description: 'Visible label and accessible name.' },
    'aria-label': { control: 'text', description: 'Accessible name when no visible label is provided.' },
    'aria-labelledby': { control: 'text', description: 'ID of an external accessible label.' },
    'aria-describedby': { control: 'text', description: 'Additional description IDs, combined with helper or error text.' },
    helperText: { control: 'text', description: 'Supporting text shown when no error is present.' },
    error: { control: 'text', description: 'Error message; marks the switch invalid.' },
    size: { control: 'select', options: SIZES, description: 'Size preset.', table: { defaultValue: { summary: 'md' } } },
    checked: { control: 'boolean', description: 'Controlled state; the playground synchronizes this value with Controls.' },
    defaultChecked: { control: 'boolean', description: 'Initial state in the uncontrolled story; changes remount the switch.' },
    onCheckedChange: { control: false, description: 'Receives the checked value and event details.' },
    disabled: { control: 'boolean', description: 'Disables interaction.' },
    readOnly: { control: 'boolean', description: 'Prevents changing the value.' },
    required: { control: 'boolean', description: 'Requires the switch in form validation.' },
    name: { control: 'text', description: 'Form field name.' },
    value: { control: 'text', description: 'Value submitted when checked; defaults to on.' },
    uncheckedValue: { control: 'text', description: 'Optional value submitted when unchecked.' },
    id: { control: 'text', description: 'ID used by the control.' },
    className: { control: false, description: 'Additional control class.' },
    style: { control: false, description: 'Control style or state-dependent style function.' },
    ref: { control: false, description: 'Ref to the visible switch element.' },
    inputRef: { control: false, description: 'Ref to the hidden form input.' },
    render: { control: false, description: 'Base UI render override; not editable in Controls.' },
} satisfies NonNullable<Meta<SwitchProps>['argTypes']>
