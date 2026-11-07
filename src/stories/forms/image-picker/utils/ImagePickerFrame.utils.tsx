import type { Decorator } from '@storybook/react-vite'
import type { ImagePickerStoryArgs } from '@stories/forms/image-picker/types'

/**
 * Bounds the canvas while allowing fixed-dimension comparisons to scroll internally.
 * @internal Not part of the public package API.
 * @param Story - Storybook's story renderer.
 * @returns A responsive, scrollable image-picker frame.
 * @example
 * decorators: [ImagePickerFrame]
 */
export const ImagePickerFrame: Decorator<ImagePickerStoryArgs> = (Story) => (
    <div
        aria-label={'Image picker examples'}
        role={'region'}
        style={{
            boxSizing: 'border-box',
            maxWidth: '100%',
            minWidth: 0,
            overflowX: 'auto',
            width: 'min(48rem, calc(100vw - 2rem))',
        }}
    >
        <Story />
    </div>
)
