import type { Meta, StoryObj } from '@storybook/react-vite'
import { useId, type ReactElement } from 'react'

import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { lightTheme, darkTheme, ThemeProvider, vars } from '@theme'
import ReferencePage from '@stories/_shared/components/reference-page/ReferencePage'
import TokenItem from '@stories/docs/tokens/components/token-item/TokenItem'
import { TOKEN_REFERENCE_STYLES } from '@stories/docs/tokens/Tokens.css'
import type { TokenReferenceArgs } from '@stories/docs/tokens/types'

const categories = [
    { key: 'space', title: 'Spacing', description: 'Padding, margins, and gaps. Rem values follow the root font size.' },
    { key: 'radius', title: 'Radius', description: 'Corner treatments, from square edges to fully rounded shapes.' },
    { key: 'fontFamily', title: 'Font families', description: 'Shared typefaces for interface text and code.' },
    { key: 'fontSize', title: 'Font sizes', description: 'A consistent hierarchy for labels, body text, and headings.' },
    { key: 'fontWeight', title: 'Font weights', description: 'Emphasis without changing the type scale.' },
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
    const sectionId = useId()
    const tokens = theme === 'dark' ? darkTheme : lightTheme

    return (
        <ThemeProvider
            scope={'subtree'}
            theme={theme}
        >
            <ReferencePage
                description={'Browse the scales and copy a reference. Numeric keys match pixels at a 16px root; rem values scale with the root font size.'}
                title={'Design tokens'}
            >
                {category === 'all' && (
                    <Flex
                        as={'nav'}
                        aria-label={'Token families'}
                        className={TOKEN_REFERENCE_STYLES.navigation}
                        gap={8}
                    >
                        {categories.map(({ key, title }) => (
                            <a
                                className={TOKEN_REFERENCE_STYLES.navigationLink}
                                href={`#${sectionId}-${key}`}
                                key={key}
                            >
                                {title}
                            </a>
                        ))}
                    </Flex>
                )}
                {categories.filter(({ key }) => category === 'all' || category === key).map(({ key, title, description }) => (
                    <Flex
                        as={'section'}
                        aria-labelledby={`${sectionId}-${key}`}
                        flexDirection={'column'}
                        gap={16}
                        key={key}
                    >
                        <Flex
                            alignItems={'start'}
                            gap={16}
                            justifyContent={'space-between'}
                        >
                            <Flex
                                flexDirection={'column'}
                                gap={4}
                                minWidth={0}
                            >
                                <Typography
                                    className={TOKEN_REFERENCE_STYLES.heading}
                                    fontSize={20}
                                    fontWeight={'semibold'}
                                    id={`${sectionId}-${key}`}
                                    variant={'h2'}
                                >
                                    {title}
                                </Typography>
                                <Typography
                                    color={vars.color.text.secondary}
                                    fontSize={14}
                                >
                                    {description}
                                </Typography>
                            </Flex>
                            <Typography
                                className={TOKEN_REFERENCE_STYLES.count}
                                color={vars.color.text.secondary}
                                fontSize={12}
                            >
                                {`${Object.keys(tokens[key]).length} tokens`}
                            </Typography>
                        </Flex>
                        <Box
                            backgroundColor={vars.color.surface.main}
                            borderColor={vars.color.border.subtle}
                            borderRadius={14}
                            borderStyle={'solid'}
                            borderTopWidth={'1px'}
                            borderRightWidth={'1px'}
                            borderBottomWidth={'1px'}
                            borderLeftWidth={'1px'}
                        >
                            <div
                                aria-hidden={'true'}
                                className={TOKEN_REFERENCE_STYLES.columns}
                            >
                                <span>Token</span>
                                <span>Preview</span>
                                <span>CSS value</span>
                                <span />
                            </div>
                            <Box
                                as={'ul'}
                                aria-label={`${title} tokens`}
                                className={TOKEN_REFERENCE_STYLES.list}
                                margin={0}
                                padding={0}
                            >
                                {Object.entries(tokens[key]).map(([name, value]) => (
                                    <TokenItem
                                        category={key}
                                        key={name}
                                        name={name}
                                        value={value}
                                    />
                                ))}
                            </Box>
                        </Box>
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
