import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import type { ComponentProps } from 'react'

import type { BoxRecipeVariants } from '@components/layout/box'
import type { TypographyProps } from '@components/foundation/typography'

import { Button, Card, Flex, IconButton, Typography } from '@components'

// Shared option lists
const HEADING_LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
const SPACING = [undefined, 'none', 'px', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const
const ROUNDED = [undefined, 'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const
const BG_COLORS = [
    undefined, 'transparent', 'background', 'card', 'muted',
    'primary', 'primarySubtle', 'secondary', 'secondarySubtle',
    'successSubtle', 'warningSubtle', 'infoSubtle', 'destructiveSubtle',
] as const

/**
 * Extended args type for the Playground story that adds sub-component controls
 * on top of the root Card props.
 */
type CardPlaygroundArgs = ComponentProps<typeof Card> & {
    headerAs?: 'div' | 'header'
    title?: string
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    titleFontSize?: TypographyProps['fontSize']
    titleFontWeight?: TypographyProps['fontWeight']
    description?: string
    descriptionFontSize?: TypographyProps['fontSize']
    bodyAs?: 'div' | 'section'
    bodyPadding?: BoxRecipeVariants['p']
    footerAs?: 'div' | 'footer'
    showFooter?: boolean
    footerActionLabel?: string
}

const meta: Meta<CardPlaygroundArgs> = {
    title: 'Layout/Card',
    component: Card,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A surface container with consistent background, border, shadow and rounded corners.
Built on \`Box\`. Compose with \`Card.Header\`, \`Card.Body\` and \`Card.Footer\`.

\`Card.Header\` accepts **props** for title, description and actions directly — no separate sub-components needed. Customize the typography via \`titleProps\` and \`descriptionProps\`.

**Usage**
\`\`\`tsx
<Card>
  <Card.Header
    title="Account settings"
    description="Manage your profile."
    titleAs="h3"
    titleProps={{ fontSize: 'lg', fontWeight: 'semibold' }}
    actions={<IconButton icon="mdi:dots-vertical" aria-label="More" variant="ghost" color="primary" />}
  />
  <Card.Body>…</Card.Body>
  <Card.Footer>
    <Button label="Save" variant="contained" color="primary" />
  </Card.Footer>
</Card>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        // Card
        as: {
            control: 'select',
            options: ['div', 'section', 'article', 'aside'],
            description: '**Card** — HTML element.',
            table: { category: 'Card' },
        },
        rounded: {
            control: 'select',
            options: ROUNDED,
            description: '**Card** — Border-radius token override.',
            table: { category: 'Card' },
        },
        bg: {
            control: 'select',
            options: BG_COLORS,
            description: '**Card** — Background color token override.',
            table: { category: 'Card' },
        },
        p: {
            control: 'select',
            options: SPACING,
            description: '**Card** — Padding override (all sides).',
            table: { category: 'Card' },
        },
        // Card.Header
        headerAs: {
            control: 'select',
            options: ['div', 'header'],
            description: '**Card.Header** — HTML element.',
            table: { category: 'Card.Header' },
        },
        title: {
            control: 'text',
            description: '**Card.Header** — Title text.',
            table: { category: 'Card.Header' },
        },
        titleAs: {
            control: 'select',
            options: HEADING_LEVELS,
            description: '**Card.Header** — Heading level.',
            table: { category: 'Card.Header' },
        },
        titleFontSize: {
            control: 'select',
            options: [undefined, 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
            description: '**Card.Header** — Title font-size override (`titleProps.fontSize`).',
            table: { category: 'Card.Header' },
        },
        titleFontWeight: {
            control: 'select',
            options: [undefined, 'thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
            description: '**Card.Header** — Title font-weight override (`titleProps.fontWeight`).',
            table: { category: 'Card.Header' },
        },
        description: {
            control: 'text',
            description: '**Card.Header** — Description text.',
            table: { category: 'Card.Header' },
        },
        descriptionFontSize: {
            control: 'select',
            options: [undefined, 'xs', 'sm', 'base', 'lg', 'xl', '2xl'],
            description: '**Card.Header** — Description font-size override (`descriptionProps.fontSize`).',
            table: { category: 'Card.Header' },
        },
        // Card.Body
        bodyAs: {
            control: 'select',
            options: ['div', 'section'],
            description: '**Card.Body** — HTML element.',
            table: { category: 'Card.Body' },
        },
        bodyPadding: {
            control: 'select',
            options: SPACING,
            description: '**Card.Body** — Padding override.',
            table: { category: 'Card.Body' },
        },
        // Card.Footer
        footerAs: {
            control: 'select',
            options: ['div', 'footer'],
            description: '**Card.Footer** — HTML element.',
            table: { category: 'Card.Footer' },
        },
        showFooter: {
            control: 'boolean',
            description: '**Card.Footer** — Show or hide the footer.',
            table: { category: 'Card.Footer' },
        },
        footerActionLabel: {
            control: 'text',
            description: '**Card.Footer** — Primary action button label.',
            table: { category: 'Card.Footer' },
        },
    },
    args: {
        as: 'div',
        rounded: undefined,
        bg: undefined,
        p: undefined,
        headerAs: 'div',
        title: 'Account settings',
        titleAs: 'h3',
        titleFontSize: undefined,
        titleFontWeight: undefined,
        description: 'Manage your profile and preferences.',
        descriptionFontSize: undefined,
        bodyAs: 'div',
        bodyPadding: undefined,
        footerAs: 'div',
        showFooter: true,
        footerActionLabel: 'Save changes',
    },
} satisfies Meta<CardPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>

// Playground

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground — every prop for all sub-components is exposed in the Controls panel, grouped by component.',
            },
        },
    },
    render: ({
        as,
        rounded,
        bg,
        p,
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
            rounded={rounded}
            bg={bg}
            p={p}
            style={{ width: '22rem' }}
        >
            <Card.Header
                as={headerAs}
                title={title}
                titleAs={titleAs}
                titleProps={titleFontSize || titleFontWeight ? { fontSize: titleFontSize, fontWeight: titleFontWeight } : undefined}
                description={description}
                descriptionProps={descriptionFontSize ? { fontSize: descriptionFontSize } : undefined}
                actions={(
                    <IconButton
                        icon={'mdi:dots-vertical'}
                        aria-label={'More options'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                    />
                )}
            />
            <Card.Body
                as={bodyAs}
                p={bodyPadding}
            >
                <Typography
                    variant={'p'}
                    fontSize={'sm'}
                    color={'foreground'}
                >
                    {'Your content goes here.'}
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

// With actions

export const WithActions: Story = {
    name: 'Header with actions',
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'The `actions` prop on `Card.Header` renders any `ReactNode` in the trailing corner — typically an `IconButton` or a row of buttons.',
            },
        },
    },
    render: () => (
        <Card style={{ width: '22rem' }}>
            <Card.Header
                title={'Team members'}
                description={'Invite and manage your team.'}
                actions={(
                    <IconButton
                        icon={'mdi:plus'}
                        aria-label={'Add member'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                    />
                )}
            />
            <Card.Body>
                <Typography
                    variant={'p'}
                    fontSize={'sm'}
                    color={'mutedForeground'}
                >
                    {'3 members · 1 pending invitation'}
                </Typography>
            </Card.Body>
        </Card>
    ),
}

// Full composition

export const FullComposition: Story = {
    name: 'Full composition',
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: '`Card.Header` (title + description + actions), `Card.Body` and `Card.Footer` composed together.',
            },
        },
    },
    render: () => (
        <Card style={{ width: '22rem' }}>
            <Card.Header
                title={'Account settings'}
                description={'Manage your profile and preferences.'}
                actions={(
                    <IconButton
                        icon={'mdi:dots-vertical'}
                        aria-label={'More options'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                    />
                )}
            />
            <Card.Body>
                <Typography
                    variant={'p'}
                    fontSize={'sm'}
                    color={'foreground'}
                >
                    {'Your content goes here. Add form fields, lists, or any other elements.'}
                </Typography>
            </Card.Body>
            <Card.Footer>
                <Button
                    label={'Save changes'}
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
        </Card>
    ),
}

// Card grid

export const CardGrid: Story = {
    name: 'Card grid',
    parameters: {
        layout: 'padded',
        controls: { disable: true },
        docs: {
            description: {
                story: 'Cards compose naturally inside a `Flex` or `Grid` layout.',
            },
        },
    },
    render: () => (
        <Flex
            gap={'lg'}
            style={{ flexWrap: 'wrap' }}
        >
            {(['Starter', 'Pro', 'Enterprise'] as const).map((plan) => (
                <Card
                    key={plan}
                    style={{ width: '16rem' }}
                >
                    <Card.Header
                        title={plan}
                        description={
                            plan === 'Starter' ? 'Perfect for side projects.' :
                                plan === 'Pro' ? 'For growing teams.' :
                                    'Custom solutions at scale.'
                        }
                    />
                    <Card.Body>
                        <Typography
                            variant={'p'}
                            fontSize={'sm'}
                            color={'foreground'}
                        >
                            {plan === 'Starter' && 'Free forever, up to 3 seats.'}
                            {plan === 'Pro' && '$12 / seat / month.'}
                            {plan === 'Enterprise' && 'Contact us for pricing.'}
                        </Typography>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            label={'Get started'}
                            variant={plan === 'Pro' ? 'contained' : 'outlined'}
                            color={'primary'}
                            size={'sm'}
                        />
                    </Card.Footer>
                </Card>
            ))}
        </Flex>
    ),
}

// Semantic elements

export const SemanticElements: Story = {
    name: 'Semantic HTML elements',
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Use the `as` prop on `Card` (and `Card.Header`, `Card.Body`, `Card.Footer`) to render the semantically correct HTML element.',
            },
        },
    },
    render: () => (
        <Flex
            gap={'lg'}
            style={{ flexWrap: 'wrap' }}
        >
            {(['div', 'section', 'article', 'aside'] as const).map((tag) => (
                <Card
                    key={tag}
                    as={tag}
                    style={{ width: '12rem' }}
                >
                    <Card.Body>
                        <Typography
                            variant={'p'}
                            fontSize={'sm'}
                            color={'mutedForeground'}
                            style={{ textAlign: 'center' }}
                        >
                            {`<${tag}>`}
                        </Typography>
                    </Card.Body>
                </Card>
            ))}
        </Flex>
    ),
}
