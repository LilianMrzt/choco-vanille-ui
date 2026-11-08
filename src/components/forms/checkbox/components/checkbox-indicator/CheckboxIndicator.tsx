import { CHECK_ICON as CheckIcon, MINUS_ICON as MinusIcon } from '@constants/icon-registry'
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import type { FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { CHECKBOX_STYLES } from '@components/forms/checkbox/Checkbox.css.ts'
import type { CheckboxIndicatorProps } from '@components/forms/checkbox/types'
import { cn } from '@utils/cn.ts'

/**
 * Displays the checked or mixed indicator inside Checkbox.Root. Custom children
 * replace the default decorative icons. The ref targets the indicator span.
 * @param props - Indicator content, mounting behavior and native attributes.
 * @param props.className - Additional class or state-dependent class callback.
 * @param props.children - Custom indicator content; defaults to check and minus icons.
 * @returns The indicator while checked or indeterminate.
 * @example
 * <Checkbox.Root aria-label="Accept"><Checkbox.Indicator /></Checkbox.Root>
 */
const CheckboxIndicator: FC<CheckboxIndicatorProps> = ({ className, children, ...props }) => (
    <BaseCheckbox.Indicator
        {...props}
        className={typeof className === 'function'
            ? (state) => cn(CHECKBOX_STYLES.indicator, className(state))
            : cn(CHECKBOX_STYLES.indicator, className)}
    >
        {children ?? (
            <>
                <Icon
                    icon={CheckIcon}
                    size={12}
                    className={CHECKBOX_STYLES.checkIcon}
                />
                <Icon
                    icon={MinusIcon}
                    size={12}
                    className={CHECKBOX_STYLES.indeterminateIcon}
                />
            </>
        )}
    </BaseCheckbox.Indicator>
)

CheckboxIndicator.displayName = 'Checkbox.Indicator'

export default CheckboxIndicator
