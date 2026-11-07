import {
    ImagePicker
} from '@components/forms/image-picker'
import type { ReactElement } from 'react'

/**
 * Renders the ImagePicker Shapes example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ImagePickerShapesExample />
 */
const ImagePickerShapesExample = (): ReactElement => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <ImagePicker
            label={'Square'}
            defaultValue={'https://picsum.photos/seed/image-picker-shape/640/640'}
            shape={'square'}
            width={'12rem'}
            height={'12rem'}
        />
        <ImagePicker
            label={'Rounded'}
            defaultValue={'https://picsum.photos/seed/image-picker-shape/640/640'}
            shape={'rounded'}
            width={'12rem'}
            height={'12rem'}
        />
        <ImagePicker
            label={'Circle'}
            defaultValue={'https://picsum.photos/seed/image-picker-shape/640/640'}
            shape={'circle'}
            width={'12rem'}
            height={'12rem'}
        />
    </div>
)

export default ImagePickerShapesExample
