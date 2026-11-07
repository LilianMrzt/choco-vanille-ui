import { DatePicker } from '@components/forms/date-picker'
import type { ReactElement } from 'react'

/**
 * Renders the DatePicker Sizes example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <DatePickerSizesExample />
 */
const DatePickerSizesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <DatePicker
            label={'Small'}
            size={'sm'}
            width={'100%'}
        />
        <DatePicker
            label={'Medium'}
            size={'md'}
            width={'100%'}
        />
        <DatePicker
            label={'Large'}
            size={'lg'}
            width={'100%'}
        />
    </div>
)

export default DatePickerSizesExample
