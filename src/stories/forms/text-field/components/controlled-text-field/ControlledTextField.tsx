import { useArgs } from 'storybook/preview-api'
import { TextField, type TextFieldProps } from '@components/forms/text-field'
import type { ReactElement } from 'react'

/**
 * Renders the TextField interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ControlledTextField />
 */
const ControlledTextField = (_args: TextFieldProps): ReactElement => {
    const [args, updateArgs] = useArgs<TextFieldProps>()
    const handleChange: NonNullable<TextFieldProps['onChange']> = (event) => {
        args.onChange?.(event)
        updateArgs({ value: event.currentTarget.value })
    }

    return (
        <TextField
            {...args}
            onChange={handleChange}
        />
    )
}

export default ControlledTextField
