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
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const FONT_SIZES: TypographySize[] = [
    '2xs',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
]
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
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
]
const SPACING = [
    undefined,
    'none',
    'px',
    'xxs',
    'xs',
    'xs2',
    'sm',
    'sm2',
    'md',
    'md2',
    'lg',
    'lg2',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    'auto',
] as const
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
            canvas.getByRole('link', { name: args.label as string }),
        ).toBeInTheDocument()
    },
}

export const FontSizes: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Link label="2xs" fontSize="2xs" />
<Link label="md" fontSize="md" />
<Link label="6xl" fontSize="6xl" />`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
            {FONT_SIZES.map((fontSize) => (
                <Link
                    key={fontSize}
                    label={fontSize}
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
<Link label="Primary" color="primary" />
<Link label="Secondary" color="secondary" />
<Link label="Tertiary" color="tertiary" />
<Link label="Destructive" color="destructive" />
<Link label="Success" color="success" />
<Link label="Warning" color="warning" />
<Link label="Info" color="info" />`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
            <Link
                label={'Primary'}
                color={'primary'}
            />
            <Link
                label={'Secondary'}
                color={'secondary'}
            />
            <Link
                label={'Tertiary'}
                color={'tertiary'}
            />
            <Link
                label={'Destructive'}
                color={'destructive'}
            />
            <Link
                label={'Success'}
                color={'success'}
            />
            <Link
                label={'Warning'}
                color={'warning'}
            />
            <Link
                label={'Info'}
                color={'info'}
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
