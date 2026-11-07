import { SelectField } from '@components/forms/select'
import { FRUIT_OPTIONS } from '@stories/forms/select/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Select Sizes example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <SelectSizesExample />
 */
const SelectSizesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <SelectField
            label={'Small'}
            size={'sm'}
            width={'100%'}
            options={FRUIT_OPTIONS}
        />
        <SelectField
            label={'Medium'}
            size={'md'}
            width={'100%'}
            options={FRUIT_OPTIONS}
        />
        <SelectField
            label={'Large'}
            size={'lg'}
            width={'100%'}
            options={FRUIT_OPTIONS}
        />
    </div>
)

export default SelectSizesExample
