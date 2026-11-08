import { USER_ICON as UserIcon } from '@constants/icon-registry'
import {
    ImagePicker
} from '@components/forms/image-picker'
import type { ReactElement } from 'react'

/**
 * Renders the ImagePicker Mobile example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ImagePickerMobileExample />
 */
const ImagePickerMobileExample = (): ReactElement => (
    <div
        style={{
            display: 'grid',
            boxSizing: 'border-box',
            gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 14rem))',
            justifyContent: 'center',
            gap: '2rem',
            width: '100%',
            maxWidth: '32rem',
            margin: '0 auto',
            padding: '1rem',
        }}
    >
        <ImagePicker
            label={'Empty state'}
            shape={'circle'}
            width={'100%'}
            icon={UserIcon}
            isMobile
        />
        <ImagePicker
            label={'Selected state'}
            defaultValue={'https://picsum.photos/seed/image-picker-avatar/320/320'}
            shape={'circle'}
            width={'100%'}
            icon={UserIcon}
            isMobile
        />
    </div>
)

export default ImagePickerMobileExample
