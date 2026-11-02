import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import type { ComponentProps } from 'react'

import { Button } from '@components/actions/button'
import { Dialog, type DialogSize } from '@components/overlay/dialog'
import { Typography } from '@components/foundation/typography'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

type DialogPlaygroundArgs = ComponentProps<typeof Dialog> & {
  size?: DialogSize;
  title?: string;
  description?: string;
  showDescription?: boolean;
  showFooter?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
};

const SIZES: DialogSize[] = ['sm', 'md', 'lg', 'xl', '2xl', 'full']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute                 | Required    | Type        | Notes                                                |
| -------------------------------- | ----------- | ----------- | ---------------------------------------------------- |
| \`title\` on \`Dialog.Header\`       | Recommended | \`string\`    | Provides an accessible title for the dialog.         |
| \`titleAs\` on \`Dialog.Header\`     | No          | \`h1\` – \`h6\` | Choose the heading level that fits the page outline. |
| \`aria-label\` on \`Dialog.Content\` | No          | \`string\`    | Use when no visible title is present.                |

- Focus is trapped inside the dialog while it is open.
- Pressing \`Escape\` or clicking the overlay closes the dialog.
- The close button in \`Dialog.Header\` can be hidden with \`showCloseButton={false}\`.

**Sub-components**

| Sub-component        | Description                                    |
| -------------------- | ---------------------------------------------- |
| \`Dialog\`             | Root wrapper that manages open/close state.    |
| \`Dialog.Trigger\`     | Element that opens the dialog.                 |
| \`Dialog.Content\`     | Modal panel rendered inside a portal.          |
| \`Dialog.Header\`      | Title, description, and optional close button. |
| \`Dialog.Body\`        | Main content area.                             |
| \`Dialog.Footer\`      | Bottom area for action buttons.                |
| \`Dialog.Title\`       | Accessible dialog title.                       |
| \`Dialog.Description\` | Accessible dialog description.                 |
| \`Dialog.Close\`       | Closes the dialog when activated.              |
`

const DialogDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<DialogPlaygroundArgs> = {
    title: 'Overlay/Dialog',
    component: Dialog,
    parameters: {
        layout: 'centered',
        docs: {
            page: DialogDocsPage,
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A modal dialog built on Base UI Dialog.

Compose with \`Dialog.Trigger\`, \`Dialog.Content\`, \`Dialog.Header\`, \`Dialog.Body\`, \`Dialog.Footer\`, \`Dialog.Title\`, \`Dialog.Description\` and \`Dialog.Close\`.

**Usage**

~~~tsx
<Dialog>
  <Dialog.Trigger>
    <Button label="Open dialog" variant="contained" color="primary" />
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header
      title="Account settings"
      description="Manage your profile and preferences."
    />
    <Dialog.Body>
      <Typography>Your content goes here.</Typography>
    </Dialog.Body>
    <Dialog.Footer>
      <Dialog.Close>
        <Button label="Cancel" variant="outlined" color="primary" />
      </Dialog.Close>
      <Button label="Save" variant="contained" color="primary" />
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>
~~~

        `,
            },
        },
    },
    argTypes: {
        open: {
            control: 'boolean',
            table: { category: 'Dialog' },
        },
        defaultOpen: {
            control: 'boolean',
            table: { category: 'Dialog' },
        },
        modal: {
            control: 'boolean',
            table: { category: 'Dialog' },
        },
        size: {
            control: 'select',
            options: SIZES,
            table: { category: 'Dialog.Content' },
        },
        title: {
            control: 'text',
            table: { category: 'Dialog.Header' },
        },
        description: {
            control: 'text',
            table: { category: 'Dialog.Header' },
        },
        showDescription: {
            control: 'boolean',
            table: { category: 'Dialog.Header' },
        },
        showFooter: {
            control: 'boolean',
            table: { category: 'Dialog.Footer' },
        },
        confirmLabel: {
            control: 'text',
            table: { category: 'Dialog.Footer' },
        },
        cancelLabel: {
            control: 'text',
            table: { category: 'Dialog.Footer' },
        },
    },
    args: {
        defaultOpen: false,
        modal: true,
        size: 'md',
        title: 'Account settings',
        description: 'Manage your profile and preferences.',
        showDescription: true,
        showFooter: true,
        confirmLabel: 'Save changes',
        cancelLabel: 'Cancel',
    },
} satisfies Meta<DialogPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — every prop for all sub-components is exposed in the Controls panel, grouped by component.',
            },
            ...storySource(/* language=tsx */ `
<Dialog>
  <Dialog.Trigger>
    <Button label="Open dialog" variant="contained" color="primary" />
  </Dialog.Trigger>
  <Dialog.Content size="md">
    <Dialog.Header
      title="Account settings"
      description="Manage your profile and preferences."
    />
    <Dialog.Body>
      <Typography variant="p" fontSize="sm" color="foreground">
        Your content goes here.
      </Typography>
    </Dialog.Body>
    <Dialog.Footer>
      <Dialog.Close>
        <Button label="Cancel" variant="outlined" color="primary" size="sm" />
      </Dialog.Close>
      <Button label="Save changes" variant="contained" color="primary" size="sm" />
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>`),
        },
    },
    render: ({
        defaultOpen,
        modal,
        size,
        title,
        description,
        showDescription,
        showFooter,
        confirmLabel,
        cancelLabel,
    }) => (
        <Dialog
            defaultOpen={defaultOpen}
            modal={modal}
        >
            <Dialog.Trigger>
                <Button
                    label={'Open dialog'}
                    variant={'contained'}
                    color={'primary'}
                />
            </Dialog.Trigger>
            <Dialog.Content size={size}>
                <Dialog.Header
                    title={title}
                    description={showDescription ? description : undefined}
                />
                <Dialog.Body>
                    <Typography
                        variant={'p'}
                        fontSize={'sm'}
                        color={'foreground'}
                    >
                        Your content goes here. This dialog demonstrates the compound
                        component layout with Header, Body and Footer.
                    </Typography>
                </Dialog.Body>
                {showFooter && (
                    <Dialog.Footer>
                        <Dialog.Close>
                            <Button
                                label={cancelLabel ?? 'Cancel'}
                                variant={'outlined'}
                                color={'primary'}
                                size={'sm'}
                            />
                        </Dialog.Close>
                        <Button
                            label={confirmLabel ?? 'Save changes'}
                            variant={'contained'}
                            color={'primary'}
                            size={'sm'}
                        />
                    </Dialog.Footer>
                )}
            </Dialog.Content>
        </Dialog>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await userEvent.click(canvas.getByText('Open dialog'))
        await waitFor(() =>
            expect(document.querySelector('[role="dialog"]')).toBeInTheDocument(),
        )
        await expect(document.querySelector('[role="dialog"]')).toHaveTextContent(
            'Account settings',
        )
        await userEvent.click(
      document.querySelector('[aria-label="Close dialog"]')!,
        )
    },
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'All available dialog sizes rendered with explicit triggers.',
            },
            ...storySource(/* language=tsx */ `
<div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
  <Dialog>
    <Dialog.Trigger>
      <Button label="sm" variant="outlined" color="primary" />
    </Dialog.Trigger>
    <Dialog.Content size="sm">
      <Dialog.Header title="Small dialog" description="Size: sm" />
      <Dialog.Body>
        <Typography variant="p" fontSize="sm" color="foreground">
          This dialog uses the sm size.
        </Typography>
      </Dialog.Body>
    </Dialog.Content>
  </Dialog>

  <Dialog>
    <Dialog.Trigger>
      <Button label="md" variant="outlined" color="primary" />
    </Dialog.Trigger>
    <Dialog.Content size="md">
      <Dialog.Header title="Medium dialog" description="Size: md" />
      <Dialog.Body>
        <Typography variant="p" fontSize="sm" color="foreground">
          This dialog uses the md size.
        </Typography>
      </Dialog.Body>
    </Dialog.Content>
  </Dialog>

  <Dialog>
    <Dialog.Trigger>
      <Button label="lg" variant="outlined" color="primary" />
    </Dialog.Trigger>
    <Dialog.Content size="lg">
      <Dialog.Header title="Large dialog" description="Size: lg" />
      <Dialog.Body>
        <Typography variant="p" fontSize="sm" color="foreground">
          This dialog uses the lg size.
        </Typography>
      </Dialog.Body>
    </Dialog.Content>
  </Dialog>

  <Dialog>
    <Dialog.Trigger>
      <Button label="xl" variant="outlined" color="primary" />
    </Dialog.Trigger>
    <Dialog.Content size="xl">
      <Dialog.Header title="Extra large dialog" description="Size: xl" />
      <Dialog.Body>
        <Typography variant="p" fontSize="sm" color="foreground">
          This dialog uses the xl size.
        </Typography>
      </Dialog.Body>
    </Dialog.Content>
  </Dialog>

  <Dialog>
    <Dialog.Trigger>
      <Button label="2xl" variant="outlined" color="primary" />
    </Dialog.Trigger>
    <Dialog.Content size="2xl">
      <Dialog.Header title="2XL dialog" description="Size: 2xl" />
      <Dialog.Body>
        <Typography variant="p" fontSize="sm" color="foreground">
          This dialog uses the 2xl size.
        </Typography>
      </Dialog.Body>
    </Dialog.Content>
  </Dialog>

  <Dialog>
    <Dialog.Trigger>
      <Button label="full" variant="outlined" color="primary" />
    </Dialog.Trigger>
    <Dialog.Content size="full">
      <Dialog.Header title="Full dialog" description="Size: full" />
      <Dialog.Body>
        <Typography variant="p" fontSize="sm" color="foreground">
          This dialog uses the full size.
        </Typography>
      </Dialog.Body>
    </Dialog.Content>
  </Dialog>
</div>`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {SIZES.map((dialogSize) => (
                <Dialog key={dialogSize}>
                    <Dialog.Trigger>
                        <Button
                            label={dialogSize}
                            variant={'outlined'}
                            color={'primary'}
                        />
                    </Dialog.Trigger>
                    <Dialog.Content size={dialogSize}>
                        <Dialog.Header
                            title={`${dialogSize.toUpperCase()} dialog`}
                            description={`Size: ${dialogSize}`}
                        />
                        <Dialog.Body>
                            <Typography
                                variant={'p'}
                                fontSize={'sm'}
                                color={'foreground'}
                            >
                                This dialog uses the {dialogSize} size.
                            </Typography>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog>
            ))}
        </div>
    ),
}
