import { FLEX_STYLES } from '@components/layout/flex/styles/Flex.css.ts'
import type { FlexProps } from '@components/layout/flex/types/Flex.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

import Box from '@components/layout/box/Box.tsx'

/**
 * Flex container built on `Box`. Sets `display: flex` (or `inline-flex`
 * when `inline` is true) with a configurable `gap` token. Accepts all
 * `Box` props for additional layout customization.
 */
const Flex: FC<FlexProps> = memo(({
    inline,
    gap = 0,
    className,
    ...props
}) => {
    return (
        <Box
            gap={gap}
            className={cn(FLEX_STYLES.recipe({ inline }), className)}
            {...props}
        />
    )
})

Flex.displayName = 'Flex'

export default Flex
