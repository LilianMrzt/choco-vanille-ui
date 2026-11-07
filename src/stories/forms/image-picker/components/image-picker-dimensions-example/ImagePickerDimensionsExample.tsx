import {
    ImagePicker
} from '@components/forms/image-picker'
import type { ReactElement } from 'react'

/**
 * Renders the ImagePicker Dimensions example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ImagePickerDimensionsExample />
 */
const ImagePickerDimensionsExample = (): ReactElement => (
    <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'flex-start',
        }}
    >
        <ImagePicker
            label={'Square'}
            width={'12rem'}
            aspectRatio={'1'}
        />
        <ImagePicker
            label={'Landscape'}
            width={'22rem'}
            height={'12rem'}
        />
        <ImagePicker
            label={'Portrait'}
            width={'12rem'}
            height={'18rem'}
        />
    </div>
)

export default ImagePickerDimensionsExample
