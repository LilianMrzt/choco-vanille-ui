import { CalloutIcon } from '@components/feedback/callout/components/callout-icon'
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react'

const isIconChild = (child: ReactNode): child is ReactElement =>
    isValidElement(child) && child.type === CalloutIcon

export const hasIconChild = (children: ReactNode): boolean =>
    Children.toArray(children).some(isIconChild)

export const extractIconChild = (
    children: ReactNode,
): { node: ReactNode; remaining: ReactNode } => {
    let node: ReactNode = null
    const remaining = Children.toArray(children).filter((child) => {
        if (isIconChild(child) && node === null) {
            node = child
            return false
        }
        return true
    })

    return { node, remaining }
}
