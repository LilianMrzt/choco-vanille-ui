import { IconButton } from '@components/actions/icon-button'
import { CALLOUT_ACTION_STYLES } from '@components/feedback/callout/components/callout-action/CalloutAction.css.ts'
import type { CalloutActionProps } from '@components/feedback/callout/components/callout-action/types'
import { VARIANT_TO_ACTION_COLOR } from '@components/feedback/callout/constants'
import { CalloutContext } from '@components/feedback/callout/context/Callout.context.ts'
import { cn } from '@utils/cn.ts'
import { memo, useContext, type FC } from 'react'

/**
 * Action slot for `Callout`. Renders a small icon-only `IconButton` pinned to
 * the right edge, colored after the callout `variant`. Forwards all
 * `IconButton` props; pass `color` or `size` to override the defaults.
 * @param props - Icon button props, including an accessible name.
 * @param props.color - Action color; defaults to the current callout variant.
 * @param props.size - Action size; defaults to `sm`.
 * @param props.className - Additional button class.
 * @returns An icon button.
 * @example
 * <Callout.Action aria-label="Dismiss" icon={CloseIcon} />
 */
const CalloutAction: FC<CalloutActionProps> = memo(({
    color,
    size = 'sm',
    className,
    ...props
}) => {
    const { variant } = useContext(CalloutContext)

    return (
        <IconButton
            variant={'ghost'}
            color={color ?? VARIANT_TO_ACTION_COLOR[variant]}
            size={size}
            type={'button'}
            className={cn(CALLOUT_ACTION_STYLES.action, className)}
            {...props}
        />
    )
})

CalloutAction.displayName = 'Callout.Action'

export default CalloutAction
