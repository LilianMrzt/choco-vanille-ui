import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    ImagePicker
} from '@components/forms/image-picker'
import { storySource } from '@stories/_shared/utils/storySource'
import consumerSource2 from '@stories/forms/image-picker/sources/ImagePickerExample2.source.txt?raw'
import consumerSource6 from '@stories/forms/image-picker/sources/ImagePickerExample6.source.txt?raw'
import consumerSource7 from '@stories/forms/image-picker/sources/ImagePickerExample7.source.txt?raw'
import consumerSource8 from '@stories/forms/image-picker/sources/ImagePickerExample8.source.txt?raw'
import consumerSource9 from '@stories/forms/image-picker/sources/ImagePickerExample9.source.txt?raw'
import ImagePickerDocsPage from '@stories/forms/image-picker/components/image-picker-docs-page/ImagePickerDocsPage'
import ImagePickerPlaygroundExample from '@stories/forms/image-picker/components/image-picker-playground-example/ImagePickerPlaygroundExample'
import { playImagePickerPlayground } from '@stories/forms/image-picker/utils/playImagePickerPlayground.utils'
import ImagePickerProfilePictureExample from '@stories/forms/image-picker/components/image-picker-profile-picture-example/ImagePickerProfilePictureExample'
import ImagePickerMobileExample from '@stories/forms/image-picker/components/image-picker-mobile-example/ImagePickerMobileExample'
import ImagePickerWithExistingImageExample from '@stories/forms/image-picker/components/image-picker-with-existing-image-example/ImagePickerWithExistingImageExample'
import ImagePickerCroppingExample from '@stories/forms/image-picker/components/image-picker-cropping-example/ImagePickerCroppingExample'
import { playImagePickerCropping } from '@stories/forms/image-picker/utils/playImagePickerCropping.utils'
import ImagePickerStatesExample from '@stories/forms/image-picker/components/image-picker-states-example/ImagePickerStatesExample'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/image-picker/constants'
import type { ImagePickerStoryArgs } from '@stories/forms/image-picker/types'
import ImagePickerAppearance from '@stories/forms/image-picker/components/image-picker-appearance/ImagePickerAppearance'
import { APPEARANCE_SOURCE } from '@stories/forms/image-picker/utils/create-appearance-source/createAppearanceSource.utils'
import { createImagePickerSource } from '@stories/forms/image-picker/utils/create-image-picker-source/createImagePickerSource.utils'
import { ImagePickerFrame } from '@stories/forms/image-picker/utils/ImagePickerFrame.utils'

const meta = {
    title: 'Forms/ImagePicker',
    tags: ['autodocs'],
    component: ImagePicker,
    parameters: {
        layout: 'centered',
        docs: {
            page: ImagePickerDocsPage,
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [ImagePickerFrame],
} satisfies Meta<ImagePickerStoryArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive controlled playground. Choose or drop an image; the selected value is synchronized with Controls and Reset. Toggle isMobile to try the touch layout.',
            },
            source: {
                type: 'dynamic',
                transform: createImagePickerSource,
            },
        },
    },
    render: ImagePickerPlaygroundExample,
    play: playImagePickerPlayground,
}

export const ProfilePicture: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'The primary use case: a circular avatar picker with a person placeholder and a 5 MB limit. Hover the image to see the change hint; use the corner button to remove it.',
            },
            ...storySource(
                consumerSource9,
            ),
        },
    },
    render: ImagePickerProfilePictureExample,
}

export const Mobile: Story = {
    parameters: {
        viewport: { defaultViewport: 'mobile1' },
        docs: {
            description: {
                story:
          'With `isMobile`, drag and drop and hover hints are disabled and explicit touch-sized action buttons are rendered below the preview.',
            },
            ...storySource(consumerSource8),
        },
    },
    render: ImagePickerMobileExample,
}

export const WithExistingImage: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'An uncontrolled picker initialized with an existing remote image. Click it to change the image or use the corner button to remove it.',
            },
            ...storySource(
                consumerSource7,
            ),
        },
    },
    render: ImagePickerWithExistingImageExample,
}

export const Cropping: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Opt-in cropping keeps the current value unchanged until the user applies the crop. The crop mask follows the picker shape, while the crop ratio remains independently configurable for rectangular images.',
            },
            ...storySource(
                consumerSource6,
            ),
        },
    },
    render: ImagePickerCroppingExample,
    play: playImagePickerCropping,
}
export const States: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Disabled, helper, error, and required field states.',
            },
            ...storySource(consumerSource2),
        },
    },
    render: ImagePickerStatesExample,
}
export const Appearance: Story = {
    parameters: { docs: { ...storySource(APPEARANCE_SOURCE), description: { story: 'Compare independent appearance axes; each section changes one axis only. Fixed-dimension examples scroll within the canvas on narrow screens.' } } },
    render: ImagePickerAppearance,
}
