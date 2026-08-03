import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'

import { Breadcrumbs } from '@components/navigation/breadcrumbs'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| ---------------- | -------- | ---- | ----- |
| \`aria-label\` | Yes | \`string\` | Names the breadcrumb navigation landmark. |
| \`items\` | Yes | \`BreadcrumbItem[]\` | The last item is current unless another item sets \`current\`. |
| \`color\` | No | \`LinkColor\` | Theme color applied to links unless an item overrides it. |
| \`separator\` | No | \`"chevron" \| "slash" \| "dot" \| "reverseSlash" \| "dash"\` | Visual separator between items. Defaults to \`chevron\`. |
| \`aria-current\` | Automatic | \`"page"\` | Applied to the current breadcrumb item. |
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

const meta = {
    title: 'Navigation/Breadcrumbs',
    component: Breadcrumbs,
    parameters: {
        layout: 'centered',
        docs: {
            page: BreadcrumbsDocsPage,
            description: {
                component: md /* language=markdown */ `
A breadcrumb trail helps users understand their location within a hierarchy.
Ancestor items render as links and the current item is rendered as plain text.

**Usage**

~~~tsx
<Breadcrumbs
  aria-label="Breadcrumb"
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Details" },
  ]}
/>
~~~
                `,
            },
        },
    },
    argTypes: {
        'aria-label': { control: 'text' },
        items: { control: 'object' },
        color: {
            control: 'select',
            options: [
                'primary',
                'secondary',
                'tertiary',
                'destructive',
                'success',
                'warning',
                'info',
            ],
        },
        separator: {
            control: 'select',
            options: ['chevron', 'slash', 'dot', 'reverseSlash', 'dash'],
        },
    },
    args: {
        'aria-label': 'Breadcrumb',
        color: 'primary',
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
        ],
    },
} satisfies Meta<typeof Breadcrumbs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    args: meta.args,
    parameters: {
        docs: {
            description: {
                story: 'Use the Controls panel to experiment with the breadcrumb contract.',
            },
            ...storySource(/* language=tsx */ `
<Breadcrumbs aria-label="Breadcrumb" items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Details" }]} />`),
        },
    },
}

export const CurrentItem: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Breadcrumbs
  aria-label="Breadcrumb"
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products", current: true },
    { label: "Details", href: "/products/details" },
  ]}
/>`),
        },
    },
    render: () => (
        <Breadcrumbs
            aria-label={'Breadcrumb'}
            items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products', current: true },
                { label: 'Details', href: '/products/details' },
            ]}
        />
    ),
}

export const Separators: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Breadcrumbs aria-label="Chevron breadcrumb" separator="chevron" items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Current" }]} />
<Breadcrumbs aria-label="Slash breadcrumb" separator="slash" items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Current" }]} />
<Breadcrumbs aria-label="Dot breadcrumb" separator="dot" items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Current" }]} />
<Breadcrumbs aria-label="Reverse slash breadcrumb" separator="reverseSlash" items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Current" }]} />
<Breadcrumbs aria-label="Dash breadcrumb" separator="dash" items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Current" }]} />`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '1rem' }}>
            <Breadcrumbs
                aria-label={'Chevron breadcrumb'}
                separator={'chevron'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Current' },
                ]}
            />
            <Breadcrumbs
                aria-label={'Slash breadcrumb'}
                separator={'slash'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Current' },
                ]}
            />
            <Breadcrumbs
                aria-label={'Dot breadcrumb'}
                separator={'dot'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Current' },
                ]}
            />
            <Breadcrumbs
                aria-label={'Reverse slash breadcrumb'}
                separator={'reverseSlash'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Current' },
                ]}
            />
            <Breadcrumbs
                aria-label={'Dash breadcrumb'}
                separator={'dash'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: 'Current' },
                ]}
            />
        </div>
    ),
}

export const Colors: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Breadcrumbs aria-label="Primary breadcrumb" color="primary" items={[{ label: "Home", href: "/" }, { label: "Current" }]} />
<Breadcrumbs aria-label="Secondary breadcrumb" color="secondary" items={[{ label: "Home", href: "/" }, { label: "Current" }]} />
<Breadcrumbs aria-label="Tertiary breadcrumb" color="tertiary" items={[{ label: "Home", href: "/" }, { label: "Current" }]} />
<Breadcrumbs aria-label="Destructive breadcrumb" color="destructive" items={[{ label: "Home", href: "/" }, { label: "Current" }]} />
<Breadcrumbs aria-label="Success breadcrumb" color="success" items={[{ label: "Home", href: "/" }, { label: "Current" }]} />
<Breadcrumbs aria-label="Warning breadcrumb" color="warning" items={[{ label: "Home", href: "/" }, { label: "Current" }]} />
<Breadcrumbs aria-label="Info breadcrumb" color="info" items={[{ label: "Home", href: "/" }, { label: "Current" }]} />`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '1rem' }}>
            <Breadcrumbs
                aria-label={'Primary breadcrumb'}
                color={'primary'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Current' },
                ]}
            />
            <Breadcrumbs
                aria-label={'Secondary breadcrumb'}
                color={'secondary'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Current' },
                ]}
            />
            <Breadcrumbs
                aria-label={'Tertiary breadcrumb'}
                color={'tertiary'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Current' },
                ]}
            />
            <Breadcrumbs
                aria-label={'Destructive breadcrumb'}
                color={'destructive'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Current' },
                ]}
            />
            <Breadcrumbs
                aria-label={'Success breadcrumb'}
                color={'success'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Current' },
                ]}
            />
            <Breadcrumbs
                aria-label={'Warning breadcrumb'}
                color={'warning'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Current' },
                ]}
            />
            <Breadcrumbs
                aria-label={'Info breadcrumb'}
                color={'info'}
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Current' },
                ]}
            />
        </div>
    ),
}
