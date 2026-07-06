import {
    Children,
    isValidElement,
    type ComponentType,
    type ReactElement,
    type ReactNode,
} from 'react'

export const createIconChildUtils = <T>(iconComponent: ComponentType<T>) => {
    const isIconChild = (child: ReactNode): child is ReactElement<T> =>
        isValidElement(child) && child.type === iconComponent

    const hasIconChild = (children: ReactNode): boolean =>
        Children.toArray(children).some(isIconChild)

    const extractIconChild = (
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

    return { hasIconChild, extractIconChild }
}
