import type { ReactElement } from 'react'

import { Flex } from '@components/layout/flex'
import { Card } from '@components/surfaces/card'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Shows the default surface and an explicitly paired theme color.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Color examples.
 * @example
 * <CardColors />
 */
const CardColors = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={12}
    >
        <Card padding={12}>Default surface</Card>
        <Card
            backgroundColor={vars.color.primary.main}
            color={vars.color.primary.foreground}
            padding={12}
        >
            Primary surface
        </Card>
    </Flex>
)

export default CardColors
