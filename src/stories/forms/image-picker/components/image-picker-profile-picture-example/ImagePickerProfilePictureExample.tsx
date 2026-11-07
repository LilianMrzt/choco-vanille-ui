import {
    ImagePicker
} from '@components/forms/image-picker'
import UserIcon from '@resources/asset/UserIcon.svg?react'
import type { ReactElement } from 'react'

/**
 * Renders the ImagePicker ProfilePicture example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ImagePickerProfilePictureExample />
 */
const ImagePickerProfilePictureExample = (): ReactElement => (
    <ImagePicker
        label={'Profile picture'}
        defaultValue={'https://picsum.photos/seed/image-picker-avatar/320/320'}
        shape={'circle'}
        width={'10rem'}
        icon={UserIcon}
        maxSize={5242880}
        helperText={'PNG or JPG up to 5 MB.'}
    />
)

export default ImagePickerProfilePictureExample
