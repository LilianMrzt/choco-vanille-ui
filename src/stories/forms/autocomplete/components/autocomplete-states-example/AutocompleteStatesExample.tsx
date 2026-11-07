import { AutocompleteField } from '@components/forms/autocomplete'
import { FRUIT_OPTIONS } from '@stories/forms/autocomplete/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Autocomplete States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <AutocompleteStatesExample />
 */
const AutocompleteStatesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <AutocompleteField
            label={'Disabled'}
            disabled
            options={FRUIT_OPTIONS}
        />
        <AutocompleteField
            label={'Fruit'}
            helperText={'Search for a fruit.'}
            options={FRUIT_OPTIONS}
        />
        <AutocompleteField
            label={'Invalid fruit'}
            error={'Choose a fruit.'}
            options={FRUIT_OPTIONS}
        />
    </div>
)

export default AutocompleteStatesExample
