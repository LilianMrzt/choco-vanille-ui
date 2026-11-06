import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import type { TextFieldSize } from '@components/forms/text-field'
import { TimePicker } from '@components/forms/time-picker'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const SIZES: TextFieldSize[] = [
    'sm',
    'md',
    'lg',
]

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | Recommended | \`string\` | Visible label linked to the input. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when \`label\` is omitted. |
| \`disabled\` | No | \`boolean\` | Disables the input and the popover trigger. |
| \`error\` | No | \`string\` | Sets \`aria-invalid\` on the input. |
| \`triggerAriaLabel\` | No | \`string\` | Accessible name for the trigger button. |
| \`panelAriaLabel\` | No | \`string\` | Accessible name for the popover dialog. |
| \`hoursAriaLabel\` / \`minutesAriaLabel\` | No | \`string\` | Accessible names for the two lists. |

- The trigger is an \`IconButton\` with an \`aria-label\`; the popover content is a \`role="dialog"\`.
- Hours and minutes are lists of buttons exposing \`aria-pressed\` for the selected value.
- Native time inputs provide built-in keyboard and screen-reader support.
`

const TimePickerDocsPage = () => (
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
    title: 'Forms/TimePicker',
    component: TimePicker,
    parameters: {
        layout: 'centered',
        docs: {
            page: TimePickerDocsPage,
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A time picker that combines a native \`type="time"\` text field with a popover listing hours and minutes.

- **Direct input** — type a time in 24-hour \`HH:mm\` format.
- **Popover selection** — click the clock button, choose an hour, then a minute.
- **Accessible** — the input keeps its native time semantics and is annotated with \`aria-haspopup="dialog"\`.

**Usage**

\`\`\`tsx
const [time, setTime] = useState<string | undefined>()

<TimePicker
  label="Start time"
  value={time}
  onChange={setTime}
/>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text', table: { category: 'TimePicker' } },
        helperText: { control: 'text', table: { category: 'TimePicker' } },
        error: { control: 'text', table: { category: 'TimePicker' } },
        width: { control: 'text', table: { category: 'TimePicker' } },
        size: {
            control: 'select',
            options: SIZES,
            table: { category: 'TimePicker' },
        },
        minuteStep: { control: 'number', table: { category: 'TimePicker' } },
        hourStep: { control: 'number', table: { category: 'TimePicker' } },
        defaultPanelTime: { control: 'text', table: { category: 'TimePicker' } },
        minTime: { control: 'text', table: { category: 'TimePicker' } },
        maxTime: { control: 'text', table: { category: 'TimePicker' } },
        showNowButton: { control: 'boolean', table: { category: 'TimePicker' } },
        clearable: { control: 'boolean', table: { category: 'TimePicker' } },
        disabled: { control: 'boolean', table: { category: 'TimePicker' } },
        required: { control: 'boolean', table: { category: 'TimePicker' } },
    },
    args: {
        label: 'Start time',
        size: 'md',
        minuteStep: 5,
        disabled: false,
        required: false,
        width: '300px',
    },
} satisfies Meta<ComponentProps<typeof TimePicker> & { width?: string }>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            ...storySource(`<TimePicker />`),
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
        },
    },
    render: (args) => {
        const [time, setTime] = useState<string | undefined>()
        return (
            <TimePicker
                {...args}
                value={time}
                onChange={setTime}
            />
        )
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const label = args.label as string | undefined
        if (label) {
            await expect(canvas.getByLabelText(label)).toBeInTheDocument()
        }
    },
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(`
<TimePicker label="Small" size="sm" />
<TimePicker label="Medium" size="md" />
<TimePicker label="Large" size="lg" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TimePicker
                label={'Small'}
                size={'sm'}
            />
            <TimePicker
                label={'Medium'}
                size={'md'}
            />
            <TimePicker
                label={'Large'}
                size={'lg'}
            />
        </div>
    ),
}

export const DefaultPanelTime: Story = {
    parameters: {
        docs: {
            ...storySource(`<TimePicker label="Start time" defaultPanelTime="09:00" />`),
            description: {
                story: 'The popover opens on defaultPanelTime while no time is selected. The value stays empty until the user picks one.',
            },
        },
    },
    render: () => (
        <TimePicker
            label={'Start time'}
            defaultPanelTime={'09:00'}
        />
    ),
}

export const Range: Story = {
    parameters: {
        docs: {
            ...storySource(`<TimePicker label="Opening hours" minTime="09:00" maxTime="17:30" minuteStep={15} />`),
            description: { story: 'Options outside minTime and maxTime are disabled.' },
        },
    },
    render: () => (
        <TimePicker
            label={'Opening hours'}
            minTime={'09:00'}
            maxTime={'17:30'}
            minuteStep={15}
        />
    ),
}

export const Steps: Story = {
    parameters: {
        docs: {
            ...storySource(`<TimePicker label="Every 15 minutes" minuteStep={15} />
<TimePicker label="Every 6 hours" hourStep={6} minuteStep={30} />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TimePicker
                label={'Every 15 minutes'}
                minuteStep={15}
            />
            <TimePicker
                label={'Every 6 hours'}
                hourStep={6}
                minuteStep={30}
            />
        </div>
    ),
}

export const Actions: Story = {
    parameters: {
        docs: {
            ...storySource(`<TimePicker label="Start time" showNowButton clearable />`),
            description: { story: 'showNowButton and clearable add a footer to the popover.' },
        },
    },
    render: () => (
        <TimePicker
            label={'Start time'}
            showNowButton
            clearable
        />
    ),
}

export const States: Story = {
    parameters: { docs: { ...storySource(`<TimePicker label="Disabled" disabled />`) } },
    render: () => (
        <TimePicker
            label={'Disabled'}
            disabled
        />
    ),
}
