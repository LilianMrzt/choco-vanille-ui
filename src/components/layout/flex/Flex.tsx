import { FLEX_STYLES } from '@components/layout/flex/Flex.css.ts'
import type { FlexProps } from '@components/layout/flex/types'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

import Box from '@components/layout/box/Box.tsx'

/**
 * Flex container built on `Box`. Sets `display: flex` (or `inline-flex`
 * when `inline` is true) with a configurable `gap` token. Accepts all
 * `Box` props for additional layout customization. Native attributes and ref
 * target the element selected by `as`, which defaults to `div`.
 *
 * @param props - Flex and inherited layout attributes.
 * @param props.inline - Use `inline-flex` instead of `flex`.
 * @param props.gap - Spacing token between children; defaults to `0`.
 * @param props.className - Additional container class.
 * @returns A flex container.
 * @example
 * <Flex gap={8}><span>One</span><span>Two</span></Flex>
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
