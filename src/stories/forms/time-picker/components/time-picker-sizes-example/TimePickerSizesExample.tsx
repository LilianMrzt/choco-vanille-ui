import { TimePicker } from '@components/forms/time-picker'
import type { ReactElement } from 'react'

/**
 * Renders the TimePicker Sizes example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TimePickerSizesExample />
 */
const TimePickerSizesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <TimePicker
            label={'Small'}
            size={'sm'}
            width={'100%'}
        />
        <TimePicker
            label={'Medium'}
            size={'md'}
            width={'100%'}
        />
        <TimePicker
            label={'Large'}
            size={'lg'}
            width={'100%'}
        />
    </div>
)

export default TimePickerSizesExample
