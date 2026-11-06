import { useState, type ComponentProps } from 'react'
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

import { Button } from '@components/actions/button'
import { BottomSheet } from '@components/overlay/bottom-sheet'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import CloseIcon from '@resources/asset/CloseIcon.svg?react'
import ImageIcon from '@resources/asset/ImageIcon.svg?react'
import LinkIcon from '@resources/asset/LinkIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'
import UploadIcon from '@resources/asset/UploadIcon.svg?react'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

type BottomSheetPlaygroundArgs = ComponentProps<typeof BottomSheet> & {
  triggerLabel?: string;
  showHandle?: boolean;
  showHeader?: boolean;
  title?: string;
  description?: string;
  itemLabel?: string;
  itemDestructive?: boolean;
  itemDisabled?: boolean;
  showRadioGroup?: boolean;
  radioItemLabel?: string;
  showSeparator?: boolean;
  closeLabel?: string;
};

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute                                | Required    | Type      | Notes                                                             |
| ----------------------------------------------- | ----------- | --------- | ----------------------------------------------------------------- |
| \`title\` on \`BottomSheet.Header\`                 | Recommended | \`string\`  | Labels the sheet through \`aria-labelledby\`.                       |
| \`aria-label\` on \`BottomSheet.Content\`           | No          | \`string\`  | Use when no \`BottomSheet.Header\` is rendered.                     |
| \`defaultAriaLabel\` on \`BottomSheet.Content\`     | No          | \`string\`  | @default \`'Bottom sheet'\`. Localize the fallback accessible name. |
| \`aria-label\` on \`BottomSheet.RadioGroup\`        | ✅ Yes      | \`string\`  | Names the \`radiogroup\` (or use \`aria-labelledby\`).              |
| \`disabled\` on items                             | No          | \`boolean\` | The row stays visible and announced, but cannot be activated.    |

- The sheet renders with \`role="dialog"\`; focus is trapped inside while it is open and restored to the trigger on close.
- It closes on **Escape**, a tap on the backdrop, or a downward swipe. Rows are at least 48px tall for comfortable touch targets.
- \`BottomSheet.Item\` renders a native \`<button>\`; \`BottomSheet.RadioItem\` renders \`role="radio"\` with arrow-key navigation inside its group.

**Sub-components**

| Sub-component            | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| \`BottomSheet\`            | Root wrapper that manages open/close state.                      |
| \`BottomSheet.Trigger\`    | Element that opens the sheet.                                    |
| \`BottomSheet.Content\`    | Sheet panel with backdrop and drag handle, rendered in a portal. |
| \`BottomSheet.Header\`     | Title and optional description.                                  |
| \`BottomSheet.Item\`       | Action row; closes the sheet unless \`closeOnClick={false}\`.    |
| \`BottomSheet.RadioGroup\` | Single-choice group of \`BottomSheet.RadioItem\` rows.           |
| \`BottomSheet.RadioItem\`  | Selectable option with a check mark when selected.               |
| \`BottomSheet.Separator\`  | Divides groups of rows.                                          |
| \`BottomSheet.Close\`      | Closes the sheet when activated.                                 |
`

const BottomSheetDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<BottomSheetPlaygroundArgs> = {
    title: 'Overlay/BottomSheet',
    component: BottomSheet,
    parameters: {
        layout: 'centered',
        docs: {
            page: BottomSheetDocsPage,
            description: {
                component: md /* language=markdown */ `
A modal sheet that slides up from the bottom of the screen, built on Base UI Drawer.

Use it on mobile instead of \`DropdownMenu\` or popovers for contextual actions and single-choice pickers. It supports swipe-to-dismiss and keeps rows large enough for touch.

**Usage**

~~~tsx
<BottomSheet>
  <BottomSheet.Trigger>
    <Button label="More actions" variant="outlined" />
  </BottomSheet.Trigger>
  <BottomSheet.Content>
    <BottomSheet.Item label="Share" startIcon={LinkIcon} onClick={share} />
    <BottomSheet.Item label="Upload" startIcon={UploadIcon} onClick={upload} />
    <BottomSheet.Separator />
    <BottomSheet.Item label="Delete" startIcon={TrashIcon} destructive onClick={remove} />
  </BottomSheet.Content>
</BottomSheet>
~~~
        `,
            },
        },
    },
    argTypes: {
        defaultOpen: {
            control: 'boolean',
            table: { category: 'BottomSheet' },
        },
        modal: {
            control: 'boolean',
            table: { category: 'BottomSheet' },
        },
        triggerLabel: {
            control: 'text',
            table: { category: 'Compound: Trigger' },
        },
        showHandle: {
            control: 'boolean',
            table: { category: 'Compound: Content' },
        },
        showHeader: {
            control: 'boolean',
            table: { category: 'Compound: Header' },
        },
        title: {
            control: 'text',
            table: { category: 'Compound: Header' },
        },
        description: {
            control: 'text',
            table: { category: 'Compound: Header' },
        },
        itemLabel: {
            control: 'text',
            table: { category: 'Compound: Item' },
        },
        itemDestructive: {
            control: 'boolean',
            table: { category: 'Compound: Item' },
        },
        itemDisabled: {
            control: 'boolean',
            table: { category: 'Compound: Item' },
        },
        showRadioGroup: {
            control: 'boolean',
            table: { category: 'Compound: RadioGroup' },
        },
        radioItemLabel: {
            control: 'text',
            table: { category: 'Compound: RadioItem' },
        },
        showSeparator: {
            control: 'boolean',
            table: { category: 'Compound: Separator' },
        },
        closeLabel: {
            control: 'text',
            table: { category: 'Compound: Close' },
        },
    },
    args: {
        defaultOpen: false,
        modal: true,
        triggerLabel: 'Open bottom sheet',
        showHandle: true,
        showHeader: true,
        title: 'Photo',
        description: 'Choose what to do with this photo.',
        itemLabel: 'Delete',
        itemDestructive: true,
        itemDisabled: false,
        showRadioGroup: true,
        radioItemLabel: 'Original size',
        showSeparator: true,
        closeLabel: 'Cancel',
    },
} satisfies Meta<BottomSheetPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — every sub-component is exposed in the Controls panel, grouped by slot.',
            },
            ...storySource(/* language=tsx */ `
<BottomSheet>
  <BottomSheet.Trigger>
    <Button label="Open bottom sheet" variant="contained" color="primary" />
  </BottomSheet.Trigger>
  <BottomSheet.Content showHandle>
    <BottomSheet.Header
      title="Photo"
      description="Choose what to do with this photo."
    />
    <BottomSheet.Item label="Share link" startIcon={LinkIcon} />
    <BottomSheet.Item label="Upload" startIcon={UploadIcon} />
    <BottomSheet.Separator />
    <BottomSheet.RadioGroup aria-label="Size" value={size} onValueChange={setSize}>
      <BottomSheet.RadioItem label="Original size" value="original" />
      <BottomSheet.RadioItem label="Compressed" value="compressed" />
    </BottomSheet.RadioGroup>
    <BottomSheet.Separator />
    <BottomSheet.Item label="Delete" startIcon={TrashIcon} destructive />
    <BottomSheet.Close>
      <Button label="Cancel" variant="outlined" color="primary" width="100%" />
    </BottomSheet.Close>
  </BottomSheet.Content>
</BottomSheet>`),
        },
    },
    render: function Render({
        defaultOpen,
        modal,
        triggerLabel,
        showHandle,
        showHeader,
        title,
        description,
        itemLabel,
        itemDestructive,
        itemDisabled,
        showRadioGroup,
        radioItemLabel,
        showSeparator,
        closeLabel,
    }) {
        const [size, setSize] = useState<unknown>('original')

        return (
            <BottomSheet
                defaultOpen={defaultOpen}
                modal={modal}
            >
                <BottomSheet.Trigger>
                    <Button
                        label={triggerLabel ?? 'Open bottom sheet'}
                        variant={'contained'}
                        color={'primary'}
                    />
                </BottomSheet.Trigger>
                <BottomSheet.Content showHandle={showHandle}>
                    {showHeader && (
                        <BottomSheet.Header
                            title={title ?? 'Photo'}
                            description={description}
                        />
                    )}
                    <BottomSheet.Item
                        label={'Share link'}
                        startIcon={LinkIcon}
                    />
                    <BottomSheet.Item
                        label={'Upload'}
                        startIcon={UploadIcon}
                    />
                    {showRadioGroup && (
                        <>
                            {showSeparator && <BottomSheet.Separator />}
                            <BottomSheet.RadioGroup
                                aria-label={'Size'}
                                value={size}
                                onValueChange={setSize}
                            >
                                <BottomSheet.RadioItem
                                    label={radioItemLabel ?? 'Original size'}
                                    value={'original'}
                                />
                                <BottomSheet.RadioItem
                                    label={'Compressed'}
                                    value={'compressed'}
                                />
                            </BottomSheet.RadioGroup>
                        </>
                    )}
                    {showSeparator && <BottomSheet.Separator />}
                    <BottomSheet.Item
                        label={itemLabel ?? 'Delete'}
                        startIcon={TrashIcon}
                        destructive={itemDestructive}
                        disabled={itemDisabled}
                    />
                    <BottomSheet.Close>
                        <Button
                            label={closeLabel ?? 'Cancel'}
                            variant={'outlined'}
                            color={'primary'}
                            width={'100%'}
                        />
                    </BottomSheet.Close>
                </BottomSheet.Content>
            </BottomSheet>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await userEvent.click(canvas.getByText('Open bottom sheet'))
        await waitFor(() =>
            expect(document.querySelector('[role="dialog"]')).toBeInTheDocument(),
        )
        await expect(document.querySelector('[role="dialog"]')).toHaveTextContent('Photo')
        await userEvent.keyboard('{Escape}')
    },
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Items with a start icon, an end icon, and both.',
            },
            ...storySource(/* language=tsx */ `
<BottomSheet>
  <BottomSheet.Trigger>
    <Button label="Open with icons" variant="outlined" color="primary" />
  </BottomSheet.Trigger>
  <BottomSheet.Content aria-label="Icons">
    <BottomSheet.Item label="Start icon" startIcon={ImageIcon} />
    <BottomSheet.Item label="End icon" endIcon={ChevronRightIcon} />
    <BottomSheet.Item label="Both icons" startIcon={LinkIcon} endIcon={ChevronRightIcon} />
  </BottomSheet.Content>
</BottomSheet>`),
        },
    },
    render: () => (
        <BottomSheet>
            <BottomSheet.Trigger>
                <Button
                    label={'Open with icons'}
                    variant={'outlined'}
                    color={'primary'}
                />
            </BottomSheet.Trigger>
            <BottomSheet.Content aria-label={'Icons'}>
                <BottomSheet.Item
                    label={'Start icon'}
                    startIcon={ImageIcon}
                />
                <BottomSheet.Item
                    label={'End icon'}
                    endIcon={ChevronRightIcon}
                />
                <BottomSheet.Item
                    label={'Both icons'}
                    startIcon={LinkIcon}
                    endIcon={ChevronRightIcon}
                />
            </BottomSheet.Content>
        </BottomSheet>
    ),
}

export const States: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Default, destructive, disabled and selected rows.',
            },
            ...storySource(/* language=tsx */ `
<BottomSheet>
  <BottomSheet.Trigger>
    <Button label="Open states" variant="outlined" color="primary" />
  </BottomSheet.Trigger>
  <BottomSheet.Content aria-label="States">
    <BottomSheet.Item label="Default" startIcon={LinkIcon} />
    <BottomSheet.Item label="Destructive" startIcon={TrashIcon} destructive />
    <BottomSheet.Item label="Disabled" startIcon={CloseIcon} disabled />
    <BottomSheet.Separator />
    <BottomSheet.RadioGroup aria-label="Selection" defaultValue="selected">
      <BottomSheet.RadioItem label="Selected" value="selected" />
      <BottomSheet.RadioItem label="Not selected" value="other" />
      <BottomSheet.RadioItem label="Disabled option" value="disabled" disabled />
    </BottomSheet.RadioGroup>
  </BottomSheet.Content>
</BottomSheet>`),
        },
    },
    render: () => (
        <BottomSheet>
            <BottomSheet.Trigger>
                <Button
                    label={'Open states'}
                    variant={'outlined'}
                    color={'primary'}
                />
            </BottomSheet.Trigger>
            <BottomSheet.Content aria-label={'States'}>
                <BottomSheet.Item
                    label={'Default'}
                    startIcon={LinkIcon}
                />
                <BottomSheet.Item
                    label={'Destructive'}
                    startIcon={TrashIcon}
                    destructive
                />
                <BottomSheet.Item
                    label={'Disabled'}
                    startIcon={CloseIcon}
                    disabled
                />
                <BottomSheet.Separator />
                <BottomSheet.RadioGroup
                    aria-label={'Selection'}
                    defaultValue={'selected'}
                >
                    <BottomSheet.RadioItem
                        label={'Selected'}
                        value={'selected'}
                    />
                    <BottomSheet.RadioItem
                        label={'Not selected'}
                        value={'other'}
                    />
                    <BottomSheet.RadioItem
                        label={'Disabled option'}
                        value={'disabled'}
                        disabled
                    />
                </BottomSheet.RadioGroup>
            </BottomSheet.Content>
        </BottomSheet>
    ),
}
