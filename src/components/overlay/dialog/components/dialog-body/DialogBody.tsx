import { type FC } from 'react'

import { Box } from '@components/layout/box'
import type { DialogBodyProps } from '@components/overlay/dialog/components/dialog-body/types/DialogBody.props.ts'

/** Main content area of a `Dialog` with uniform padding and overflow handling. */
const DialogBody: FC<DialogBodyProps> = ({ as = 'div', p = 'lg', ...props }) => (
    <Box
        as={as}
        p={p}
        overflowY={'auto'}
        {...props}
    />
)

DialogBody.displayName = 'DialogBody'

export default DialogBody
