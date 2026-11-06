import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'

import { Breadcrumbs } from '@components/navigation/breadcrumbs'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| ---------------- | -------- | ---- | ----- |
| \`aria-label\` | Yes | \`string\` | Names the breadcrumb navigation landmark. |
| \`Breadcrumbs.Item\` | Yes | Compound slot | Provides each ordered breadcrumb item. |
| \`current\` | No | \`boolean\` | Marks the item as the current page; the last item is current by default. |
| \`aria-current\` | Automatic | \`"page"\` | Applied to the current breadcrumb item. |
| \`separator\` | No | \`BreadcrumbsSeparator\` | Decorative separator between breadcrumb items. Defaults to \`chevron\`. |
`

const BreadcrumbsDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

type BreadcrumbsStoryArgs = ComponentProps<typeof Breadcrumbs> & {
    currentLabel: string
}

const meta: Meta<BreadcrumbsStoryArgs> = {
    title: 'Navigation/Breadcrumbs',
    component: Breadcrumbs,
    parameters: {
        layout: 'centered',
        docs: {
            page: BreadcrumbsDocsPage,
            description: {
                component: md /* language=markdown */ `
A breadcrumb trail helps users understand their location within a hierarchy.
Compose it from \`Breadcrumbs.Item\` elements; ancestor items render as links
and the current item is rendered as plain text.

**Usage**

~~~tsx
<Breadcrumbs aria-label="Breadcrumb">
  <Breadcrumbs.Item label="Home" href="/" />
  <Breadcrumbs.Item label="Products" href="/products" />
  <Breadcrumbs.Item label="Details" />
</Breadcrumbs>
~~~
                `,
            },
        },
    },
    argTypes: {
        'aria-label': { control: 'text' },
        children: { table: { disable: true } },
        color: {
            control: 'select',
            options: ['primary.main', 'secondary.main', 'neutral.main', 'danger.main', 'success.main', 'warning.main', 'info.main'],
        },
        separator: {
            control: 'select',
            options: ['chevron', 'slash', 'dot', 'reverseSlash', 'dash'],
        },
        currentLabel: {
            control: 'text',
            table: { category: 'Compound: Item' },
        },
    },
    args: {
        'aria-label': 'Breadcrumb',
        color: 'primary.main',
        separator: 'chevron',
        currentLabel: 'Details',
        children: <Breadcrumbs.Item label={'Details'} />,
    },
}

export default meta

type Story = StoryObj<BreadcrumbsStoryArgs>

export const Playground: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Breadcrumbs aria-label="Breadcrumb" color="primary.main" separator="chevron">
  <Breadcrumbs.Item label="Home" href="/" />
  <Breadcrumbs.Item label="Products" href="/products" />
  <Breadcrumbs.Item label="Details" />
</Breadcrumbs>`),
        },
    },
    render: ({ children: _children, currentLabel, ...args }) => (
        <Breadcrumbs {...args}>
            <Breadcrumbs.Item
                label={'Home'}
                href={'/'}
            />
            <Breadcrumbs.Item
                label={'Products'}
                href={'/products'}
            />
            <Breadcrumbs.Item label={currentLabel} />
        </Breadcrumbs>
    ),
}

export const CurrentItem: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Breadcrumbs aria-label="Breadcrumb">
  <Breadcrumbs.Item label="Home" href="/" />
  <Breadcrumbs.Item label="Products" href="/products" current />
  <Breadcrumbs.Item label="Details" href="/products/details" />
</Breadcrumbs>`),
        },
    },
    render: () => (
        <Breadcrumbs aria-label={'Breadcrumb'}>
            <Breadcrumbs.Item
                label={'Home'}
                href={'/'}
            />
            <Breadcrumbs.Item
                label={'Products'}
                href={'/products'}
                current
            />
            <Breadcrumbs.Item
                label={'Details'}
                href={'/products/details'}
            />
        </Breadcrumbs>
    ),
}

export const Separators: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Breadcrumbs aria-label="Chevron breadcrumb" separator="chevron">
  <Breadcrumbs.Item label="Home" href="/" />
  <Breadcrumbs.Item label="Products" href="/products" />
  <Breadcrumbs.Item label="Current" />
</Breadcrumbs>
<Breadcrumbs aria-label="Slash breadcrumb" separator="slash">
  <Breadcrumbs.Item label="Home" href="/" />
  <Breadcrumbs.Item label="Products" href="/products" />
  <Breadcrumbs.Item label="Current" />
</Breadcrumbs>
<Breadcrumbs aria-label="Dot breadcrumb" separator="dot">
  <Breadcrumbs.Item label="Home" href="/" />
  <Breadcrumbs.Item label="Products" href="/products" />
  <Breadcrumbs.Item label="Current" />
</Breadcrumbs>
<Breadcrumbs aria-label="Reverse slash breadcrumb" separator="reverseSlash">
  <Breadcrumbs.Item label="Home" href="/" />
  <Breadcrumbs.Item label="Products" href="/products" />
  <Breadcrumbs.Item label="Current" />
</Breadcrumbs>
<Breadcrumbs aria-label="Dash breadcrumb" separator="dash">
  <Breadcrumbs.Item label="Home" href="/" />
  <Breadcrumbs.Item label="Products" href="/products" />
  <Breadcrumbs.Item label="Current" />
</Breadcrumbs>`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '1rem' }}>
            {(['chevron', 'slash', 'dot', 'reverseSlash', 'dash'] as const).map((separator) => (
                <Breadcrumbs
                    key={separator}
                    aria-label={`${separator} breadcrumb`}
                    separator={separator}
                >
                    <Breadcrumbs.Item
                        label={'Home'}
                        href={'/'}
                    />
                    <Breadcrumbs.Item
                        label={'Products'}
                        href={'/products'}
                    />
                    <Breadcrumbs.Item label={'Current'} />
                </Breadcrumbs>
            ))}
        </div>
    ),
}

export const Colors: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Breadcrumbs aria-label="Primary breadcrumb" color="primary.main"><Breadcrumbs.Item label="Home" href="/" /><Breadcrumbs.Item label="Current" /></Breadcrumbs>
<Breadcrumbs aria-label="Secondary breadcrumb" color="secondary.main"><Breadcrumbs.Item label="Home" href="/" /><Breadcrumbs.Item label="Current" /></Breadcrumbs>
<Breadcrumbs aria-label="Tertiary breadcrumb" color="neutral.main"><Breadcrumbs.Item label="Home" href="/" /><Breadcrumbs.Item label="Current" /></Breadcrumbs>
<Breadcrumbs aria-label="Destructive breadcrumb" color="danger.main"><Breadcrumbs.Item label="Home" href="/" /><Breadcrumbs.Item label="Current" /></Breadcrumbs>
<Breadcrumbs aria-label="Success breadcrumb" color="success.main"><Breadcrumbs.Item label="Home" href="/" /><Breadcrumbs.Item label="Current" /></Breadcrumbs>
<Breadcrumbs aria-label="Warning breadcrumb" color="warning.main"><Breadcrumbs.Item label="Home" href="/" /><Breadcrumbs.Item label="Current" /></Breadcrumbs>
<Breadcrumbs aria-label="Info breadcrumb" color="info.main"><Breadcrumbs.Item label="Home" href="/" /><Breadcrumbs.Item label="Current" /></Breadcrumbs>`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '1rem' }}>
            {(['primary.main', 'secondary.main', 'neutral.main', 'danger.main', 'success.main', 'warning.main', 'info.main'] as const).map((color) => (
                <Breadcrumbs
                    key={color}
                    aria-label={`${color} breadcrumb`}
                    color={color}
                >
                    <Breadcrumbs.Item
                        label={'Home'}
                        href={'/'}
                    />
                    <Breadcrumbs.Item label={'Current'} />
                </Breadcrumbs>
            ))}
        </div>
    ),
}
