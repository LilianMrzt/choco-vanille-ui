import type { ReactElement } from 'react'
import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { ThemeProvider, vars } from '@theme'
import CopyButton from '@stories/_shared/components/copy-button/CopyButton'
import ReferencePage from '@stories/_shared/components/reference-page/ReferencePage'
import { VarTable } from '@stories/docs/css-variables/components/var-table'
import type { CssVariableReferenceArgs } from '@stories/docs/css-variables/types'
import { exports, sections } from '@stories/docs/css-variables/constants'
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
                    borderRadius={10}
                    padding={16}
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
                    gap={12}
                >
                    <Typography variant={'h2'}>{'Use in your project'}</Typography>
                    <Typography color={vars.color.text.secondary}>
                        {'Copy the full theme or choose a starting point for your styling tools. Scaffolds need your own values and mappings; verify custom color contrast in both themes.'}
                    </Typography>
                    <Flex
                        flexWrap={'wrap'}
                        gap={8}
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
                        gap={12}
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
export default CssVariableReference
