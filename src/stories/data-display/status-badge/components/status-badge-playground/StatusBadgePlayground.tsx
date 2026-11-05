import {
    StatusBadge,
    type StatusBadgeProps
} from '@components/data-display/status-badge'
import { type ReactElement } from 'react'

const StatusBadgePlayground = ({ children, ...args }: StatusBadgeProps): ReactElement => (
    <StatusBadge {...args}>{children}</StatusBadge>
)

export default StatusBadgePlayground
