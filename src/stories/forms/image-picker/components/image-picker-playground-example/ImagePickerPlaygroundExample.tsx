import { useArgs } from 'storybook/preview-api'
import {
    ImagePicker,
} from '@components/forms/image-picker'
import type { ImagePickerStoryArgs } from '@stories/forms/image-picker/types'
import type { ReactElement } from 'react'

/**
 * Renders the ImagePicker Playground example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ImagePickerPlaygroundExample />
 */
const ImagePickerPlaygroundExample = (_args: ImagePickerStoryArgs): ReactElement => {
    const [currentArgs, updateArgs] = useArgs<ImagePickerStoryArgs>()
    const value = currentArgs.value ?? null

    return (
        <ImagePicker
            {...currentArgs}
            value={value}
            onValueChange={(nextValue) => {
                currentArgs.onValueChange?.(nextValue)
                updateArgs({ value: nextValue })
            }}
        />
    )
}

export default ImagePickerPlaygroundExample
