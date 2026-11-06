import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Flex } from '@components/layout/flex'
import { Dialog } from '@components/overlay/dialog'
import { SIZES } from '@stories/overlay/dialog/constants'

/**
 * Displays triggers for each dialog size.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The size examples.
 * @example
 * <DialogSizes />
 */
const DialogSizes = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={12}
    >
        {SIZES.map((size) => (
            <Dialog key={size}>
                <Dialog.Trigger>
                    <Button
                        color={'primary'}
                        label={size}
                        variant={'outlined'}
                    />
                </Dialog.Trigger>
                <Dialog.Content size={size}>
                    <Dialog.Header
                        title={`${size.toUpperCase()} dialog`}
                        description={`Size: ${size}`}
                    />
                    <Dialog.Body>Dialog content.</Dialog.Body>
                </Dialog.Content>
            </Dialog>
        ))}
    </Flex>
)

export default DialogSizes
