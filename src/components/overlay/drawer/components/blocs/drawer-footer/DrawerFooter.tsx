import { memo, type FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { DrawerFooterProps } from '@components/overlay/drawer/components/blocs/drawer-footer/types'

/**
 * Drawer footer with centered items and end-aligned actions by default.
 * Layout props override defaults; native attributes and ref target the container.
 * @param props - Footer content and layout attributes.
 * @param props.as - Container element; defaults to div.
 * @param props.justifyContent - Action alignment; defaults to end.
 * @param props.gap - Spacing token; defaults to 8.
 * @param props.padding - Padding token; defaults to 12.
 * @param props.paddingTop - Top padding token; defaults to 0.
 * @returns The footer container.
 * @example
 * <Drawer.Footer gap={12} justifyContent="start">...</Drawer.Footer>
 */
const DrawerFooter: FC<DrawerFooterProps> = memo(({
    as = 'div',
    justifyContent = 'end',
    gap = 8,
    padding = 12,
    paddingTop = 0,
    ...props
}) => (
    <Flex
        as={as}
        alignItems={'center'}
        justifyContent={justifyContent}
        gap={gap}
        padding={padding}
        paddingTop={paddingTop}
        {...props}
    />
))

DrawerFooter.displayName = 'Drawer.Footer'

export default DrawerFooter
