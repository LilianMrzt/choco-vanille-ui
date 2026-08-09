import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { TextArea, type TextAreaSize } from '@components/forms/text-area'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const SIZES: TextAreaSize[] = ['sm', 'md', 'lg']
const FONT_SIZES = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'] as const

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute                 | Required    | Type      | Notes                                                                      |
| -------------------------------- | ----------- | --------- | -------------------------------------------------------------------------- |
| \`label\`                          | Recommended | \`string\`  | Visible label linked to the textarea via \`htmlFor\`.                        |
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
    component: TextArea,
    parameters: {
        layout: 'centered',
        docs: {

            page: TextAreaDocsPage,            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A styled textarea built with a native \`<textarea>\` and \`<label>\` for accessible label binding.

Supports controlled (\`value\` + \`onChange\`) and uncontrolled (\`defaultValue\`) modes, optional label, start icon, end action, helper text, inline error, custom width and native \`rows\`.

**Usage**

~~~tsx
// Basic
<TextArea label="Description" placeholder="Tell us moreâ€¦" rows={4} />

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
        },
    },
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        startIcon: { control: 'text' },
        helperText: { control: 'text' },
        error: { control: 'text' },
        width: { control: 'text' },
        rows: { control: 'number' },
        minRows: { control: 'number' },
        maxRows: { control: 'number' },
        size: { control: 'select', options: SIZES },
        fontSize: { control: 'select', options: FONT_SIZES },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: {
        label: 'Description',
        placeholder: 'Tell us moreâ€¦',
        size: 'md',
        fontSize: 'md',
        rows: 4,
        minRows: 2,
        maxRows: 6,
        width: '300px',
    },
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: { ...storySource(`<TextArea />`),
            description: {
                story:
                    'Interactive playground â€” use the Controls panel to experiment with every available prop.',
            },
        },
    },
    render: (args) => {
        const [value, setValue] = useState('')
        return (
            <TextArea
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        )
    },
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
            ...storySource(`
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

export const FontSizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<TextArea label="2xs" fontSize="2xs" />
<TextArea label="xs" fontSize="xs" />
<TextArea label="sm" fontSize="sm" />
<TextArea label="md" fontSize="md" />
<TextArea label="lg" fontSize="lg" />
<TextArea label="xl" fontSize="xl" />
<TextArea label="2xl" fontSize="2xl" />
<TextArea label="3xl" fontSize="3xl" />
<TextArea label="4xl" fontSize="4xl" />
<TextArea label="5xl" fontSize="5xl" />
<TextArea label="6xl" fontSize="6xl" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FONT_SIZES.map((fontSize) => (
                <TextArea
                    key={fontSize}
                    label={fontSize}
                    fontSize={fontSize}
                />
            ))}
        </div>
    ),
}

export const States: Story = {
    parameters: {
        docs: { ...storySource(`<TextArea label="Disabled" disabled />`) },
    },
    render: () => (
        <TextArea
            label={'Disabled'}
            disabled
        />
    ),
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(`<TextArea label="Comment" startIcon={InfoIcon} />`),
        },
    },
    render: () => (
        <TextArea
            label={'Comment'}
            startIcon={InfoIcon}
        />
    ),
}
