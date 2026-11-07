import { useArgs } from 'storybook/preview-api'
import type { ReactElement } from 'react'

import CheckboxPlayground from '@stories/forms/checkbox/components/checkbox-playground/CheckboxPlayground'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'

/**
 * Runs preview hooks in the story function and supplies all three pure API examples.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments; current values come from useArgs.
 * @returns The controlled checkbox examples.
 * @example
 * render: RenderCheckboxPlayground
 */
export const RenderCheckboxPlayground = (_args: CheckboxStoryArgs): ReactElement => {
    const [args, updateArgs] = useArgs<CheckboxStoryArgs>()
    const handleCheckedChange: NonNullable<CheckboxStoryArgs['onCheckedChange']> = (checked, details) => {
        args.onCheckedChange?.(checked, details)
        if (!details.isCanceled) {
            updateArgs({ checked })
        }
    }
    const handleGroupValueChange: NonNullable<CheckboxStoryArgs['groupOnValueChange']> = (value, details) => {
        args.groupOnValueChange?.(value, details)
        if (!details.isCanceled) {
            updateArgs({ groupValue: value })
        }
    }

    return (
        <CheckboxPlayground
            {...args}
            groupOnValueChange={handleGroupValueChange}
            onCheckedChange={handleCheckedChange}
        />
    )
}
