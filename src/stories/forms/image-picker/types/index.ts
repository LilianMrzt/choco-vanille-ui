import { type ComponentProps } from 'react'
import {
    ImagePicker,
    type ImagePickerValue,
} from '@components/forms/image-picker'

export type ImagePickerStoryArgs = ComponentProps<typeof ImagePicker> & {
  value?: ImagePickerValue;
};
