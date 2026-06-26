import type * as React from 'react'
import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubContent> & {
    /**
     * Distance in pixels from the viewport edges used for collision detection.
     * The sub-menu shifts inward by exactly the overflowing amount to always
     * stay fully visible — without flipping to the opposite side.
     * @default 8
     */
    collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number }
}
