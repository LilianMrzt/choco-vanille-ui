import { useArgs } from 'storybook/preview-api'
import type { ToggleGroupProps, ToggleProps } from '@components/actions'
import type { ToggleStoryArgs } from '@stories/actions/toggle/types'
import type { ToggleStoryState } from '@stories/actions/toggle/hooks/use-toggle-story-args/types'

/**
 * Coordinates both controls from the actual Storybook render function.
 * @internal Not part of the public package API.
 * @returns Native standalone props and controlled group props.
 * @example const { toggleProps, groupProps } = useToggleStoryArgs()
 */
export const useToggleStoryArgs = (): ToggleStoryState => {
    const [args, updateArgs] = useArgs<ToggleStoryArgs>()
    const { groupMultiple, groupOrientation, groupDisabled, groupValue, groupOnValueChange, ...toggleProps } = args
    const onPressedChange: NonNullable<ToggleProps['onPressedChange']> = (pressed, details) => {
        toggleProps.onPressedChange?.(pressed, details)
        if (!details.isCanceled && toggleProps.pressed !== undefined) {updateArgs({ pressed })}
    }
    const onValueChange: NonNullable<ToggleGroupProps['onValueChange']> = (value, details) => {
        groupOnValueChange?.(value, details)
        if (!details.isCanceled) {updateArgs({ groupValue: value })}
    }

    return {
        toggleProps: { ...toggleProps, onPressedChange },
        groupProps: {
            'aria-label': 'Text formatting',
            value: groupValue,
            multiple: groupMultiple,
            orientation: groupOrientation,
            disabled: groupDisabled,
            onValueChange,
        },
    }
}
