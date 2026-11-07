import { AutocompleteField } from '@components/forms/autocomplete'
import { FRUIT_OPTIONS } from '@stories/forms/autocomplete/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Autocomplete Sizes example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <AutocompleteSizesExample />
 */
const AutocompleteSizesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <AutocompleteField
            label={'Small'}
            size={'sm'}
            width={'100%'}
            options={FRUIT_OPTIONS}
        />
        <AutocompleteField
            label={'Medium'}
            size={'md'}
            width={'100%'}
            options={FRUIT_OPTIONS}
        />
        <AutocompleteField
            label={'Large'}
            size={'lg'}
            width={'100%'}
            options={FRUIT_OPTIONS}
        />
    </div>
)

export default AutocompleteSizesExample
