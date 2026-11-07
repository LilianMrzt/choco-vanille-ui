import { Toggle } from '@components/actions'
import type { ToggleStoryArgs } from '@stories/actions/toggle/types'
import type { ReactElement } from 'react'
import { useToggleStoryArgs } from '@stories/actions/toggle/hooks/use-toggle-story-args/useToggleStoryArgs'

const ControlledToggle = (_args: ToggleStoryArgs): ReactElement => {
    const { toggleProps } = useToggleStoryArgs()

    return (
        <Toggle
            key={toggleProps.pressed === undefined ? String(toggleProps.defaultPressed) : 'controlled'}
            {...toggleProps}
        />
    )
}
export default ControlledToggle
