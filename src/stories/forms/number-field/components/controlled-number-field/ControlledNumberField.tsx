import { useArgs } from 'storybook/preview-api'
import {
    NumberField,
    type NumberFieldProps,
} from '@components/forms/number-field'
import type { ReactElement } from 'react'

/**
 * Renders the NumberField interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ControlledNumberField />
 */
const ControlledNumberField = (_args: NumberFieldProps): ReactElement => {
    const [args, updateArgs] = useArgs<NumberFieldProps>()
    const handleValueChange: NonNullable<NumberFieldProps['onValueChange']> = (value, details) => {
        args.onValueChange?.(value, details)
        if (!details.isCanceled) {
            updateArgs({ value })
        }
    }

    return (
        <NumberField
            {...args}
            onValueChange={handleValueChange}
        />
    )
}

export default ControlledNumberField
