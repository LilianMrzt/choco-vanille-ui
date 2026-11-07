import { useArgs } from 'storybook/preview-api'
import { TextArea, type TextAreaProps } from '@components/forms/text-area'
import type { ReactElement } from 'react'

/**
 * Renders the TextArea interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ControlledTextArea />
 */
const ControlledTextArea = (_args: TextAreaProps): ReactElement => {
    const [args, updateArgs] = useArgs<TextAreaProps>()
    const handleChange: NonNullable<TextAreaProps['onChange']> = (event) => {
        args.onChange?.(event)
        updateArgs({ value: event.currentTarget.value })
    }

    return (
        <TextArea
            {...args}
            onChange={handleChange}
        />
    )
}

export default ControlledTextArea
