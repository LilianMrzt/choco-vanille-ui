import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Flex } from '@components/layout/flex'
import { AlertDialog } from '@components/overlay/alert-dialog'
import { SIZES } from '@stories/overlay/alert-dialog/constants'

/**
 * Displays triggers for each confirmation dialog size.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The size examples.
 * @example
 * <AlertDialogSizes />
 */
const AlertDialogSizes = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={12}
    >
        {SIZES.map((size) => (
            <AlertDialog key={size}>
                <AlertDialog.Trigger>
                    <Button
                        color={'primary'}
                        label={size}
                        variant={'outlined'}
                    />
                </AlertDialog.Trigger>
                <AlertDialog.Content size={size}>
                    <AlertDialog.Header title={`${size.toUpperCase()} alert`} />
                    <AlertDialog.Body>Size: {size}</AlertDialog.Body>
                </AlertDialog.Content>
            </AlertDialog>
        ))}
    </Flex>
)

export default AlertDialogSizes
