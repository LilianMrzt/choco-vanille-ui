import { type FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { DialogFooterProps } from '@components/overlay/dialog/components/dialog-footer/types/DialogFooter.props.ts'

/** Footer area of a `Dialog` — a flex row for action buttons. */
const DialogFooter: FC<DialogFooterProps> = ({ as = 'div', justify = 'end', gap = 'sm', p = 'lg', pt = 'none', ...props }) => (
    <Flex
        as={as}
        align={'center'}
        justify={justify}
        gap={gap}
        p={p}
        pt={pt}
        {...props}
    />
)

DialogFooter.displayName = 'DialogFooter'

export default DialogFooter
