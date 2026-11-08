import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { SelectField } from '@components/forms/select'
import { FRUIT_OPTIONS } from '@stories/forms/select/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Select WithIcons example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <SelectWithIconsExample />
 */
const SelectWithIconsExample = (): ReactElement => (
    <SelectField
        label={'Fruit'}
        startIcon={SearchIcon}
        options={FRUIT_OPTIONS}
    />
)

export default SelectWithIconsExample
