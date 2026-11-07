import {
    ImagePicker
} from '@components/forms/image-picker'
import type { ReactElement } from 'react'

/**
 * Renders the ImagePicker WithExistingImage example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ImagePickerWithExistingImageExample />
 */
const ImagePickerWithExistingImageExample = (): ReactElement => (
    <ImagePicker
        label={'Existing image'}
        defaultValue={'https://picsum.photos/seed/image-picker/640/420'}
        width={'min(100%, 28rem)'}
        height={'16rem'}
    />
)

export default ImagePickerWithExistingImageExample
