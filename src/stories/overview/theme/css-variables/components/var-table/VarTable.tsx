import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'

import { table, th, td, swatch, valueText } from './VarTable.css.ts'
import type { VarTableProps } from '@stories/overview/theme/css-variables/components/var-table/types'

// Component

const ValueCell = ({ value, showSwatch }: { value: string; showSwatch?: boolean }) => (
    <td className={td}>
        <Flex
            align={'center'}
            gap={'xs'}
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
                fontSize={'xs'}
                ellipsis
                className={valueText}
                title={value}
            >
                {value}
            </Typography>
        </Flex>
    </td>
)

export const VarTable = ({ rows, showSwatch }: VarTableProps) => {
    const hasThemed = rows.some(r => r.darkValue !== undefined)

    return (
        <Box
            overflowX={'auto'}
            mb={'2xl'}
        >
            <table className={table}>
                <thead>
                    <tr>
                        <th className={th}>
                            <Typography
                                as={'span'}
                                variant={'span'}
                                fontSize={'sm'}
                                fontWeight={'semibold'}
                            >
                                {'Variable'}
                            </Typography>
                        </th>
                        <th className={th}>
                            <Typography
                                as={'span'}
                                variant={'span'}
                                fontSize={'sm'}
                                fontWeight={'semibold'}
                            >
                                {hasThemed ? 'Light' : 'Value'}
                            </Typography>
                        </th>
                        {hasThemed && (
                            <th className={th}>
                                <Typography
                                    as={'span'}
                                    variant={'span'}
                                    fontSize={'sm'}
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
                                    value={darkValue ?? ''}
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
