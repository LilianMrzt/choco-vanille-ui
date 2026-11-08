import { Children, Fragment, cloneElement, isValidElement, type ReactNode } from 'react'

import DrawerSectionTitle from '@components/overlay/drawer/components/blocs/drawer-section-title/DrawerSectionTitle'
import type { DrawerSectionTitleProps } from '@components/overlay/drawer/components/blocs/drawer-section-title/types'
import type { DrawerSectionChildren } from '@components/overlay/drawer/components/blocs/drawer-section/utils/split-drawer-section-children/types'

/**
 * Separates a direct title slot from section content, including nested fragments.
 * Fragment keys and content order are preserved. Does not inspect custom components.
 * @param children - Section children.
 * @returns The optional title and remaining content.
 * @throws When more than one title slot is supplied.
 * @example
 * splitDrawerSectionChildren(children)
 */
export const splitDrawerSectionChildren = (children: ReactNode): DrawerSectionChildren => {
    let title: DrawerSectionChildren['title']
    const content = Children.map(children, (child) => {
        if (isValidElement<DrawerSectionTitleProps>(child) && child.type === DrawerSectionTitle) {
            if (title !== undefined) {
                throw new Error('Drawer.Section accepts only one Drawer.SectionTitle.')
            }
            title = child
            return null
        }

        if (isValidElement<Readonly<{ children?: ReactNode }>>(child) && child.type === Fragment) {
            const fragment = splitDrawerSectionChildren(child.props.children)
            if (fragment.title !== undefined) {
                if (title !== undefined) {
                    throw new Error('Drawer.Section accepts only one Drawer.SectionTitle.')
                }
                title = fragment.title
            }
            return cloneElement(child, undefined, fragment.content)
        }

        return child
    })

    return { title, content }
}
