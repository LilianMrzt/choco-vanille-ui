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

import { SvgImage } from '@components/layout/svg-image'
import ImageIcon from '@resources/asset/ImageIcon.svg?react'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const OBJECT_FIT = [
    undefined,
    'contain',
    'cover',
    'fill',
    'none',
    'scale-down',
] as const
const OBJECT_POSITION = [
    undefined,
    'center',
    'top',
    'bottom',
    'left',
    'right',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
] as const
const ROUNDED = [
    undefined,
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    'full',
] as const
const SPACING = [
    undefined,
    'none',
    'px',
    'xxs',
    'xs',
    'xs2',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
] as const
const BG = [
    undefined,
    'transparent',
    'background',
    'card',
    'muted',
    'primary',
    'primarySubtle',
    'secondary',
    'secondarySubtle',
] as const
const DIMENSIONS = [undefined, 'auto', '100%', '50%', '200px'] as const

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required    | Type      | Notes                                                                           |
| ---------------- | ----------- | --------- | ------------------------------------------------------------------------------- |
| \`alt\`            | Conditional | \`string\`  | Describes an informative SVG image; use an empty string for a decorative image. |
| \`aria-label\`     | Conditional | \`string\`  | Alternative accessible name when \`alt\` is not suitable.                         |
| \`aria-hidden\`    | Auto        | \`boolean\` | Applied when no accessible name is provided.                                    |
`

const SvgImageDocsPage = () => (
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
    title: 'Layout/SvgImage',
    component: SvgImage,
    parameters: {
        layout: 'padded',
        docs: {
            page: SvgImageDocsPage,
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A design-token-aware wrapper for locally bundled SVG components. Unlike \`Icon\`, \`SvgImage\` does not impose a fixed size scale and instead exposes image-like dimensions and object positioning.

**Usage**

~~~tsx
import Logo from './Logo.svg?react'

<SvgImage image={Logo} alt="Choco Vanille" width="240px" height="80px" />
<SvgImage image={Logo} alt="" width="100%" />
~~~
        `,
            },
        },
    },
    argTypes: {
        image: { control: false },
        alt: { control: 'text' },
        'aria-label': { control: 'text' },
        objectFit: { control: 'select', options: OBJECT_FIT },
        objectPosition: { control: 'select', options: OBJECT_POSITION },
        borderRadius: { control: 'select', options: ROUNDED },
        padding: { control: 'select', options: SPACING },
        margin: { control: 'select', options: [...SPACING, 'auto'] },
        backgroundColor: { control: 'select', options: BG },
        width: { control: 'select', options: DIMENSIONS },
        height: { control: 'select', options: DIMENSIONS },
        minWidth: { control: 'select', options: DIMENSIONS },
        maxWidth: { control: 'select', options: DIMENSIONS },
        minHeight: { control: 'select', options: DIMENSIONS },
        maxHeight: { control: 'select', options: DIMENSIONS },
        aspectRatio: { control: 'text' },
    },
    args: {
        image: ImageIcon,
        alt: 'Image illustration',
        width: '200px',
        height: '200px',
        objectFit: 'contain',
    },
} satisfies Meta<typeof SvgImage>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to change the SVG image dimensions, object positioning, spacing, background, and accessible name.',
            },
            ...storySource(/* language=tsx */ `
<SvgImage image={ImageIcon} alt="Image illustration" width="200px" height="200px" objectFit="contain" />`),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole('img', { name: 'Image illustration' }),
        ).toBeInTheDocument()
    },
}

export const ObjectFits: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<SvgImage image={ImageIcon} alt="contain" objectFit="contain" width="120px" height="120px" />
<SvgImage image={ImageIcon} alt="cover" objectFit="cover" width="120px" height="120px" />
<SvgImage image={ImageIcon} alt="fill" objectFit="fill" width="120px" height="120px" />
<SvgImage image={ImageIcon} alt="none" objectFit="none" width="120px" height="120px" />
<SvgImage image={ImageIcon} alt="scale-down" objectFit="scale-down" width="120px" height="120px" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '1rem' }}>
            {OBJECT_FIT.slice(1).map((objectFit) => (
                <SvgImage
                    key={objectFit}
                    image={ImageIcon}
                    alt={objectFit}
                    objectFit={objectFit}
                    width={'120px'}
                    height={'120px'}
                />
            ))}
        </div>
    ),
}
