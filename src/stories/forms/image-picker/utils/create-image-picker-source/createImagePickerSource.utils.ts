import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { ImagePickerStoryArgs } from '@stories/forms/image-picker/types'
import fileTemplate from '@stories/forms/image-picker/utils/create-image-picker-source/sources/FileValue.source.txt?raw'

const transform = createControlledSource<ImagePickerStoryArgs>({
    component: 'ImagePicker',
    stateProp: 'value',
    eventProp: 'onValueChange',
    stateType: 'File | string | null',
    handler: 'setValue',
    icon: { prop: 'icon', name: 'UserIcon', module: '@iconify-icons/lucide/user' },
})

/**
 * Generates source preserving URLs and the selected File's name and MIME type.
 * Binary image contents are represented by an explicit consumer placeholder.
 * @internal Not part of the public package API.
 * @param source - Original Storybook source.
 * @param context - Current Storybook source context.
 * @param context.args - Public ImagePicker controls.
 * @returns A controlled consumer example.
 * @example
 * createImagePickerSource('', { args: { value: null } })
 */
export const createImagePickerSource = (source: string, { args }: Readonly<{ args: ImagePickerStoryArgs }>): string => {
    if (!(args.value instanceof File)) {
        return transform(source, { args: { ...args, value: args.value ?? null } })
    }
    const file = renderSource(fileTemplate, { name: JSON.stringify(args.value.name), type: JSON.stringify(args.value.type) })
    const example = transform(source, { args: { ...args, value: null } })
    const lines = example.split('\n')
    const firstBodyLine = lines.findIndex((line) => line.startsWith('const Example'))
    lines.splice(firstBodyLine, 0, file, '')

    return lines.join('\n').replace('useState<File | string | null>(null)', 'useState<File | string | null>(selectedFile)')
}
