import { Children, isValidElement, memo, type ReactNode } from 'react'

import { CalloutContext } from '@components/feedback/callout/context/Callout.context.ts'
import { CALLOUT_STYLES } from '@components/feedback/callout/Callout.css.ts'
import CalloutAction from '@components/feedback/callout/components/callout-action/CalloutAction.tsx'
import CalloutDescription from '@components/feedback/callout/components/callout-description/CalloutDescription.tsx'
import CalloutIcon from '@components/feedback/callout/components/callout-icon/CalloutIcon.tsx'
import CalloutTitle from '@components/feedback/callout/components/callout-title/CalloutTitle.tsx'
import type { CalloutProps } from '@components/feedback/callout/types'
import { Flex } from '@components/layout/flex'
import { createIconChildUtils } from '@utils/createIconChildUtils.ts'
import { cn } from '@utils/cn.ts'

const { hasIconChild, extractIconChild } = createIconChildUtils(CalloutIcon)

const isActionChild = (child: ReactNode) =>
    isValidElement(child) && child.type === CalloutAction

/**
 * Informational callout with `variant` (info|success|warning|error), an
 * optional `icon`, `title`, and `description`. Renders with `role="status"`
 * by default; pass `role="alert"` for urgent feedback. Supports compound
 * children via `Callout.Icon`, `.Title`, `.Description`, and `.Action` slots.
 * `Callout.Action` is positioned at the right edge.
 *
 * Compound slots: `Callout.Icon`, `Callout.Title`, `Callout.Description`, `Callout.Action`.
 * @param calloutProps - Root attributes and callout options.
 * @param calloutProps.variant - Visual intent; defaults to `info`.
 * @param calloutProps.role - Live-region role; defaults to `status` if omitted.
 * @param calloutProps.icon - Custom leading icon.
 * @param calloutProps.title - Optional title content.
 * @param calloutProps.description - Optional description content.
 * @param calloutProps.children - Compound content and optional action.
 * @param calloutProps.className - Additional root class.
 * @param calloutProps.ref - Ref to the root element.
 * @returns A contextual message.
 * @example
 * <Callout title="Saved" variant="success" />
 */
const CalloutRoot = memo<CalloutProps>((calloutProps) => {
    const {
        variant = 'info',
        icon,
        title,
        description,
        children,
        className,
        ref,
        ...props
    } = calloutProps
    const role = 'role' in calloutProps ? calloutProps.role : 'status'

    const childArray = Children.toArray(children)
    const actionChild = childArray.find(isActionChild)
    const contentChildren = childArray.filter((child) => !isActionChild(child))

    const showDefaultIcon = !hasIconChild(contentChildren)
    const iconChild = extractIconChild(contentChildren)
    const remainingChildren = iconChild.remaining

    return (
        <CalloutContext.Provider value={{ variant }}>
            <Flex
                ref={ref}
                alignItems={'start'}
                gap={12}
                className={cn(
                    CALLOUT_STYLES.recipe({
                        variant,
                        hasAction: actionChild !== undefined,
                    }),
                    className,
                )}
                {...props}
                role={role}
            >
                {showDefaultIcon ? (
                    <CalloutIcon icon={icon} />
                ) : (
                    iconChild.node
                )}
                <Flex
                    flexDirection={'column'}
                    alignItems={'start'}
                    gap={4}
                    minWidth={0}
                >
                    {title && <CalloutTitle>{title}</CalloutTitle>}
                    {description && (
                        <CalloutDescription>{description}</CalloutDescription>
                    )}
                    {remainingChildren}
                </Flex>
                {actionChild}
            </Flex>
        </CalloutContext.Provider>
    )
})

CalloutRoot.displayName = 'Callout'

/** Informational callout with named content slots. */
const Callout = Object.assign(CalloutRoot, {
    Icon: CalloutIcon,
    Title: CalloutTitle,
    Description: CalloutDescription,
    Action: CalloutAction,
})

export default Callout
