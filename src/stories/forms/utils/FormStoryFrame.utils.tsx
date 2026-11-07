import type { Decorator } from '@storybook/react-vite'
import type { ReactElement } from 'react'
import { FORM_STORY_FRAME_STYLE } from '@stories/forms/constants'

/**
 * Bounds form examples on desktop and keeps narrow canvases internally scrollable.
 * @internal Not part of the public package API.
 * @param Story - Story renderer retaining its own argument contract.
 * @returns A responsive example frame.
 * @example
 * decorators: [FormStoryFrame]
 */
export const FormStoryFrame = <Args,>(Story: Parameters<Decorator<Args>>[0]): ReactElement => (
    <div style={FORM_STORY_FRAME_STYLE}>
        <Story />
    </div>
)
