import { CalloutContext } from '@components/feedback/callout/context/Callout.context.ts'
import { CALLOUT_STYLES } from '@components/feedback/callout/Callout.css.ts'
import { CalloutDescription } from '@components/feedback/callout/components/callout-description'
import { CalloutIcon } from '@components/feedback/callout/components/callout-icon'
import { CalloutTitle } from '@components/feedback/callout/components/callout-title'
import type { CalloutCompound } from '@components/feedback/callout/types'
import { Flex } from '@components/layout/flex'
import { createIconChildUtils } from '@utils/createIconChildUtils.ts'
import { cn } from '@utils/cn.ts'

const { hasIconChild, extractIconChild } = createIconChildUtils(CalloutIcon)

const Callout = (({
    variant = 'info',
    role = 'alert',
    icon,
    title,
    description,
    children,
    className,
    ref,
    ...props
}) => {
    const showDefaultIcon = !hasIconChild(children)
    const iconChild = extractIconChild(children)
    const remainingChildren = iconChild.remaining

    return (
        <CalloutContext.Provider value={{ variant }}>
            <Flex
                ref={ref}
                alignItems={'start'}
                gap={'md'}
                className={cn(CALLOUT_STYLES.recipe({ variant }), className)}
                role={role}
                {...props}
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
                    minWidth={'none'}
                >
                    {title && <CalloutTitle>{title}</CalloutTitle>}
                    {description && (
                        <CalloutDescription>{description}</CalloutDescription>
                    )}
                    {remainingChildren}
                </Flex>
            </Flex>
        </CalloutContext.Provider>
    )
}) as CalloutCompound

Callout.displayName = 'Callout'
Callout.Icon = CalloutIcon
Callout.Title = CalloutTitle
Callout.Description = CalloutDescription

export default Callout
