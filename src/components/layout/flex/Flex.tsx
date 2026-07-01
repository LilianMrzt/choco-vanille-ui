import { FLEX_STYLES } from '@components/layout/flex/Flex.css.ts'
import type { FlexProps } from '@components/layout/flex/types/Flex.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

import Box from '@components/layout/box/Box.tsx'

const Flex: FC<FlexProps> = ({
    direction,
    wrap,
    align,
    justify,
    inline,
    gap = 'sm',
    className,
    ...props
}) => {
    return (
        <Box
            gap={gap}
            className={cn(FLEX_STYLES.recipe({ direction, wrap, align, justify, inline }), className)}
            {...props}
        />
    )
}

Flex.displayName = 'Flex'

export default Flex
