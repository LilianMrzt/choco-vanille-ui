import {
    Table
} from '@components/data-display/table'
import Box from '@components/layout/box/Box.tsx'
import Flex from '@components/layout/flex/Flex.tsx'
import { TABLE_DENSITIES } from '@stories/data-display/table/constants'
import type { ReactElement } from 'react'

/**
 * Compares the three public table densities using populated semantic tables.
 * @internal Not part of the public package API.
 * @returns A single-axis density comparison; other presentation axes stay at defaults.
 * @example
 * <TableSizes />
 */
const TableSizes = (): ReactElement => (
    <Box
        maxWidth={'760px'}
        width={'100%'}
    >
        <Flex
            flexDirection={'column'}
            gap={24}
        >
            {TABLE_DENSITIES.map((size) => (
                <Table
                    key={size}
                    size={size}
                >
                    <Table.Caption>{`Density: ${size}`}</Table.Caption>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>Invoice</Table.Head>
                            <Table.Head align={'right'}>Amount</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>INV-001</Table.Cell>
                            <Table.Cell numeric>$250.00</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            ))}
        </Flex>
    </Box>
)

export default TableSizes
