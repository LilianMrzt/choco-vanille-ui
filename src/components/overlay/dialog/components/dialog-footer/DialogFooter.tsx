import { type FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { DialogFooterProps } from '@components/overlay/dialog/components/dialog-footer/types/DialogFooter.props.ts'

/** Footer area of a `Dialog` — a flex row for action buttons. */
const DialogFooter: FC<DialogFooterProps> = ({ as = 'div', justifyContent = 'end', gap = 'sm', padding = 'lg', paddingTop = 'none', ...props }) => (
    <Flex
        as={as}
        alignItems={'center'}
        justifyContent={justifyContent}
        gap={gap}
        padding={padding}
        paddingTop={paddingTop}
        {...props}
    />
)

DialogFooter.displayName = 'Dialog.Footer'

export default DialogFooter
