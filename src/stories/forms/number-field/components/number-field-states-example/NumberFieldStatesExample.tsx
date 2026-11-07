import {
    NumberField
} from '@components/forms/number-field'
import type { ReactElement } from 'react'

/**
 * Renders the NumberField States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <NumberFieldStatesExample />
 */
const NumberFieldStatesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <NumberField
            label={'Disabled'}
            disabled
            defaultValue={4}
        />
        <NumberField
            label={'Invalid'}
            error={'Choose a value from 0 to 10'}
        />
    </div>
)

export default NumberFieldStatesExample
