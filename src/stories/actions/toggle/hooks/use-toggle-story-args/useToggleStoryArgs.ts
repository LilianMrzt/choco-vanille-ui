import { useArgs } from 'storybook/preview-api'
import type { ToggleProps } from '@components/actions'
import type { ToggleStoryArgs } from '@stories/actions/toggle/types'
import type { ToggleStoryState } from '@stories/actions/toggle/hooks/use-toggle-story-args/types'

/**
 * Coordinates the standalone toggle from the Storybook render function.
 * @internal Not part of the public package API.
 * @returns Native standalone props.
 * @example const { toggleProps } = useToggleStoryArgs()
 */
export const useToggleStoryArgs = (): ToggleStoryState => {
    const [args, updateArgs] = useArgs<ToggleStoryArgs>()
    const {
        groupMultiple: _groupMultiple,
        groupOrientation: _groupOrientation,
        groupDisabled: _groupDisabled,
        groupValue: _groupValue,
        groupOnValueChange: _groupOnValueChange,
        ...toggleProps
    } = args
    const onPressedChange: NonNullable<ToggleProps['onPressedChange']> = (pressed, details) => {
        toggleProps.onPressedChange?.(pressed, details)
        if (!details.isCanceled && toggleProps.pressed !== undefined) {updateArgs({ pressed })}
    }
    return {
        toggleProps: { ...toggleProps, onPressedChange },
    }
}
