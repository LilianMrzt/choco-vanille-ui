import { CHEVRON_DOWN_ICON as ChevronDownIcon } from '@constants/icon-registry'
import { Icon } from '@components/foundation/icon'
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
        icon={ChevronDownIcon}
        className={cn(ROTATING_CHEVRON_STYLES.chevron, className)}
        data-expanded={expanded}
        aria-hidden
        {...props}
    />
)

RotatingChevron.displayName = 'RotatingChevron'

export default RotatingChevron
