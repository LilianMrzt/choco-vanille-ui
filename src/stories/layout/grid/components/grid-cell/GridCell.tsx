import { vars } from '@theme/styles/contract/contract.css.ts'

import { Box } from '@components/layout/box'
import type { ReactElement } from 'react'

/**
 * Renders the GridCell Storybook example.
 * @internal Not part of the public package API.
 * @param props - Example item props.
 * @param props.label - Visible item text.
 * @returns The example content.
 * @example
 * <Cell label="Example" />
 */
const Cell = ({ label }: { label: string }): ReactElement => (
    <Box
        padding={12}
        borderRadius={6}
        backgroundColor={vars.color.primary.subtle}
        style={{ fontSize: '0.875rem', textAlign: 'center' }}
    >
        {label}
    </Box>
)

export default Cell
