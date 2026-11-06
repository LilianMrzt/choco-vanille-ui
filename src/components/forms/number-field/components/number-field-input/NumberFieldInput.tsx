import { NumberField as BaseNumberField } from '@base-ui/react/number-field'

import { TEXT_FIELD_STYLES } from '@components/forms/text-field/styles/TextField.css.ts'
import { NUMBER_FIELD_INPUT_STYLES } from '@components/forms/number-field/components/number-field-input/styles/NumberFieldInput.css.ts'
import type { NumberFieldInputProps } from '@components/forms/number-field/components/number-field-input/types'
import { cn } from '@utils/cn.ts'
import NumberFieldSteppers from '@components/forms/number-field/components/number-field-steppers/NumberFieldSteppers.tsx'

const NumberFieldInput = ({
    inputProps,
    inputRef,
    className,
    describedBy,
    hasError,
    size,
}: NumberFieldInputProps) => (
    <BaseNumberField.Group className={NUMBER_FIELD_INPUT_STYLES.group}>
        <BaseNumberField.Input
            ref={inputRef}
            {...inputProps}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(
                TEXT_FIELD_STYLES.recipe({
                    size,
                    hasError,
                    hasStartIcon: false,
                    hasEndAction: true,
                }),
                className,
            )}
        />
        <NumberFieldSteppers />
    </BaseNumberField.Group>
)

NumberFieldInput.displayName = 'NumberFieldInput'

export default NumberFieldInput
