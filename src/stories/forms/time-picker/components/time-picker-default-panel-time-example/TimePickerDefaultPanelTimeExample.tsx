import { TimePicker } from '@components/forms/time-picker'
import type { ReactElement } from 'react'

/**
 * Renders the TimePicker DefaultPanelTime example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TimePickerDefaultPanelTimeExample />
 */
const TimePickerDefaultPanelTimeExample = (): ReactElement => (
    <TimePicker
        label={'Start time'}
        defaultPanelTime={'09:00'}
    />
)

export default TimePickerDefaultPanelTimeExample
