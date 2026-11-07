import { SelectField } from '@components/forms/select'
import { FRUIT_OPTIONS } from '@stories/forms/select/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Select States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <SelectStatesExample />
 */
const SelectStatesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <SelectField
            label={'Disabled'}
            disabled
            options={FRUIT_OPTIONS}
        />
        <SelectField
            label={'Fruit'}
            helperText={'Choose a fruit.'}
            options={FRUIT_OPTIONS}
        />
        <SelectField
            label={'Invalid fruit'}
            error={'Choose a fruit.'}
            options={FRUIT_OPTIONS}
        />
    </div>
)

export default SelectStatesExample
