import type { ReactElement } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { ThemeProvider, vars } from '@theme'
import CopyButton from '@stories/_shared/components/copy-button/CopyButton'
import ReferencePage from '@stories/_shared/components/reference-page/ReferencePage'
import { VarTable } from '@stories/docs/css-variables/components/var-table'
import type { CssVariableReferenceArgs, VariableSection } from '@stories/docs/css-variables/types'
import {
    buildThemeCSS,
    buildPlainCssScaffold,
    buildTailwindTheme,
    buildVanillaExtractSnippet,
    buildMuiThemeSnippet,
    colorRows,
    editorColorRows,
    shadowRows,
    dropShadowRows,
    spacingRows,
    radiusRows,
    fontFamilyRows,
    fontSizeRows,
    fontWeightRows,
    lineHeightRows,
    letterSpacingRows,
    zIndexRows,
    durationRows,
    easingRows,
} from '@stories/docs/css-variables/utils/theme.utils'

const sections: readonly VariableSection[] = [
    { key: 'color', title: 'Semantic colors', rows: colorRows, showSwatch: true },
    { key: 'editorColors', title: 'Editor colors', rows: editorColorRows, showSwatch: true },
    { key: 'shadow', title: 'Box shadows', rows: shadowRows },
    { key: 'dropShadow', title: 'Drop shadows', rows: dropShadowRows },
    { key: 'space', title: 'Spacing', rows: spacingRows },
    { key: 'radius', title: 'Radius', rows: radiusRows },
    { key: 'fontFamily', title: 'Font families', rows: fontFamilyRows },
    { key: 'fontSize', title: 'Font sizes', rows: fontSizeRows },
    { key: 'fontWeight', title: 'Font weights', rows: fontWeightRows },
    { key: 'lineHeight', title: 'Line heights', rows: lineHeightRows },
    { key: 'letterSpacing', title: 'Letter spacing', rows: letterSpacingRows },
    { key: 'zIndex', title: 'Stacking order', rows: zIndexRows },
    { key: 'duration', title: 'Durations', rows: durationRows },
    { key: 'easing', title: 'Easing', rows: easingRows },
]

const exports = [
    { label: 'Copy full theme CSS', build: buildThemeCSS },
    { label: 'Copy CSS override scaffold', build: buildPlainCssScaffold },
    { label: 'Copy typed token references', build: buildVanillaExtractSnippet },
    { label: 'Copy Tailwind scaffold', build: buildTailwindTheme },
    { label: 'Copy MUI bridge', build: buildMuiThemeSnippet },
]

/**
 * Browses generated CSS variable names and their built-in values.
 * @internal Not part of the public package API.
 * @param props - Theme, category, and variable-name search from Storybook Controls.
 * @returns A filterable reference and copy actions for integration examples.
 * @example <CssVariableReference theme="light" category="space" search="md" />
 */
const CssVariableReference = ({ theme, category, search }: CssVariableReferenceArgs): ReactElement => {
    const query = search.trim().toLowerCase()
    const visibleSections = sections
        .filter(({ key }) => category === 'all' || category === key)
        .map(section => ({
            ...section,
            rows: section.rows.filter(({ variable }) => variable.toLowerCase().includes(query)),
        }))
        .filter(({ rows }) => rows.length > 0)

    return (
        <ThemeProvider
            scope={'subtree'}
            theme={theme}
        >
            <ReferencePage
                description={'Every custom property, read directly from the theme contract. Use Controls to search by variable name or focus on a category; themed values are shown side by side.'}
                title={'CSS variables'}
            >
                <Box
                    backgroundColor={vars.color.surface.muted}
                    borderRadius={'lg'}
                    padding={'lg'}
                >
                    <Typography>
                        {'Token paths become CSS names by joining segments with a hyphen, preserving case: '}
                        <code>{'vars.color.primary.subtleForeground'}</code>
                        {' becomes '}
                        <code>{'--color-primary-subtleForeground'}</code>
                        {'. Colors, editor palettes, and shadows adapt to the theme; other scales are shared.'}
                    </Typography>
                </Box>
                <Flex
                    as={'section'}
                    flexDirection={'column'}
                    gap={'md'}
                >
                    <Typography variant={'h2'}>{'Use in your project'}</Typography>
                    <Typography color={vars.color.text.secondary}>
                        {'Copy the full theme or choose a starting point for your styling tools. Scaffolds need your own values and mappings; verify custom color contrast in both themes.'}
                    </Typography>
                    <Flex
                        flexWrap={'wrap'}
                        gap={'sm'}
                    >
                        {exports.map(({ label, build }) => (
                            <CopyButton
                                key={label}
                                label={label}
                                value={build()}
                            />
                        ))}
                    </Flex>
                </Flex>
                {visibleSections.length === 0 && (
                    <Typography role={'status'}>{'No variables match your search. Change the search or category in Controls.'}</Typography>
                )}
                {visibleSections.map(({ key, title, rows, showSwatch }) => (
                    <Flex
                        as={'section'}
                        flexDirection={'column'}
                        gap={'md'}
                        key={key}
                    >
                        <Typography variant={'h2'}>{title}</Typography>
                        <VarTable
                            caption={title}
                            rows={rows}
                            showSwatch={showSwatch}
                        />
                    </Flex>
                ))}
            </ReferencePage>
        </ThemeProvider>
    )
}

const meta = {
    title: 'Docs/CSS Variables',
    tags: ['!autodocs'],
    args: { theme: 'light', category: 'all', search: '' },
    argTypes: {
        theme: {
            control: 'inline-radio',
            options: ['light', 'dark'],
            description: 'Reading surface only; both resolved values remain visible in themed tables.',
            table: { category: 'Demonstration' },
        },
        category: {
            control: 'select',
            options: ['all', ...sections.map(({ key }) => key)],
            description: 'Filter the reference by token category.',
            table: { category: 'Demonstration' },
        },
        search: {
            control: 'text',
            description: 'Case-insensitive filter on CSS variable names, such as primary or --space-md.',
            table: { category: 'Demonstration' },
        },
    },
    parameters: { layout: 'fullscreen' },
    render: CssVariableReference,
} satisfies Meta<CssVariableReferenceArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Reference: Story = {
    name: 'Variable reference',
}
