import { memo, type AriaRole, type FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { DrawerBodyProps } from '@components/overlay/drawer/components/blocs/drawer-body/types'

/**
 * Scrollable drawer content with a column layout and 12px padding by default.
 * Layout, native attributes and ref are forwarded to the rendered element.
 * @param props - Content and layout attributes.
 * @param props.as - Container element; defaults to div.
 * @param props.padding - Padding token; defaults to 12.
 * @param props.role - Optional role; nav defaults to navigation.
 * @returns The scrollable content container.
 * @example
 * <Drawer.Body as="nav" aria-label="Navigation" gap={16}>...</Drawer.Body>
 */
const DrawerBody: FC<DrawerBodyProps> = memo(({
    as = 'div',
    padding = 12,
    role,
    ...props
}) => {
    const implicitRole: AriaRole | undefined =
    as === 'nav' && role === undefined ? 'navigation' : role

    return (
        <Flex
            as={as}
            flexDirection={'column'}
            gap={12}
            padding={padding}
            flex={1}
            minHeight={0}
            overflowY={'auto'}
            role={implicitRole}
            {...props}
        />
    )
})

DrawerBody.displayName = 'Drawer.Body'

export default DrawerBody
