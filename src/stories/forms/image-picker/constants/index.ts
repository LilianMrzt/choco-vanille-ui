import { md } from '@stories/_shared/utils/markdown'
import consumerSource1 from '@stories/forms/image-picker/sources/ImagePickerUsage1.source.txt?raw'
import { type ImagePickerStoryArgs } from '@stories/forms/image-picker/types'
import { fn } from 'storybook/test'
import {
    type ImagePickerObjectFit,
    type ImagePickerShape,
} from '@components/forms/image-picker'

export const OBJECT_FITS: ImagePickerObjectFit[] = [
    'contain',
    'cover',
    'fill',
    'none',
    'scale-down',
]
export const SHAPES: ImagePickerShape[] = ['square', 'rounded', 'circle']
export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
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
export const ARG_TYPES: import('@storybook/react-vite').ArgTypes<ImagePickerStoryArgs> = {
    value: { control: 'text', description: 'Controlled existing-image URL or null. File selections update the same arg through the picker; use Reset to restore the initial image.' },
    defaultValue: { control: false, description: 'Initial-only File or URL; the primary playground is controlled. Use WithExistingImage for uncontrolled usage.' },
    onValueChange: { control: false,
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    onValidationError: { control: false,
        description: 'Callback receives the public event payload; observe it in Actions or provide a handler in code.'
    },
    label: { control: 'text',
        description: 'Sets the public label prop.'
    },
    alt: { control: 'text',
        description: 'Sets the public alt prop.'
    },
    helperText: { control: 'text',
        description: 'Sets the public helperText prop.'
    },
    error: { control: 'text',
        description: 'Sets the public error prop.'
    },
    accept: { control: 'text',
        description: 'Sets the public accept prop.'
    },
    maxSize: { control: 'number',
        description: 'Sets the public maxSize prop.'
    },
    disabled: { control: 'boolean',
        description: 'Sets the public disabled prop.'
    },
    disableChange: { control: 'boolean',
        description: 'Sets the public disableChange prop.'
    },
    disableRemove: { control: 'boolean',
        description: 'Sets the public disableRemove prop.'
    },
    crop: { control: 'boolean',
        description: 'Sets the public crop prop.'
    },
    cropAspectRatio: { control: 'number',
        description: 'Sets the public cropAspectRatio prop.'
    },
    required: { control: 'boolean',
        description: 'Sets the public required prop.'
    },
    clearable: { control: 'boolean',
        description: 'Sets the public clearable prop.'
    },
    isMobile: { control: 'boolean',
        description: 'Sets the public isMobile prop.'
    },
    icon: { control: false,
        description: 'React composition or non-serializable value; provide it in consumer code.'
    },
    inputId: { control: 'text',
        description: 'Sets the public inputId prop.'
    },
    name: { control: 'text',
        description: 'Sets the public name prop.'
    },
    capture: { control: 'select', options: [undefined, 'user', 'environment'],
        description: 'Sets the public capture prop.'
    },
    labels: { control: 'object',
        description: 'Sets the public labels prop.'
    },
    width: { control: 'text',
        description: 'Sets the public width prop.'
    },
    height: { control: 'text',
        description: 'Sets the public height prop.'
    },
    aspectRatio: { control: 'text',
        description: 'Sets the public aspectRatio prop.'
    },
    shape: { control: 'select', options: SHAPES,
        description: 'Sets the public shape prop.'
    },
    objectFit: { control: 'select', options: OBJECT_FITS,
        description: 'Sets the public objectFit prop.'
    },
    'className': { control: 'text', description: 'Editable className forwarded to the rendered public component.' },
    'style': { control: 'object', description: 'Editable style forwarded to the rendered public component.' },
    'onBlur': { control: false, description: 'Supply a callback in code; Actions receives the full public event payload.' },
    'onFocus': { control: false, description: 'Supply a callback in code; Actions receives the full public event payload.' },
    'ref': { control: false, description: 'Ref target is not serializable; attach it in consumer code.' }
}
export const DEFAULT_ARGS = {
    label: 'Cover image',
    alt: 'Cover image preview',
    accept: 'image/*',
    clearable: true,
    isMobile: false,
    width: 'min(100%, 28rem)',
    height: '16rem',
    shape: 'rounded',
    objectFit: 'cover',
    crop: false,
    value: null,
    onValueChange: fn(),
    onValidationError: fn(),
} satisfies Partial<ImagePickerStoryArgs>
export const DESCRIPTION = md /* language=markdown */ `
A single-image picker designed first for profile pictures. The shaped preview is the button used to choose or replace the image.

- **Desktop** (default): drag and drop, a "change" hint on hover and focus, and a corner remove button.
- **Mobile** (\`isMobile\`): no drag and drop and no hover; explicit, touch-sized **Choose / Change** and **Remove** buttons are rendered below the preview.
- **Cropping** (\`crop\`): valid local files open in an editor and are committed only after **Apply crop**.

Use a URL for an existing image or a \`File\` returned by \`onValueChange\`.

~~~tsx
${consumerSource1}
~~~
        `
