import { useId, type ReactElement } from 'react'
import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { lightTheme, darkTheme, ThemeProvider, vars } from '@theme'
import ReferencePage from '@stories/_shared/components/reference-page/ReferencePage'
import TokenItem from '@stories/docs/tokens/components/token-item/TokenItem'
import { TOKEN_REFERENCE_STYLES } from '@stories/docs/tokens/Tokens.css'
import type { TokenReferenceArgs } from '@stories/docs/tokens/types'
import { categories } from '@stories/docs/tokens/constants'
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
export default TokenReference
