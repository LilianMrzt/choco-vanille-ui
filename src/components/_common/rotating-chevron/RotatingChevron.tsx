import { Icon } from '@components/foundation/icon'
import { IconRegistry } from '@constants/icons.ts'
import { cn } from '@utils/cn.ts'
import { type FC } from 'react'

import { ROTATING_CHEVRON_STYLES } from '@components/_common/rotating-chevron/styles/RotatingChevron.css.ts'
import type { RotatingChevronProps } from '@components/_common/rotating-chevron/types/RotatingChevron.props.ts'

const RotatingChevron: FC<RotatingChevronProps> = ({
    expanded,
    className,
    ...props
}) => (
    <Icon
        icon={IconRegistry.chevronDown}
        className={cn(ROTATING_CHEVRON_STYLES.chevron, className)}
        data-expanded={expanded}
        aria-hidden
        {...props}
    />
)

RotatingChevron.displayName = 'RotatingChevron'

export default RotatingChevron
