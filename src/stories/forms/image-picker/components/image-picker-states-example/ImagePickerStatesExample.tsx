import {
    ImagePicker
} from '@components/forms/image-picker'
import type { ReactElement } from 'react'

/**
 * Renders the ImagePicker States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ImagePickerStatesExample />
 */
const ImagePickerStatesExample = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
        <ImagePicker
            label={'Disabled'}
            disabled
            width={'24rem'}
        />
        <ImagePicker
            label={'With helper'}
            helperText={'PNG or JPG up to 5 MB.'}
            width={'24rem'}
        />
        <ImagePicker
            label={'With error'}
            error={'Please choose a valid image.'}
            width={'24rem'}
        />
        <ImagePicker
            label={'Required'}
            required
            width={'24rem'}
        />
    </div>
)

export default ImagePickerStatesExample
