import { memo, type FC } from 'react'

import { Box } from '@components/layout/box'
import type { DialogBodyProps } from '@components/overlay/dialog/components/dialog-body/types/DialogBody.props.ts'

/** Main content area of a `Dialog` with uniform padding and overflow handling. */
const DialogBody: FC<DialogBodyProps> = memo(({ as = 'div', padding = 16, ...props }) => (
    <Box
        as={as}
        padding={padding}
        overflowY={'auto'}
        {...props}
    />
))

DialogBody.displayName = 'Dialog.Body'

export default DialogBody
