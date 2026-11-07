import {
    NumberField
} from '@components/forms/number-field'
import type { ReactElement } from 'react'

/**
 * Renders the NumberField Sizes example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <NumberFieldSizesExample />
 */
const NumberFieldSizesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <NumberField
            label={'Small'}
            size={'sm'}
            width={'100%'}
            defaultValue={1}
        />
        <NumberField
            label={'Medium'}
            size={'md'}
            width={'100%'}
            defaultValue={1}
        />
        <NumberField
            label={'Large'}
            size={'lg'}
            width={'100%'}
            defaultValue={1}
        />
    </div>
)

export default NumberFieldSizesExample
