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
import type { ComponentProps } from 'react'

import { Button } from '@components/actions/button'
import {
    Panel,
    type PanelPosition,
} from '@components/overlay/panel'
import { Typography } from '@components/foundation/typography'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

type PanelPlaygroundArgs = ComponentProps<typeof Panel> & {
  position?: PanelPosition;
  width?: string;
  title?: string;
  description?: string;
  showDescription?: boolean;
};

const POSITIONS: PanelPosition[] = ['left', 'right']
const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute           | Required    | Type     | Notes                                 |
| -------------------------- | ----------- | -------- | ------------------------------------- |
| \`Panel.Header title\`       | Recommended | \`string\` | Provides the accessible panel title.  |
| \`Panel.Content aria-label\` | No          | \`string\` | Supplies a localizable fallback name. |

- Focus is trapped inside the panel while it is open.
- Pressing \`Escape\` or clicking the backdrop closes the panel.
- The panel slides from the configured \`position\`.
`

const PanelDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<PanelPlaygroundArgs> = {
    title: 'Overlay/Panel',
    component: Panel,
    parameters: {
        layout: 'centered',
        docs: {
            page: PanelDocsPage,
            description: {
                component: md /* language=markdown */ `
A modal side panel built on Base UI Dialog. Compose it with \`Panel.Trigger\`, \`Panel.Content\`, \`Panel.Header\`, \`Panel.Body\`, \`Panel.Footer\` and \`Panel.Close\`.
        `,
            },
        },
    },
    argTypes: {
        defaultOpen: {
            control: 'boolean',
            table: { category: 'Panel' },
        },
        modal: {
            control: 'boolean',
            table: { category: 'Panel' },
        },
        position: {
            control: 'select',
            options: POSITIONS,
            table: { category: 'Panel.Content' },
        },
        width: {
            control: 'text',
            table: { category: 'Panel.Content' },
        },
        title: {
            control: 'text',
            table: { category: 'Panel.Header' },
        },
        description: {
            control: 'text',
            table: { category: 'Panel.Header' },
        },
        showDescription: {
            control: 'boolean',
            table: { category: 'Panel.Header' },
        },
    },
    args: {
        defaultOpen: false,
        modal: true,
        position: 'right',
        width: '33.333vw',
        title: 'Panel settings',
        description: 'Manage your profile and preferences.',
        showDescription: true,
    },
} satisfies Meta<PanelPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Panel>
    <Panel.Trigger>
        <Button label="Open panel" variant="contained" color="primary" />
    </Panel.Trigger>
    <Panel.Content position="right" width="33.333vw">
        <Panel.Header title="Panel settings" description="Manage your profile and preferences." />
        <Panel.Body>
            <Typography variant="p" fontSize="sm" color="foreground">
                Your content goes here.
            </Typography>
        </Panel.Body>
        <Panel.Footer>
            <Panel.Close>
                <Button label="Close" variant="outlined" color="primary" size="sm" />
            </Panel.Close>
        </Panel.Footer>
    </Panel.Content>
</Panel>`),
        },
    },
    render: ({
        defaultOpen,
        modal,
        position,
        width,
        title,
        description,
        showDescription,
    }) => (
        <Panel
            defaultOpen={defaultOpen}
            modal={modal}
        >
            <Panel.Trigger>
                <Button
                    label={'Open panel'}
                    variant={'contained'}
                    color={'primary'}
                />
            </Panel.Trigger>
            <Panel.Content
                position={position}
                width={width}
            >
                <Panel.Header
                    title={title}
                    description={showDescription ? description : undefined}
                />
                <Panel.Body>
                    <Typography
                        variant={'p'}
                        fontSize={'sm'}
                        color={'foreground'}
                    >
                        Your content goes here. This panel demonstrates the dialog-like
                        compound component with side placement.
                    </Typography>
                </Panel.Body>
            </Panel.Content>
        </Panel>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await userEvent.click(canvas.getByRole('button', { name: 'Open panel' }))
        await expect(canvas.getByRole('dialog')).toBeVisible()
    },
}

export const Positions: Story = {
    render: () => (
        <>
            <Panel>
                <Panel.Trigger>
                    <Button
                        label={'Open left panel'}
                        variant={'outlined'}
                        color={'primary'}
                    />
                </Panel.Trigger>
                <Panel.Content position={'left'}>
                    <Panel.Header title={'Left panel'} />
                    <Panel.Body>Slides in from the left.</Panel.Body>
                </Panel.Content>
            </Panel>
            <Panel>
                <Panel.Trigger>
                    <Button
                        label={'Open right panel'}
                        variant={'outlined'}
                        color={'primary'}
                    />
                </Panel.Trigger>
                <Panel.Content position={'right'}>
                    <Panel.Header title={'Right panel'} />
                    <Panel.Body>Slides in from the right.</Panel.Body>
                </Panel.Content>
            </Panel>
        </>
    ),
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Panel>
    <Panel.Trigger>
        <Button label="Open left panel" variant="outlined" color="primary" />
    </Panel.Trigger>
    <Panel.Content position="left">
        <Panel.Header title="Left panel" />
        <Panel.Body>Slides in from the left.</Panel.Body>
    </Panel.Content>
</Panel>
<Panel>
    <Panel.Trigger>
        <Button label="Open right panel" variant="outlined" color="primary" />
    </Panel.Trigger>
    <Panel.Content position="right">
        <Panel.Header title="Right panel" />
        <Panel.Body>Slides in from the right.</Panel.Body>
    </Panel.Content>
</Panel>`),
        },
    },
}

export const Widths: Story = {
    render: () => (
        <>
            <Panel>
                <Panel.Trigger>
                    <Button
                        label={'Open narrow panel'}
                        variant={'outlined'}
                        color={'primary'}
                    />
                </Panel.Trigger>
                <Panel.Content width={'20rem'}>
                    <Panel.Header title={'Narrow panel'} />
                </Panel.Content>
            </Panel>
            <Panel>
                <Panel.Trigger>
                    <Button
                        label={'Open wide panel'}
                        variant={'outlined'}
                        color={'primary'}
                    />
                </Panel.Trigger>
                <Panel.Content width={'42rem'}>
                    <Panel.Header title={'Wide panel'} />
                </Panel.Content>
            </Panel>
        </>
    ),
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Panel>
    <Panel.Trigger>
        <Button label="Open narrow panel" variant="outlined" color="primary" />
    </Panel.Trigger>
    <Panel.Content width="20rem">
        <Panel.Header title="Narrow panel" />
    </Panel.Content>
</Panel>
<Panel>
    <Panel.Trigger>
        <Button label="Open wide panel" variant="outlined" color="primary" />
    </Panel.Trigger>
    <Panel.Content width="42rem">
        <Panel.Header title="Wide panel" />
    </Panel.Content>
</Panel>`),
        },
    },
}
