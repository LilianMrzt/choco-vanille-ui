import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, fn, within } from 'storybook/test'

import { TextArea, type TextAreaProps, type TextAreaSize } from '@components/forms/text-area'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/createControlledSource.utils'

const SIZES: TextAreaSize[] = ['sm', 'md', 'lg']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute                 | Required    | Type      | Notes                                                                      |
| -------------------------------- | ----------- | --------- | -------------------------------------------------------------------------- |
| \`label\`                          | Recommended | \`string\`  | Visible label linked to the textarea via \`aria-labelledby\`.                |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\`  | Required when \`label\` is omitted.                                          |
| \`error\`                          | No          | \`string\`  | Sets \`aria-invalid="true"\` and replaces helper text in \`aria-describedby\`. |
| \`helperText\`                     | No          | \`string\`  | Described by the textarea when no error is present.                        |
| \`disabled\`                       | No          | \`boolean\` | Native disabled state, announced by screen readers.                        |
| \`required\`                       | No          | \`boolean\` | Native required state for form validation.                                 |

- The underlying element is a native \`<textarea>\`, so it is fully keyboard operable.
- Do not rely on placeholder text alone as a label.
`

const TextAreaDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta = {
    title: 'Forms/TextArea',
    tags: ['autodocs'],
    component: TextArea,
    parameters: {
        layout: 'centered',
        docs: {
            page: TextAreaDocsPage,
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A styled textarea built with a native \`<textarea>\` and selectable label text connected with \`aria-labelledby\`.

Supports controlled (\`value\` + \`onChange\`) and uncontrolled (\`defaultValue\`) modes, optional label, start icon, end action, helper text, inline error, custom width and native \`rows\`.

**Usage**

~~~tsx
// Basic
<TextArea label="Description" placeholder="Tell us more..." rows={4} />

// With start icon
<TextArea label="Comment" startIcon={InfoIcon} />

// Custom end action
<TextArea
    label="Bio"
    endAction={
        <IconButton icon={CloseIcon} aria-label="Clear" variant="ghost" color="primary" />
    }
/>
~~~
                `,
            },
            source: { type: 'dynamic', transform: createControlledSource<TextAreaProps>({ component: 'TextArea', stateProp: 'value', eventProp: 'onChange', handler: '(event) => setValue(event.target.value)', icon: { prop: 'startIcon', name: 'InfoIcon' } }) },
        },
    },
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        startIcon: { control: 'select', options: ['none', 'info'], mapping: { none: undefined, info: InfoIcon } },
        endAction: { control: false, description: 'React node; use composition to provide a custom action.' },
        onChange: { control: false },
        value: { control: 'text' },
        defaultValue: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
        helperText: { control: 'text' },
        error: { control: 'text' },
        width: { control: 'text' },
        rows: { control: 'number' },
        minRows: { control: 'number' },
        maxRows: { control: 'number' },
        size: { control: 'select', options: SIZES },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'Description',
        placeholder: 'Tell us more...',
        size: 'md',
        rows: 4,
        minRows: 2,
        maxRows: 6,
        width: '300px',
        value: '',
        onChange: fn(),
    },
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Keeps the textarea value and callback synchronized with Storybook args.
 * @internal Not part of the public package API.
 * @param _args - Storybook render arguments.
 * @returns The controlled text area.
 * @example
 * <ControlledTextArea label="Description" />
 */
const ControlledTextArea = (_args: TextAreaProps) => {
    const [args, updateArgs] = useArgs<TextAreaProps>()
    const handleChange: NonNullable<TextAreaProps['onChange']> = (event) => {
        args.onChange?.(event)
        updateArgs({ value: event.currentTarget.value })
    }

    return (
        <TextArea
            {...args}
            onChange={handleChange}
        />
    )
}

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Use the Controls panel to experiment with the field props.',
            },
        },
    },
    render: ControlledTextArea,
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const label = args.label as string | undefined
        if (label) {
            await expect(canvas.getByLabelText(label)).toBeInTheDocument()
        } else {
            await expect(canvas.getByRole('textbox')).toBeInTheDocument()
        }
    },
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=TEXT */ String.raw`
<TextArea label="Small" size="sm" />
<TextArea label="Medium" size="md" />
<TextArea label="Large" size="lg" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextArea
                label={'Small'}
                size={'sm'}
            />
            <TextArea
                label={'Medium'}
                size={'md'}
            />
            <TextArea
                label={'Large'}
                size={'lg'}
            />
        </div>
    ),
}

export const States: Story = {
    parameters: {
        docs: { ...storySource(/* language=TEXT */ String.raw`<TextArea label="Disabled" disabled />
<TextArea label="Comment" helperText="Add useful details." />
<TextArea label="Invalid comment" error="Enter a comment." />`) },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextArea
                label={'Disabled'}
                disabled
            />
            <TextArea
                label={'Comment'}
                helperText={'Add useful details.'}
            />
            <TextArea
                label={'Invalid comment'}
                error={'Enter a comment.'}
            />
        </div>
    ),
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=TEXT */ String.raw`<TextArea label="Comment" startIcon={InfoIcon} />`),
        },
    },
    render: () => (
        <TextArea
            label={'Comment'}
            startIcon={InfoIcon}
        />
    ),
}
