import { ARG_TYPES, DEFAULT_ARGS } from '@stories/overlay/bottom-sheet/constants'
import sourceWithIcons from '@stories/overlay/bottom-sheet/sources/WithIcons.source.tsx.txt?raw'
import sourceStates from '@stories/overlay/bottom-sheet/sources/States.source.tsx.txt?raw'
import BottomSheetDocsPage from '@stories/overlay/bottom-sheet/components/docs-page/DocsPage'
import BottomSheetUncontrolled from '@stories/overlay/bottom-sheet/components/uncontrolled/BottomSheetUncontrolled'
import uncontrolledSource from '@stories/overlay/bottom-sheet/sources/Uncontrolled.source.tsx.txt?raw'
import type { BottomSheetPlaygroundArgs } from '@stories/overlay/bottom-sheet/types'
import BottomSheetPlayground from '@stories/overlay/bottom-sheet/components/playground/BottomSheetPlayground'
import BottomSheetWithIcons from '@stories/overlay/bottom-sheet/components/with-icons/BottomSheetWithIcons'
import BottomSheetStates from '@stories/overlay/bottom-sheet/components/states/BottomSheetStates'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { expect, userEvent, waitFor, within } from 'storybook/test'

import { BottomSheet } from '@components/overlay/bottom-sheet'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createBottomSheetSource } from '@stories/overlay/bottom-sheet/utils/create-bottom-sheet-source/createBottomSheetSource.utils'

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
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
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
            source: { type: 'dynamic', transform: createBottomSheetSource },
        },
    },
    render: BottomSheetPlayground,
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

export const Uncontrolled: Story = {
    render: BottomSheetUncontrolled,
    parameters: { docs: { ...storySource(uncontrolledSource), description: { story: 'The sheet manages its own open state.' } } },
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Items with a start icon, an end icon, and both.',
            },
            ...storySource(sourceWithIcons),
        },
    },
    render: BottomSheetWithIcons,
}

export const States: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Default, destructive, disabled and selected rows.',
            },
            ...storySource(sourceStates),
        },
    },
    render: BottomSheetStates,
}
