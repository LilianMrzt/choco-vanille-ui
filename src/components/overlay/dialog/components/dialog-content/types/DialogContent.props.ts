import type * as React from 'react'
import type * as RadixDialog from '@radix-ui/react-dialog'

import type { DialogSize } from '@components/overlay/dialog/types/Dialog.types.ts'

/** Props for `Dialog.Content`. */
export type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof RadixDialog.Content
> & {
    /**
     * Predefined max-width for the dialog.
     * @default 'md'
     */
    size?: DialogSize
    /**
     * Accessible name used when neither `aria-label` nor `aria-labelledby` is
     * provided. Override this for i18n.
     * @default 'Dialog'
     */
    defaultAriaLabel?: string
}
