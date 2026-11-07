import { type ComponentProps, type ReactElement } from 'react'
import { TimePicker } from '@components/forms/time-picker'
/**
 * Renders the TimePicker Playground example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TimePickerPlaygroundExample />
 */
const TimePickerPlaygroundExample = (args: ComponentProps<typeof TimePicker>): ReactElement => (
    <TimePicker
        key={args.defaultValue ?? ''}
        {...args}
    />
)

export default TimePickerPlaygroundExample
