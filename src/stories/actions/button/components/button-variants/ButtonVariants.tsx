import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Flex } from '@components/layout/flex'
import { VARIANTS } from '@stories/actions/button/constants'

/**
 * Shows the available button treatments.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Variant examples.
 * @example
 * <ButtonVariants />
 */
const ButtonVariants = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={12}
    >
        {VARIANTS.map((variant) => (
            <Button
                key={variant}
                label={variant}
                variant={variant}
            />
        ))}
    </Flex>
)

export default ButtonVariants
