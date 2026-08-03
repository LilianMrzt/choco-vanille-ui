import { NumberField as BaseNumberField } from '@base-ui/react/number-field'

import { Icon } from '@components/foundation/icon'
import { NUMBER_FIELD_STEPPERS_STYLES } from '@components/forms/number-field/components/number-field-steppers/styles/NumberFieldSteppers.css.ts'
import type { NumberFieldSteppersProps } from '@components/forms/number-field/components/number-field-steppers/types'
import { IconRegistry } from '@constants/icons'
import { cn } from '@utils/cn.ts'

const NumberFieldSteppers = ({ className }: NumberFieldSteppersProps) => (
    <span className={cn(NUMBER_FIELD_STEPPERS_STYLES.group, className)}>
        <BaseNumberField.Increment className={NUMBER_FIELD_STEPPERS_STYLES.button}>
            <Icon
                icon={IconRegistry.chevronUp}
                size={'xs'}
                className={NUMBER_FIELD_STEPPERS_STYLES.icon}
            />
        </BaseNumberField.Increment>
        <BaseNumberField.Decrement className={NUMBER_FIELD_STEPPERS_STYLES.button}>
            <Icon
                icon={IconRegistry.chevronDown}
                size={'xs'}
                className={NUMBER_FIELD_STEPPERS_STYLES.icon}
            />
        </BaseNumberField.Decrement>
    </span>
)

NumberFieldSteppers.displayName = 'NumberFieldSteppers'

export default NumberFieldSteppers
