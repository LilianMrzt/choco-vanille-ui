import type { ComponentProps, MouseEventHandler } from 'react'
import type { BoxSpace } from '@components/layout/box'
import type { BottomNavigation } from '@components/navigation/bottom-navigation'

export type BottomNavigationStoryArgs = ComponentProps<typeof BottomNavigation> & {
    listClassName?: string
    listGap?: BoxSpace
    listWidth?: string
    listMaxWidth?: string
    itemLabel?: string
    itemShowLabel?: boolean
    itemAriaLabel?: string
    itemHref?: string
    itemHeight?: string
    itemDisabled?: boolean
    itemOnClick?: MouseEventHandler<HTMLAnchorElement>
}
