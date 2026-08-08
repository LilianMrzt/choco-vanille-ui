import { Icon } from '@components/foundation/icon'
import { CALLOUT_ICON_STYLES } from '@components/feedback/callout/components/callout-icon/styles/CalloutIcon.css.ts'
import type { CalloutIconProps } from '@components/feedback/callout/components/callout-icon/types/CalloutIcon.props.ts'
import { VARIANT_TO_COLOR, VARIANT_TO_ICON } from '@components/feedback/callout/constants'
import { CalloutContext } from '@components/feedback/callout/context/Callout.context.ts'
import { cn } from '@utils/cn.ts'
import { memo, useContext, type FC } from 'react'

/**
 * Icon slot for `Callout`. Reads `variant` from context to resolve the
 * default icon and color. Override both with explicit `icon` and `color`
 * props.
 */
const CalloutIcon: FC<CalloutIconProps> = memo(({
    icon,
    color,
    className,
    ...props
}) => {
    const { variant } = useContext(CalloutContext)

    return (
        <Icon
            icon={icon ?? VARIANT_TO_ICON[variant]}
            color={color ?? VARIANT_TO_COLOR[variant]}
            className={cn(CALLOUT_ICON_STYLES.icon, className)}
            {...props}
        />
    )
})

CalloutIcon.displayName = 'Callout.Icon'

export default CalloutIcon
