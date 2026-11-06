import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import type { ComponentProps } from 'react'

import { ContextMenu } from '@/components/overlay/context-menu'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

type ContextMenuPlaygroundArgs = ComponentProps<typeof ContextMenu> & {
    triggerLabel: string
    editLabel: string
    deleteLabel: string
    showDisabledItem: boolean
}

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`ContextMenu.Trigger\` | Yes | React element | Receives right-click, long-press, and keyboard context-menu interactions. |
| \`ContextMenu.Content\` | Yes | — | Contains the menu items displayed at the pointer position. |
| \`ContextMenu.Item\` | No | — | Uses \`menuitem\` semantics and supports keyboard activation. |
| \`disabled\` | No | \`boolean\` | Prevents the context menu from opening. |
| \`highlightItemOnHover\` | No | \`boolean\` | Controls whether pointer movement highlights items. |

- Right-click or long-press opens the menu without focusing an item.
- Opening with the Context Menu key or **Shift + F10** focuses the first enabled item.
- **Arrow keys** navigate, **Enter** or **Space** activate, and **Escape** closes the menu.
- Keyboard focus displays a visible focus ring; pointer hover uses the highlighted item state.
`

const ContextMenuDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<ContextMenuPlaygroundArgs> = {
    title: 'Overlay/ContextMenu',
    component: ContextMenu,
    parameters: {
        layout: 'centered',
        docs: {
            page: ContextMenuDocsPage,
            description: {
                component: md /* language=markdown */ `
A transparent wrapper that opens a dropdown menu from a right-click or long press.
The trigger area remains unstyled so it can wrap cards, rows, images, or other application content.

**Usage**

~~~tsx
<ContextMenu>
  <ContextMenu.Trigger>
    <div>Right click this area</div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item label="Edit" />
    <ContextMenu.Item label="Delete" destructive />
  </ContextMenu.Content>
</ContextMenu>
~~~
                `,
            },
        },
    },
    argTypes: {
        disabled: {
            control: 'boolean',
            table: { category: 'ContextMenu' },
        },
        loopFocus: {
            control: 'boolean',
            table: { category: 'ContextMenu' },
        },
        highlightItemOnHover: {
            control: 'boolean',
            table: { category: 'ContextMenu' },
        },
        triggerLabel: {
            control: 'text',
            table: { category: 'Compound: Trigger' },
        },
        editLabel: {
            control: 'text',
            table: { category: 'Compound: Content' },
        },
        deleteLabel: {
            control: 'text',
            table: { category: 'Compound: Content' },
        },
        showDisabledItem: {
            control: 'boolean',
            table: { category: 'Compound: Content' },
        },
    },
    args: {
        disabled: false,
        loopFocus: true,
        highlightItemOnHover: true,
        triggerLabel: 'Right click this area',
        editLabel: 'Edit',
        deleteLabel: 'Delete',
        showDisabledItem: false,
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — right-click or long-press the target area, then use the Controls panel to change the trigger and menu content.',
            },
            ...storySource(/* language=tsx */ `
<ContextMenu disabled={false} loopFocus highlightItemOnHover>
  <ContextMenu.Trigger>
    <div style={{ padding: '4rem', border: '1px dashed currentColor' }}>
      Right click this area
    </div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item label="Edit" />
    <ContextMenu.Item label="Delete" destructive />
  </ContextMenu.Content>
</ContextMenu>`),
        },
    },
    render: ({
        triggerLabel,
        editLabel,
        deleteLabel,
        showDisabledItem,
        ...args
    }) => (
        <ContextMenu {...args}>
            <ContextMenu.Trigger>
                <div style={{ padding: '4rem', border: '1px dashed currentColor' }}>
                    {triggerLabel}
                </div>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item label={editLabel} />
                <ContextMenu.Item
                    label={deleteLabel}
                    destructive
                />
                {showDisabledItem && (
                    <ContextMenu.Item
                        label={'Disabled action'}
                        disabled
                    />
                )}
            </ContextMenu.Content>
        </ContextMenu>
    ),
}

export const States: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive states — compare a disabled context menu with a menu containing a disabled item.',
            },
            ...storySource(/* language=tsx */ `
                <ContextMenu disabled>
                    <ContextMenu.Trigger>
                        <div style={{ padding: '2rem', border: '1px dashed currentColor' }}>
                            Disabled context menu
                        </div>
                    </ContextMenu.Trigger>
                    <ContextMenu.Content>
                        <ContextMenu.Item label="Edit" />
                    </ContextMenu.Content>
                </ContextMenu>
                
                <ContextMenu>
                    <ContextMenu.Trigger>
                        <div style={{ padding: '2rem', border: '1px dashed currentColor' }}>
                            Disabled menu item
                        </div>
                    </ContextMenu.Trigger>
                    <ContextMenu.Content>
                        <ContextMenu.Item label="Edit" />
                        <ContextMenu.Item label="Unavailable" disabled />
                    </ContextMenu.Content>
                </ContextMenu>`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '1rem' }}>
            <ContextMenu disabled>
                <ContextMenu.Trigger>
                    <div style={{ padding: '2rem', border: '1px dashed currentColor' }}>
                        Disabled context menu
                    </div>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item label={'Edit'} />
                </ContextMenu.Content>
            </ContextMenu>
            <ContextMenu>
                <ContextMenu.Trigger>
                    <div style={{ padding: '2rem', border: '1px dashed currentColor' }}>
                        Disabled menu item
                    </div>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item label={'Edit'} />
                    <ContextMenu.Item
                        label={'Unavailable'}
                        disabled
                    />
                </ContextMenu.Content>
            </ContextMenu>
        </div>
    ),
}
