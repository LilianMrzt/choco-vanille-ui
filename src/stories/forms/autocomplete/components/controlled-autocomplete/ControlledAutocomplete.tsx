import { useArgs } from 'storybook/preview-api'
import { AutocompleteField, type AutocompleteFieldProps } from '@components/forms/autocomplete'
import type { ReactElement } from 'react'

/**
 * Renders the Autocomplete interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ControlledAutocomplete />
 */
const ControlledAutocomplete = (_args: AutocompleteFieldProps): ReactElement => {
    const [args, updateArgs] = useArgs<AutocompleteFieldProps>()
    const handleValueChange: NonNullable<AutocompleteFieldProps['onValueChange']> = (value) => {
        args.onValueChange?.(value)
        updateArgs({ value })
    }
    const handleOpenChange: NonNullable<AutocompleteFieldProps['onOpenChange']> = (open) => {
        args.onOpenChange?.(open)
        if (args.open !== undefined) {
            updateArgs({ open })
        }
    }

    return (
        <AutocompleteField
            {...args}
            onValueChange={handleValueChange}
            onOpenChange={handleOpenChange}
        />
    )
}

export default ControlledAutocomplete
