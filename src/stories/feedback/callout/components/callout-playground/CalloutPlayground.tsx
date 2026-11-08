import { CLOSE_ICON as CloseIcon, INFO_ICON as InfoIcon } from '@constants/icon-registry'
import { Callout } from '@components/feedback/callout'
import type { CalloutStoryArgs } from '@stories/feedback/callout/types'
import type { ReactElement } from 'react'
const CalloutPlayground = ({ title, description, showCustomIcon, showTitle, showDescription, showAction, actionLabel, onActionClick, ...props }: CalloutStoryArgs): ReactElement => (
    <Callout
        {...props}
    >
        {showCustomIcon && <Callout.Icon icon={InfoIcon} />}
        {showTitle && <Callout.Title>{title}</Callout.Title>}
        {showDescription && <Callout.Description>{description}</Callout.Description>}
        {showAction && (
            <Callout.Action
                icon={CloseIcon}
                aria-label={actionLabel}
                onClick={onActionClick}
            />
        )}
    </Callout>
)
export default CalloutPlayground
