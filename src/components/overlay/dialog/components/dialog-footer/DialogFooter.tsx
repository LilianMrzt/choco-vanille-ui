import { memo, type FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { DialogFooterProps } from '@components/overlay/dialog/components/dialog-footer/types'

/**
 * Dialog footer for actions, forwarding layout attributes to its root.
 * @param props - Flex attributes forwarded to the selected element.
 * @param props.as - Root element; defaults to `div`.
 * @param props.justifyContent - Action alignment; defaults to `end`.
 * @param props.gap - Spacing token; defaults to `8`.
 * @param props.padding - Padding token; defaults to `16`.
 * @param props.paddingTop - Top padding token; defaults to `0`.
 * @returns The dialog footer.
 * @example
 * <Dialog.Footer>Actions</Dialog.Footer>
 */
const DialogFooter: FC<DialogFooterProps> = memo(({ as = 'div', justifyContent = 'end', gap = 8, padding = 16, paddingTop = 0, ...props }) => (
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

DialogFooter.displayName = 'Dialog.Footer'

export default DialogFooter
