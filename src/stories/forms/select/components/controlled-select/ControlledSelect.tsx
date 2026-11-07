import { useArgs } from 'storybook/preview-api'
import { SelectField, type SelectFieldProps } from '@components/forms/select'
import type { ReactElement } from 'react'

/**
 * Renders the Select interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ControlledSelect />
 */
const ControlledSelect = (_args: SelectFieldProps): ReactElement => {
    const [args, updateArgs] = useArgs<SelectFieldProps>()
    const handleValueChange: NonNullable<SelectFieldProps['onValueChange']> = (value) => {
        args.onValueChange?.(value)
        updateArgs({ value })
    }
    const handleOpenChange: NonNullable<SelectFieldProps['onOpenChange']> = (open) => {
        args.onOpenChange?.(open)
        if (args.open !== undefined) {
            updateArgs({ open })
        }
    }

    return (
        <SelectField
            {...args}
            onValueChange={handleValueChange}
            onOpenChange={handleOpenChange}
        />
    )
}

export default ControlledSelect
