import { type Meta } from '@storybook/react-vite'
import { type FieldsetPlaygroundArgs } from '@stories/forms/primitives/fieldset/types'

export const DEFAULT_ARGS = {
    legend: 'Choose a plan',
    disabled: false,
} satisfies NonNullable<Meta<FieldsetPlaygroundArgs>['args']>

export const ARG_TYPES = {
    legend: { control: 'text', description: 'Demonstration control for the Legend content.' },
    disabled: { control: 'boolean', description: 'Disables descendant controls.', table: { defaultValue: { summary: 'false' } } },
    name: { control: 'text', description: 'Native fieldset name.' },
    form: { control: 'text', description: 'ID of the associated form.' },
    className: { control: 'text', description: 'Additional fieldset class.' },
    style: { control: 'object', description: 'Native fieldset style overrides.' },
    children: { control: false, description: 'The example supplies a legend and radio group.' },
    ref: { control: false, description: 'Ref forwarded to the native fieldset.' },
} satisfies NonNullable<Meta<FieldsetPlaygroundArgs>['argTypes']>
export const DESCRIPTION = 'Groups related form controls using a native fieldset. Pair it with a Legend to name the group.'
export const ACCESSIBILITY_DESCRIPTION = '## Accessibility\n\n| Prop / Attribute | Required | Type | Notes |\n| --- | --- | --- | --- |\n| `Legend` | Yes | ReactNode | Names the group of related controls. |\n| `disabled` | No | boolean | Disables controls outside the first legend. |'
