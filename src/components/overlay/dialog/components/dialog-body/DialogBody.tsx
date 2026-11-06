import { memo, type FC } from 'react'

import { Box } from '@components/layout/box'
import type { DialogBodyProps } from '@components/overlay/dialog/components/dialog-body/types'

/**
 * Scrollable main content area of a dialog.
 * @param props - Box attributes forwarded to the selected element.
 * @param props.as - Root element; defaults to `div`.
 * @param props.padding - Padding token; defaults to `16`.
 * @returns The dialog body.
 * @example
 * <Dialog.Body>Settings</Dialog.Body>
 */
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
