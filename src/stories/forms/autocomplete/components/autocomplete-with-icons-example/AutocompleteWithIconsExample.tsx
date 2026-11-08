import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { AutocompleteField } from '@components/forms/autocomplete'
import { FRUIT_OPTIONS } from '@stories/forms/autocomplete/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Autocomplete WithIcons example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <AutocompleteWithIconsExample />
 */
const AutocompleteWithIconsExample = (): ReactElement => (
    <AutocompleteField
        label={'Search'}
        startIcon={SearchIcon}
        options={FRUIT_OPTIONS}
    />
)

export default AutocompleteWithIconsExample
