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

import { Image } from '@components/layout/image'
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
const WH = [undefined, '100%', '50%', '200px', 'auto'] as const
const MIN_MAX = [undefined, 'none', '100%', '200px'] as const

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`alt\` | Conditional | \`string\` | Use an empty string for decorative images. |
| \`loading\` | No | \`'eager' \| 'lazy'\` | Use \`lazy\` below the fold. |
`

const ImageDocsPage = () => (
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
    title: 'Layout/Image',
    component: Image,
    parameters: {
        layout: 'padded',
        docs: {
            page: ImageDocsPage,
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A design-token-aware image primitive that renders a native \`<img>\` element and exposes layout props for object-fit, object-position, border-radius, padding, margin, background color, width, height, and aspect-ratio.

**Usage**

\`\`\`tsx
// Responsive image with rounded corners
<Image
  src="/photo.jpg"
  alt="A scenic landscape"
  borderRadius="lg"
  objectFit="cover"
  aspectRatio="16 / 9"
  width="100%"
/>

// Thumbnail
<Image
  src="/avatar.jpg"
  alt="User avatar"
  borderRadius="full"
  width="48px"
  height="48px"
  objectFit="cover"
/>
\`\`\`

                `,
            },
        },
    },
    argTypes: {
        objectFit: { control: 'select', options: OBJECT_FIT },
        objectPosition: { control: 'select', options: OBJECT_POSITION },
        borderRadius: { control: 'select', options: ROUNDED },
        padding: { control: 'select', options: SPACING },
        margin: { control: 'select', options: [...SPACING, 'auto'] },
        backgroundColor: { control: 'text', description: 'CSS color or custom-property reference; style wins.' },
        width: { control: 'select', options: WH },
        height: { control: 'select', options: WH },
        minWidth: { control: 'select', options: MIN_MAX },
        maxWidth: { control: 'select', options: MIN_MAX },
        minHeight: { control: 'select', options: MIN_MAX },
        maxHeight: { control: 'select', options: MIN_MAX },
        aspectRatio: { control: 'text' },
    },
    args: {
        src: 'https://picsum.photos/seed/shadcn/400/300',
        alt: 'A sample image',
        objectFit: 'cover',
        borderRadius: 'md',
        width: '100%',
        aspectRatio: '4 / 3',
    },
} satisfies Meta<typeof Image>

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
<Image src="https://picsum.photos/seed/shadcn/400/300" alt="A sample image" objectFit="cover" borderRadius="md" width="100%" aspectRatio="4 / 3" />`),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('img')).toBeInTheDocument()
    },
}
