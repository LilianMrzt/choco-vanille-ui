import { useArgs } from 'storybook/preview-api'
import type { ReactElement } from 'react'

import CheckboxPlayground from '@stories/forms/checkbox/components/checkbox-playground/CheckboxPlayground'
import type { CheckboxProps } from '@components/forms/checkbox'

/**
 * Runs preview hooks for the standalone checkbox.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments; current values come from useArgs.
 * @returns The controlled checkbox examples.
 * @example
 * render: RenderCheckboxPlayground
 */
export const RenderCheckboxPlayground = (_args: CheckboxProps): ReactElement => {
    const [args, updateArgs] = useArgs<CheckboxProps>()
    const handleCheckedChange: NonNullable<CheckboxProps['onCheckedChange']> = (checked, details) => {
        args.onCheckedChange?.(checked, details)
        if (!details.isCanceled) {
            updateArgs({ checked })
        }
    }
    return (
        <CheckboxPlayground
            {...args}
            onCheckedChange={handleCheckedChange}
        />
    )
}
