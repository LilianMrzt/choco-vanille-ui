import { Children, Fragment, isValidElement, type ReactNode } from 'react'

/**
 * Finds a direct compound slot, including slots nested in arrays or fragments.
 * @param children - Compound content to inspect.
 * @param slot - Slot component to match.
 * @returns Whether the content contains that slot.
 * @example
 * hasNotificationCardSlot(children, NotificationCard.Icon)
 */
export const hasNotificationCardSlot = (children: ReactNode, slot: unknown): boolean =>
    Children.toArray(children).some((child) => {
        if (!isValidElement<{ children?: ReactNode }>(child)) {
            return false
        }

        if (child.type === slot) {
            return true
        }

        return child.type === Fragment && hasNotificationCardSlot(child.props.children, slot)
    })
