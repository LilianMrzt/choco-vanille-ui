import type { IconifyIcon } from '@components/foundation/icon'
import type * as React from 'react'

/** Props for the `Popover.Item` action row. */
export type PopoverItemProps = Readonly<Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  React.RefAttributes<HTMLButtonElement> & {
    /** Text label of the item. */
    label: string
    /** Marks the item as the currently active option. */
    active?: boolean
    /** Renders the item with a destructive (danger) visual style. */
    destructive?: boolean
    /** Iconify icon identifier rendered on the left side of the item. */
    startIcon?: IconifyIcon
    /** Iconify icon identifier rendered on the right side of the item. */
    endIcon?: IconifyIcon
    /** Keyboard shortcut hint rendered on the right. */
    shortcut?: string
    /** Whether activating the item closes the surrounding popover. @default true */
    closeOnClick?: boolean
  }>
