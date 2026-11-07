import {
    ImagePicker
} from '@components/forms/image-picker'
import type { ReactElement } from 'react'

/**
 * Renders the ImagePicker Cropping example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ImagePickerCroppingExample />
 */
const ImagePickerCroppingExample = (): ReactElement => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '1rem',
            width: 'min(100%, 42rem)',
        }}
    >
        <ImagePicker
            label={'Square crop'}
            crop
            cropAspectRatio={1}
            shape={'square'}
            width={'100%'}
        />
        <ImagePicker
            label={'Rounded 16:9 crop'}
            crop
            cropAspectRatio={16 / 9}
            shape={'rounded'}
            width={'100%'}
        />
        <ImagePicker
            label={'Circle crop'}
            crop
            cropAspectRatio={1}
            shape={'circle'}
            width={'100%'}
        />
    </div>
)

export default ImagePickerCroppingExample
