import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'

import { VAR_TABLE_STYLES } from '@stories/docs/css-variables/components/var-table/VarTable.css'
import type { VarTableProps } from '@stories/docs/css-variables/components/var-table/types'

const { table, caption: captionClass, th, td, swatch, valueText } = VAR_TABLE_STYLES

const ValueCell = ({ value, showSwatch }: Readonly<{ value: string; showSwatch?: boolean }>): ReactElement => (
    <td className={td}>
        <Flex
            alignItems={'center'}
            gap={4}
        >
            {showSwatch && (
                <span
                    className={swatch}
                    style={{ background: value }}
                />
            )}
            <Typography
                as={'span'}
                variant={'span'}
                fontSize={12}
                className={valueText}
                title={value}
            >
                {value}
            </Typography>
        </Flex>
    </td>
)

/**
 * Displays token values in a named, keyboard-scrollable comparison table.
 * @internal Not part of the public package API.
 * @param props - Table label, resolved values, and optional color samples.
 * @returns A table with explicit light and dark columns for themed values.
 * @example <VarTable caption="Spacing" rows={spacingRows} />
 */
const VarTable = ({ caption, rows, showSwatch }: VarTableProps): ReactElement => {
    const hasThemed = rows.some(r => r.darkValue !== undefined)

    return (
        <Box
            aria-label={`${caption} variables`}
            overflowX={'auto'}
            role={'region'}
            tabIndex={0}
        >
            <table className={table}>
                <caption className={captionClass}>
                    {`${caption} / ${rows.length} ${rows.length === 1 ? 'variable' : 'variables'}`}
                </caption>
                <thead>
                    <tr>
                        <th
                            className={th}
                            scope={'col'}
                        >
                            <Typography
                                as={'span'}
                                variant={'span'}
                                fontSize={14}
                                fontWeight={'semibold'}
                            >
                                {'Variable'}
                            </Typography>
                        </th>
                        <th
                            className={th}
                            scope={'col'}
                        >
                            <Typography
                                as={'span'}
                                variant={'span'}
                                fontSize={14}
                                fontWeight={'semibold'}
                            >
                                {hasThemed ? 'Light' : 'Value'}
                            </Typography>
                        </th>
                        {hasThemed && (
                            <th
                                className={th}
                                scope={'col'}
                            >
                                <Typography
                                    as={'span'}
                                    variant={'span'}
                                    fontSize={14}
                                    fontWeight={'semibold'}
                                >
                                    {'Dark'}
                                </Typography>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(({ variable, lightValue, darkValue }) => (
                        <tr key={variable}>
                            <td className={td}>
                                <Typography variant={'code'}>{variable}</Typography>
                            </td>
                            <ValueCell
                                value={lightValue}
                                showSwatch={showSwatch}
                            />
                            {hasThemed && (
                                <ValueCell
                                    value={darkValue ?? lightValue}
                                    showSwatch={showSwatch}
                                />
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    )
}

export default VarTable
import type { ReactElement } from 'react'
