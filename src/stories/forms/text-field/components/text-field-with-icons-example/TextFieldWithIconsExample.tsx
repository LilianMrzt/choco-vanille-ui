import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { TextField } from '@components/forms/text-field'
import type { ReactElement } from 'react'

/**
 * Renders the TextField WithIcons example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TextFieldWithIconsExample />
 */
const TextFieldWithIconsExample = (): ReactElement => (
    <TextField
        label={'Search'}
        startIcon={SearchIcon}
    />
)

export default TextFieldWithIconsExample
