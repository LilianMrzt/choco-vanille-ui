import { Children, isValidElement, memo, type ReactNode } from 'react'

import { CalloutContext } from '@components/feedback/callout/context/Callout.context.ts'
import { CALLOUT_STYLES } from '@components/feedback/callout/styles/Callout.css.ts'
import CalloutAction from '@components/feedback/callout/components/callout-action/CalloutAction.tsx'
import CalloutDescription from '@components/feedback/callout/components/callout-description/CalloutDescription.tsx'
import CalloutIcon from '@components/feedback/callout/components/callout-icon/CalloutIcon.tsx'
import CalloutTitle from '@components/feedback/callout/components/callout-title/CalloutTitle.tsx'
import type { CalloutCompound } from '@components/feedback/callout/types'
import type { CalloutProps } from '@components/feedback/callout/types/Callout.props.ts'
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
 * `Callout.Action` is pinned to the top-right corner.
 *
 * Compound slots: `Callout.Icon`, `Callout.Title`, `Callout.Description`, `Callout.Action`.
 */
const Callout = memo<CalloutProps>((calloutProps) => {
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
                gap={'md'}
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
                    gap={'xs'}
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
}) as unknown as CalloutCompound

Callout.displayName = 'Callout'
Callout.Icon = CalloutIcon
Callout.Title = CalloutTitle
Callout.Description = CalloutDescription
Callout.Action = CalloutAction

export default Callout
