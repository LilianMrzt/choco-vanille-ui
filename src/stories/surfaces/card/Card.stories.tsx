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
import type { ComponentProps } from 'react'

import { Button } from '@components/actions/button'
import { IconButton } from '@components/actions/icon-button'
import { Card } from '@components/surfaces/card'
import {
    Typography,
    type TypographyProps,
} from '@components/foundation/typography'
import type { BoxSpace, BoxVariant } from '@components/layout/box'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

type CardPlaygroundArgs = ComponentProps<typeof Card> & {
  headerAs?: 'div' | 'header';
  title?: string;
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleFontSize?: TypographyProps['fontSize'];
  titleFontWeight?: TypographyProps['fontWeight'];
  description?: string;
  descriptionFontSize?: TypographyProps['fontSize'];
  bodyAs?: 'div' | 'section';
  bodyPadding?: BoxSpace;
  footerAs?: 'div' | 'footer';
  showFooter?: boolean;
  footerActionLabel?: string;
};

const CARD_ELEMENTS: BoxVariant[] = [
    'div',
    'section',
    'article',
    'aside',
    'main',
    'header',
    'footer',
    'nav',
    'ul',
    'ol',
    'li',
    'form',
    'fieldset',
    'figure',
    'figcaption',
    'details',
    'summary',
    'dialog',
    'address',
    'span',
]

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required    | Type                                 | Notes                                                |
| ---------------- | ----------- | ------------------------------------ | ---------------------------------------------------- |
| \`title\`          | Recommended | \`string\`                             | Provides an accessible heading for card content.     |
| \`titleAs\`        | No          | \`h1\`–\`h6\`                            | Choose the heading level that fits the page outline. |
| \`as\`             | No          | Supported HTML element                      | Use the semantically correct element.                |

**Sub-components**

| Sub-component | Description |
| ------------- | ----------- |
| \`Card\` | Root surface container. |
| \`Card.Header\` | Title, description, and actions. |
| \`Card.Body\` | Main content area. |
| \`Card.Footer\` | Bottom area for actions or metadata. |
`

const CardDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const HEADING_LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
const SPACING = [
    undefined,
    'none',
    'px',
    'xxs',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
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
const BG_COLORS = [
    undefined,
    'transparent',
    'background',
    'surface',
    'surfaceMuted',
    'primary',
    'primarySubtle',
    'secondary',
    'secondarySubtle',
    'successSubtle',
    'warningSubtle',
    'infoSubtle',
    'dangerSubtle',
] as const

const meta: Meta<CardPlaygroundArgs> = {
    title: 'Surfaces/Card',
    component: Card,
    parameters: {
        layout: 'centered',
        docs: {
            page: CardDocsPage,
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A surface container with consistent background, border, shadow and rounded corners.
Built on \`Box\`. Compose with \`Card.Header\`, \`Card.Body\` and \`Card.Footer\`.

\`Card.Header\` accepts props for title, description and actions directly — no separate sub-components needed. Customize the typography via \`titleProps\` and \`descriptionProps\`.

**Usage**

~~~tsx
<Card>
  <Card.Header
    title="Account settings"
    description="Manage your profile."
    titleAs="h3"
    titleProps={{ fontSize: 'lg', fontWeight: 'semibold' }}
    actions={
      <IconButton
        icon={SearchIcon}
        aria-label="More"
        variant="ghost"
        color="primary"
      />
    }
  />
  <Card.Body>…</Card.Body>
  <Card.Footer>
    <Button label="Save" variant="contained" color="primary" />
  </Card.Footer>
</Card>
~~~

        `,
            },
        },
    },
    argTypes: {
        as: {
            control: 'select',
            options: CARD_ELEMENTS,
            table: { category: 'Card' },
        },
        borderRadius: {
            control: 'select',
            options: ROUNDED,
            table: { category: 'Card' },
        },
        borderWidth: {
            control: 'select',
            options: [undefined, '0', '1px', '2px', '4px', '8px'],
            table: { category: 'Card' },
        },
        borderStyle: {
            control: 'select',
            options: [undefined, 'solid', 'dashed', 'dotted', 'double'],
            table: { category: 'Card' },
        },
        backgroundColor: {
            control: 'select',
            options: BG_COLORS,
            table: { category: 'Card' },
        },
        padding: {
            control: 'select',
            options: SPACING,
            table: { category: 'Card' },
        },
        headerAs: {
            control: 'select',
            options: ['div', 'header'],
            table: { category: 'Card.Header' },
        },
        title: {
            control: 'text',
            table: { category: 'Card.Header' },
        },
        titleAs: {
            control: 'select',
            options: HEADING_LEVELS,
            table: { category: 'Card.Header' },
        },
        titleFontSize: {
            control: 'select',
            options: [
                undefined,
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
            ],
            table: { category: 'Card.Header' },
        },
        titleFontWeight: {
            control: 'select',
            options: [
                undefined,
                'thin',
                'extralight',
                'light',
                'normal',
                'medium',
                'semibold',
                'bold',
                'extrabold',
                'black',
            ],
            table: { category: 'Card.Header' },
        },
        description: {
            control: 'text',
            table: { category: 'Card.Header' },
        },
        descriptionFontSize: {
            control: 'select',
            options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
            table: { category: 'Card.Header' },
        },
        bodyAs: {
            control: 'select',
            options: ['div', 'section'],
            table: { category: 'Card.Body' },
        },
        bodyPadding: {
            control: 'select',
            options: SPACING,
            table: { category: 'Card.Body' },
        },
        footerAs: {
            control: 'select',
            options: ['div', 'footer'],
            table: { category: 'Card.Footer' },
        },
        showFooter: {
            control: 'boolean',
            table: { category: 'Card.Footer' },
        },
        footerActionLabel: {
            control: 'text',
            table: { category: 'Card.Footer' },
        },
    },
    args: {
        as: 'div',
        borderRadius: 'lg',
        headerAs: 'div',
        title: 'Account settings',
        titleAs: 'h3',
        description: 'Manage your profile and preferences.',
        bodyAs: 'div',
        bodyPadding: undefined,
        footerAs: 'div',
        showFooter: true,
        footerActionLabel: 'Save changes',
    },
} satisfies Meta<CardPlaygroundArgs>

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
<Card>
    <Card.Header title="Account settings" description="Manage your profile." />
    <Card.Body>Content goes here.</Card.Body>
    <Card.Footer>
        <Button label="Save" variant="contained" color="primary" />
    </Card.Footer>
</Card>`),
        },
    },
    render: ({
        as,
        borderRadius,
        borderWidth,
        borderStyle,
        backgroundColor,
        padding,
        headerAs,
        title,
        titleAs,
        titleFontSize,
        titleFontWeight,
        description,
        descriptionFontSize,
        bodyAs,
        bodyPadding,
        footerAs,
        showFooter,
        footerActionLabel,
    }) => (
        <Card
            as={as}
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            borderStyle={borderStyle}
            backgroundColor={backgroundColor}
            padding={padding}
            style={{ width: '22rem' }}
        >
            <Card.Header
                as={headerAs}
                title={title}
                titleAs={titleAs}
                titleProps={
                    titleFontSize || titleFontWeight
                        ? { fontSize: titleFontSize, fontWeight: titleFontWeight }
                        : undefined
                }
                description={description}
                descriptionProps={
                    descriptionFontSize ? { fontSize: descriptionFontSize } : undefined
                }
                actions={
                    <IconButton
                        icon={SearchIcon}
                        aria-label={'More options'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                    />
                }
            />
            <Card.Body
                as={bodyAs}
                padding={bodyPadding}
            >
                <Typography
                    variant={'p'}
                    fontSize={'sm'}
                    color={'foreground'}
                >
                    Your content goes here.
                </Typography>
            </Card.Body>
            {showFooter && (
                <Card.Footer as={footerAs}>
                    <Button
                        label={footerActionLabel ?? 'Save changes'}
                        variant={'contained'}
                        color={'primary'}
                        size={'sm'}
                    />
                    <Button
                        label={'Cancel'}
                        variant={'outlined'}
                        color={'primary'}
                        size={'sm'}
                    />
                </Card.Footer>
            )}
        </Card>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('Account settings')).toBeInTheDocument()
    },
}
