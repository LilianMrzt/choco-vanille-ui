import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { Link, type LinkColor } from '@components/navigation/link'
import ChevronLeftIcon from '@resources/asset/ChevronLeftIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import type { IconSize } from '@components/foundation/icon'
import type {
    TypographySize,
    TypographyWeight,
} from '@components/foundation/typography'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const FONT_SIZES: TypographySize[] = [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72]
const FONT_WEIGHTS: TypographyWeight[] = [
    'thin',
    'extralight',
    'light',
    'normal',
    'medium',
    'semibold',
    'bold',
    'extrabold',
    'black',
]
const ICON_SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const LINK_COLORS: LinkColor[] = [
    'primary.main',
    'secondary.main',
    'neutral.main',
    'danger.main',
    'success.main',
    'warning.main',
    'info.main',
]
const SPACING = [undefined, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128, 'auto'] as const
const PADDINGS = SPACING.filter((value) => value !== 'auto')
const WIDTHS = [undefined, '100%', 'fit-content'] as const
const ALIGN_SELF = [
    undefined,
    'auto',
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
] as const

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type     | Notes                                      |
| ---------------- | -------- | -------- | ------------------------------------------ |
| \`label\` | Yes | \`string\` | Becomes the link's accessible name. |
| \`href\` | No | \`string\` | Rendered as the native \`href\`. |
| \`color\` | No | \`LinkColor\` | Theme color of the link. Defaults to the semantic link color. |
| \`aria-*\` | No | — | Native link ARIA attributes are forwarded. |
`

const LinkDocsPage = () => (
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
    title: 'Navigation/Link',
    component: Link,
    parameters: {
        layout: 'centered',
        docs: {
            page: LinkDocsPage,
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A text link that renders a native \`<a>\` element for accessibility while supporting
client-side navigation through an \`onClick\` handler. This makes it easy to wire up
to React Router (or any other router) without losing the semantic benefits of a real
hyperlink. Optional start and end icons can be added with Iconify icon names.

**Usage**

~~~tsx
import { useNavigate } from 'react-router';

function Example() {
  const navigate = useNavigate();

  return (
    <Link
      href="/dashboard"
      label="Dashboard"
      onClick={() => navigate('/dashboard')}
      endIcon={ChevronRightIcon}
    />
  );
}
~~~

        `,
            },
        },
    },
    argTypes: {
        href: { control: 'text' },
        label: { control: 'text' },
        color: { control: 'select', options: LINK_COLORS },
        startIcon: { control: 'text' },
        endIcon: { control: 'text' },
        fontSize: { control: 'select', options: FONT_SIZES },
        fontWeight: { control: 'select', options: FONT_WEIGHTS },
        iconSize: { control: 'select', options: ICON_SIZES },
        margin: { control: 'select', options: SPACING },
        marginTop: { control: 'select', options: SPACING },
        marginRight: { control: 'select', options: SPACING },
        marginBottom: { control: 'select', options: SPACING },
        marginLeft: { control: 'select', options: SPACING },
        padding: { control: 'select', options: PADDINGS },
        width: { control: 'select', options: WIDTHS },
        alignSelf: { control: 'select', options: ALIGN_SELF },
        target: { control: 'text' },
        rel: { control: 'text' },
        onClick: { action: 'clicked' },
    },
    args: {
        href: '/',
        label: 'Link',
    },
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
            ...storySource(/* language=tsx */ `
<Link href="/dashboard" label="Dashboard" endIcon={ChevronRightIcon} />`),
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole('link.main', { name: args.label as string }),
        ).toBeInTheDocument()
    },
}

export const FontSizes: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Link label="10" fontSize={10} />
<Link label="12" fontSize={12} />
<Link label="14" fontSize={14} />
<Link label="16" fontSize={16} />
<Link label="18" fontSize={18} />
<Link label="20" fontSize={20} />
<Link label="24" fontSize={24} />
<Link label="30" fontSize={30} />
<Link label="36" fontSize={36} />
<Link label="48" fontSize={48} />
<Link label="60" fontSize={60} />
<Link label="72" fontSize={72} />`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
            {FONT_SIZES.map((fontSize) => (
                <Link
                    key={fontSize}
                    label={String(fontSize)}
                    fontSize={fontSize}
                />
            ))}
        </div>
    ),
}

export const Colors: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Link label="Primary" color={'primary.main'} />
<Link label="Secondary" color={'secondary.main'} />
<Link label="Tertiary" color={'neutral.main'} />
<Link label="Destructive" color={'danger.main'} />
<Link label="Success" color={'success.main'} />
<Link label="Warning" color={'warning.main'} />
<Link label="Info" color={'info.main'} />`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
            <Link
                label={'Primary'}
                color={'primary.main'}
            />
            <Link
                label={'Secondary'}
                color={'secondary.main'}
            />
            <Link
                label={'Tertiary'}
                color={'neutral.main'}
            />
            <Link
                label={'Destructive'}
                color={'danger.main'}
            />
            <Link
                label={'Success'}
                color={'success.main'}
            />
            <Link
                label={'Warning'}
                color={'warning.main'}
            />
            <Link
                label={'Info'}
                color={'info.main'}
            />
        </div>
    ),
}

export const FontWeights: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Link label="thin" fontWeight="thin" />
<Link label="medium" fontWeight="medium" />
<Link label="black" fontWeight="black" />`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
            {FONT_WEIGHTS.map((fontWeight) => (
                <Link
                    key={fontWeight}
                    label={fontWeight}
                    fontWeight={fontWeight}
                />
            ))}
        </div>
    ),
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Link label="Start icon" startIcon={ChevronLeftIcon} />
<Link label="End icon" endIcon={ChevronRightIcon} />
<Link label="Both icons" startIcon={ChevronLeftIcon} endIcon={ChevronRightIcon} />`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
            <Link
                label={'Start icon'}
                startIcon={ChevronLeftIcon}
            />
            <Link
                label={'End icon'}
                endIcon={ChevronRightIcon}
            />
            <Link
                label={'Both icons'}
                startIcon={ChevronLeftIcon}
                endIcon={ChevronRightIcon}
            />
        </div>
    ),
}
