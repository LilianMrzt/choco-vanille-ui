import { useEffect, useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, userEvent, within } from 'storybook/test'

import {
    ImagePicker,
    type ImagePickerObjectFit,
    type ImagePickerShape,
    type ImagePickerValue,
} from '@components/forms/image-picker'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'
import UserIcon from '@resources/asset/UserIcon.svg?react'

const OBJECT_FITS: ImagePickerObjectFit[] = [
    'contain',
    'cover',
    'fill',
    'none',
    'scale-down',
]
const SHAPES: ImagePickerShape[] = ['square', 'rounded', 'circle']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute                 | Required    | Type                          | Notes                                                                                                                    |
| -------------------------------- | ----------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| \`label\`                          | Recommended | \`string\`                      | Visible text that names the picker button together with its current action (e.g. "Profile picture Change image").        |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\`                      | Applied to the picker button. Use when the visible label is omitted or needs to be replaced.                             |
| \`value\` + \`onValueChange\`        | No          | \`ImagePickerValue\`            | Controlled image value; use \`defaultValue\` for uncontrolled usage.                                                       |
| \`accept\`                         | No          | \`string\`                      | Native file-input filter. Defaults to \`image/*\`.                                                                         |
| \`maxSize\` + \`onValidationError\`  | No          | \`number\` + callback           | Rejects oversized or non-matching files and exposes a localized message.                                                 |
| \`error\`                          | No          | \`string\`                      | Connects the error message to the picker button through \`aria-describedby\` and sets \`aria-invalid\` on the picker button. |
| \`shape\`                          | No          | \`square \| rounded \| circle\` | Controls the shape of the clickable dropzone.                                                                            |
| \`disabled\`                       | No          | \`boolean\`                     | Prevents opening the file chooser and image actions.                                                                     |
| \`disableChange\`                  | No          | \`boolean\`                     | Disables the choose/change action while keeping remove available.                                                        |
| \`disableRemove\`                  | No          | \`boolean\`                     | Disables the remove action while keeping choose/change available.                                                        |
| \`crop\`                           | No          | \`boolean\`                     | Opens an editor for valid local files and commits the image only after the crop is applied.                              |
| \`cropAspectRatio\`                | No          | \`number\`                      | Sets the crop editor ratio; defaults to the picker shape or \`4 / 3\`.                                                     |
| \`labels\`                         | No          | \`Partial<ImagePickerLabels>\`  | Overrides picker actions, validation feedback, crop actions, zoom, and the crop-area accessible name for i18n.             |
| \`isMobile\`                       | No          | \`boolean\`                     | Replaces the hover hint and corner remove button with visible, touch-sized action buttons.                               |

- The preview is a keyboard-operable native button that opens the native file chooser.
- The remove action is always a visible, named button (\`labels.remove\`): a corner icon button on desktop, a text button with \`isMobile\`.
- The hidden native input mirrors the displayed file, so native form submission and \`required\` validation stay consistent. Its validation state is exposed by the picker button rather than the \`aria-hidden\` input.
- Cropping is opt-in. Cancelling the crop preserves the previous image and form value; applying it commits the generated file.
`

const ImagePickerDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

type ImagePickerStoryArgs = ComponentProps<typeof ImagePicker> & {
  value?: ImagePickerValue;
};

const meta = {
    title: 'Forms/ImagePicker',
    component: ImagePicker,
    parameters: {
        layout: 'centered',
        docs: {
            page: ImagePickerDocsPage,
            description: {
                component: md /* language=markdown */ `
A single-image picker designed first for profile pictures. The shaped preview is the button used to choose or replace the image.

- **Desktop** (default): drag and drop, a "change" hint on hover and focus, and a corner remove button.
- **Mobile** (\`isMobile\`): no drag and drop and no hover; explicit, touch-sized **Choose / Change** and **Remove** buttons are rendered below the preview.
- **Cropping** (\`crop\`): valid local files open in an editor and are committed only after **Apply crop**.

Use a URL for an existing image or a \`File\` returned by \`onValueChange\`.

**Usage**

~~~tsx
const [avatar, setAvatar] = useState<File | string | null>(user.avatarUrl)

<ImagePicker
    label="Profile picture"
    value={avatar}
    onValueChange={setAvatar}
    shape="circle"
    width="10rem"
    icon={UserIcon}
    maxSize={5 * 1024 * 1024}
    isMobile={isMobile}
/>
~~~
        `,
            },
        },
    },
    argTypes: {
        value: { control: false },
        defaultValue: { control: false },
        onValueChange: { control: false },
        onValidationError: { control: false },
        label: { control: 'text' },
        alt: { control: 'text' },
        helperText: { control: 'text' },
        error: { control: 'text' },
        accept: { control: 'text' },
        maxSize: { control: 'number' },
        disabled: { control: 'boolean' },
        disableChange: { control: 'boolean' },
        disableRemove: { control: 'boolean' },
        crop: { control: 'boolean' },
        cropAspectRatio: { control: 'number' },
        required: { control: 'boolean' },
        clearable: { control: 'boolean' },
        isMobile: { control: 'boolean' },
        icon: { control: false },
        inputId: { control: 'text' },
        name: { control: 'text' },
        capture: { control: 'select', options: [undefined, 'user', 'environment'] },
        labels: { control: 'object' },
        width: { control: 'text' },
        height: { control: 'text' },
        aspectRatio: { control: 'text' },
        shape: { control: 'select', options: SHAPES },
        objectFit: { control: 'select', options: OBJECT_FITS },
    },
    args: {
        label: 'Cover image',
        alt: 'Cover image preview',
        accept: 'image/*',
        clearable: true,
        isMobile: false,
        width: '28rem',
        height: '16rem',
        shape: 'rounded',
        objectFit: 'cover',
        crop: false,
        value: null,
    },
} satisfies Meta<ImagePickerStoryArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive controlled playground — click or drop an image onto the shaped area. Toggle `isMobile` to see the touch layout.',
            },
            ...storySource(
                `<ImagePicker label="Cover image" alt="Cover image preview" accept="image/*" clearable width="28rem" height="16rem" shape="rounded" objectFit="cover" />`,
            ),
        },
    },
    render: (args) => {
        const [value, setValue] = useState<ImagePickerValue>(args.value ?? null)

        useEffect(() => {
            setValue(args.value ?? null)
        }, [args.value])

        return (
            <ImagePicker
                {...args}
                value={value}
                onValueChange={setValue}
            />
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole('button', { name: 'Cover image Choose image' }),
        ).toBeInTheDocument()
    },
}

export const ProfilePicture: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'The primary use case: a circular avatar picker with a person placeholder and a 5 MB limit. Hover the image to see the change hint; use the corner button to remove it.',
            },
            ...storySource(
                `<ImagePicker label="Profile picture" defaultValue="https://picsum.photos/seed/image-picker-avatar/320/320" shape="circle" width="10rem" icon={UserIcon} maxSize={5242880} helperText="PNG or JPG up to 5 MB." />`,
            ),
        },
    },
    render: () => (
        <ImagePicker
            label={'Profile picture'}
            defaultValue={'https://picsum.photos/seed/image-picker-avatar/320/320'}
            shape={'circle'}
            width={'10rem'}
            icon={UserIcon}
            maxSize={5242880}
            helperText={'PNG or JPG up to 5 MB.'}
        />
    ),
}

export const Mobile: Story = {
    parameters: {
        viewport: { defaultViewport: 'mobile1' },
        docs: {
            description: {
                story:
          'With `isMobile`, drag and drop and hover hints are disabled and explicit touch-sized action buttons are rendered below the preview.',
            },
            ...storySource(`
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 14rem))', justifyContent: 'center', gap: '2rem', width: '100%', maxWidth: '32rem', margin: '0 auto', padding: '1rem' }}>
    <ImagePicker label="Empty state" shape="circle" width="100%" icon={UserIcon} isMobile />
    <ImagePicker label="Selected state" defaultValue="https://picsum.photos/seed/image-picker-avatar/320/320" shape="circle" width="100%" icon={UserIcon} isMobile />
</div>`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'grid',
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
    ),
}

export const WithExistingImage: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'An uncontrolled picker initialized with an existing remote image. Click it to change the image or use the corner button to remove it.',
            },
            ...storySource(
                `<ImagePicker label="Existing image" defaultValue="https://picsum.photos/seed/image-picker/640/420" width="28rem" height="16rem" />`,
            ),
        },
    },
    render: () => (
        <ImagePicker
            label={'Existing image'}
            defaultValue={'https://picsum.photos/seed/image-picker/640/420'}
            width={'28rem'}
            height={'16rem'}
        />
    ),
}

export const Cropping: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Opt-in cropping keeps the current value unchanged until the user applies the crop. The crop mask follows the picker shape, while the crop ratio remains independently configurable for rectangular images.',
            },
            ...storySource(
                `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem', width: 'min(100%, 42rem)' }}>
    <ImagePicker label="Square crop" crop cropAspectRatio={1} shape="square" width="100%" />
    <ImagePicker label="Rounded 16:9 crop" crop cropAspectRatio={16 / 9} shape="rounded" width="100%" />
    <ImagePicker label="Circle crop" crop cropAspectRatio={1} shape="circle" width="100%" />
</div>`,
            ),
        },
    },
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '1rem',
                width: 'min(100%, 42rem)',
            }}
        >
            <ImagePicker
                label={'Square crop'}
                crop
                cropAspectRatio={1}
                shape={'square'}
                width={'100%'}
            />
            <ImagePicker
                label={'Rounded 16:9 crop'}
                crop
                cropAspectRatio={16 / 9}
                shape={'rounded'}
                width={'100%'}
            />
            <ImagePicker
                label={'Circle crop'}
                crop
                cropAspectRatio={1}
                shape={'circle'}
                width={'100%'}
            />
        </div>
    ),
    play: async ({ canvasElement }) => {
        const input = canvasElement.querySelector('input[type="file"]')

        if (!(input instanceof HTMLInputElement)) {
            throw new Error('The ImagePicker file input was not rendered.')
        }

        await userEvent.upload(
            input,
            new File(['image-data'], 'profile-picture.png', {
                type: 'image/png',
            }),
        )

        await expect(
            within(document.body).getByRole('dialog', { name: 'Crop image' }),
        ).toBeInTheDocument()
    },
}

export const Dimensions: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Resize the preview with width, height, or aspectRatio.',
            },
            ...storySource(`
<ImagePicker label="Square" width="12rem" aspectRatio="1" />
<ImagePicker label="Landscape" width="22rem" height="12rem" />
<ImagePicker label="Portrait" width="12rem" height="18rem" />`),
        },
    },
    render: () => (
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
    ),
}

export const Shapes: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Choose the shape of the complete clickable dropzone: square, rounded, or circular.',
            },
            ...storySource(`
<ImagePicker label="Square" defaultValue="https://picsum.photos/seed/image-picker-shape/640/640" shape="square" width="12rem" height="12rem" />
<ImagePicker label="Rounded" defaultValue="https://picsum.photos/seed/image-picker-shape/640/640" shape="rounded" width="12rem" height="12rem" />
<ImagePicker label="Circle" defaultValue="https://picsum.photos/seed/image-picker-shape/640/640" shape="circle" width="12rem" height="12rem" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <ImagePicker
                label={'Square'}
                defaultValue={'https://picsum.photos/seed/image-picker-shape/640/640'}
                shape={'square'}
                width={'12rem'}
                height={'12rem'}
            />
            <ImagePicker
                label={'Rounded'}
                defaultValue={'https://picsum.photos/seed/image-picker-shape/640/640'}
                shape={'rounded'}
                width={'12rem'}
                height={'12rem'}
            />
            <ImagePicker
                label={'Circle'}
                defaultValue={'https://picsum.photos/seed/image-picker-shape/640/640'}
                shape={'circle'}
                width={'12rem'}
                height={'12rem'}
            />
        </div>
    ),
}

export const ObjectFits: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Choose how the selected image is fitted inside the preview surface.',
            },
            ...storySource(`
<ImagePicker label="Contain" defaultValue="https://picsum.photos/seed/image-picker-fit/640/420" objectFit="contain" width="12rem" height="8rem" />
<ImagePicker label="Cover" defaultValue="https://picsum.photos/seed/image-picker-fit/640/420" objectFit="cover" width="12rem" height="8rem" />
<ImagePicker label="Fill" defaultValue="https://picsum.photos/seed/image-picker-fit/640/420" objectFit="fill" width="12rem" height="8rem" />
<ImagePicker label="None" defaultValue="https://picsum.photos/seed/image-picker-fit/640/420" objectFit="none" width="12rem" height="8rem" />
<ImagePicker label="Scale down" defaultValue="https://picsum.photos/seed/image-picker-fit/640/420" objectFit="scale-down" width="12rem" height="8rem" />`),
        },
    },
    render: () => (
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
    ),
}

export const States: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Disabled, helper, error, and required field states.',
            },
            ...storySource(`
<ImagePicker label="Disabled" disabled width="24rem" />
<ImagePicker label="With helper" helperText="PNG or JPG up to 5 MB." width="24rem" />
<ImagePicker label="With error" error="Please choose a valid image." width="24rem" />
<ImagePicker label="Required" required width="24rem" />`),
        },
    },
    render: () => (
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
    ),
}
