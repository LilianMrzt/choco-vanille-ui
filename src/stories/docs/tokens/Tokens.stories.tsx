import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactElement } from 'react'

import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { lightTheme, darkTheme, ThemeProvider, vars } from '@theme'
import CopyButton from '@stories/_shared/components/copy-button/CopyButton'
import ReferencePage from '@stories/_shared/components/reference-page/ReferencePage'
import TokenPreview from '@stories/docs/tokens/components/token-preview/TokenPreview'
import { TOKEN_REFERENCE_STYLES } from '@stories/docs/tokens/Tokens.css'
import type { TokenReferenceArgs } from '@stories/docs/tokens/types'
import { formatTokenReference } from '@stories/_shared/utils/token-reference/tokenReference.utils'

const categories = [
    { key: 'space', title: 'Spacing', description: 'Padding, margins, and gaps. Rem values follow the root font size.' },
    { key: 'radius', title: 'Radius', description: 'Corner treatments, from square edges to fully rounded shapes.' },
    { key: 'fontFamily', title: 'Font families', description: 'Shared typefaces for interface text and code.' },
    { key: 'fontSize', title: 'Font sizes', description: 'A consistent hierarchy for labels, body text, and headings.' },
    { key: 'fontWeight', title: 'Font weights', description: 'Emphasis without changing the type scale.' },
    { key: 'lineHeight', title: 'Line heights', description: 'Unitless ratios that scale with the current font size.' },
    { key: 'letterSpacing', title: 'Letter spacing', description: 'Tracking for compact labels and expressive headings.' },
    { key: 'shadow', title: 'Box shadows', description: 'Elevation treatments that adapt to the selected theme.' },
    { key: 'dropShadow', title: 'Drop shadows', description: 'Theme-aware filters that follow the shape of the content.' },
    { key: 'zIndex', title: 'Stacking order', description: 'Shared layers for floating elements and overlays.' },
    { key: 'duration', title: 'Durations', description: 'Hover or focus a preview to compare timing. Reduced motion is respected.' },
    { key: 'easing', title: 'Easing', description: 'Hover or focus a preview to compare motion curves.' },
] as const

/**
 * Presents the non-color scales with controls for theme and category.
 * @internal Not part of the public package API.
 * @param props - Theme and category selected in Storybook Controls.
 * @returns The selected token scales with previews and typed copy actions.
 * @example <TokenReference theme="light" category="space" />
 */
const TokenReference = ({ theme, category }: TokenReferenceArgs): ReactElement => {
    const tokens = theme === 'dark' ? darkTheme : lightTheme

    return (
        <ThemeProvider
            scope={'subtree'}
            theme={theme}
        >
            <ReferencePage
                description={'Explore the shared visual scales. Use Controls to choose a theme or category, and copy a typed reference for your styles.'}
                title={'Design tokens'}
            >
                {categories.filter(({ key }) => category === 'all' || category === key).map(({ key, title, description }) => (
                    <Flex
                        as={'section'}
                        flexDirection={'column'}
                        gap={'md'}
                        key={key}
                    >
                        <Flex
                            flexDirection={'column'}
                            gap={'xs'}
                        >
                            <Typography variant={'h2'}>{title}</Typography>
                            <Typography color={vars.color.text.secondary}>{description}</Typography>
                        </Flex>
                        <div className={TOKEN_REFERENCE_STYLES.grid}>
                            {Object.entries(tokens[key]).map(([name, value]) => (
                                <Flex
                                    borderColor={vars.color.border.subtle}
                                    borderRadius={'lg'}
                                    borderStyle={'solid'}
                                    borderWidth={'1px'}
                                    flexDirection={'column'}
                                    gap={'md'}
                                    key={name}
                                    minWidth={0}
                                    padding={'md'}
                                >
                                    <Typography
                                        fontWeight={'semibold'}
                                        variant={'code'}
                                    >
                                        {`${key}.${name}`}
                                    </Typography>
                                    <TokenPreview
                                        category={key}
                                        value={value}
                                    />
                                    <Typography
                                        color={vars.color.text.secondary}
                                        fontSize={'sm'}
                                        variant={'code'}
                                    >
                                        {value}
                                    </Typography>
                                    <CopyButton
                                        label={`Copy ${key}.${name}`}
                                        value={formatTokenReference(`${key}.${name}`)}
                                    />
                                </Flex>
                            ))}
                        </div>
                    </Flex>
                ))}
            </ReferencePage>
        </ThemeProvider>
    )
}

const meta = {
    title: 'Docs/Tokens',
    tags: ['!autodocs'],
    args: { theme: 'light', category: 'all' },
    argTypes: {
        theme: {
            control: 'inline-radio',
            options: ['light', 'dark'],
            description: 'Preview theme. Shadows change between modes; other non-color scales are shared.',
            table: { category: 'Demonstration' },
        },
        category: {
            control: 'select',
            options: ['all', ...categories.map(({ key }) => key)],
            description: 'Show every scale or focus on a single token category.',
            table: { category: 'Demonstration' },
        },
    },
    parameters: { layout: 'fullscreen' },
    render: TokenReference,
} satisfies Meta<TokenReferenceArgs>

export default meta
type Story = StoryObj<typeof meta>

export const AllTokens: Story = {
    name: 'Token reference',
}
