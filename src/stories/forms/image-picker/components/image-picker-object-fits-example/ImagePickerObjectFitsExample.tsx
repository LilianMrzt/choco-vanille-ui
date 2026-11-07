import {
    ImagePicker
} from '@components/forms/image-picker'
import type { ReactElement } from 'react'

/**
 * Renders the ImagePicker ObjectFits example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ImagePickerObjectFitsExample />
 */
const ImagePickerObjectFitsExample = (): ReactElement => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '1rem',
        }}
    >
        <ImagePicker
            label={'Contain'}
            defaultValue={'https://picsum.photos/seed/image-picker-fit/640/420'}
            objectFit={'contain'}
            width={'12rem'}
            height={'8rem'}
        />
        <ImagePicker
            label={'Cover'}
            defaultValue={'https://picsum.photos/seed/image-picker-fit/640/420'}
            objectFit={'cover'}
            width={'12rem'}
            height={'8rem'}
        />
        <ImagePicker
            label={'Fill'}
            defaultValue={'https://picsum.photos/seed/image-picker-fit/640/420'}
            objectFit={'fill'}
            width={'12rem'}
            height={'8rem'}
        />
        <ImagePicker
            label={'None'}
            defaultValue={'https://picsum.photos/seed/image-picker-fit/640/420'}
            objectFit={'none'}
            width={'12rem'}
            height={'8rem'}
        />
        <ImagePicker
            label={'Scale down'}
            defaultValue={'https://picsum.photos/seed/image-picker-fit/640/420'}
            objectFit={'scale-down'}
            width={'12rem'}
            height={'8rem'}
        />
    </div>
)

export default ImagePickerObjectFitsExample
