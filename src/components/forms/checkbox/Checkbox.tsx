import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { memo, useId, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
import MinusIcon from '@resources/asset/MinusIcon.svg?react'
import FormLabel from '@components/forms/_shared/components/form-label/FormLabel.tsx'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'
import { CHECKBOX_STYLES } from '@components/forms/checkbox/styles/Checkbox.css.ts'
import type { CheckboxProps } from '@components/forms/checkbox/types/Checkbox.props.ts'

/**
  * A styled checkbox control built on top of `@base-ui/react/checkbox`.
  *
  * Supports controlled (`checked` + `onCheckedChange`) and uncontrolled
  * (`defaultChecked`) modes, plus an optional inline `label`.
  *
  * @example
  * ```tsx
  * <Checkbox label="Accept terms" checked={accepted} onCheckedChange={setAccepted} />
  * ```
  */
const Checkbox: FC<CheckboxProps> = memo(({
    label,
    helperText,
    error,
    id,
    className,
    onCheckedChange,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...props
}) => {
    const generatedId = useId()
    const labelId = useId()
    const checkboxId = id ?? (label ? generatedId : undefined)
    const helperId = error || helperText ? `${generatedId}-helper` : undefined
    const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(' ') || undefined

    return (
        <Flex
            as={'span'}
            inline
            flexDirection={'column'}
            alignItems={'start'}
            gap={4}
        >
            <Flex
                as={'span'}
                inline
                gap={8}
                alignItems={'center'}
            >
                <BaseCheckbox.Root
                    id={checkboxId}
                    className={cn(CHECKBOX_STYLES.root, className)}
                    onCheckedChange={onCheckedChange}
                    aria-labelledby={ariaLabelledby ?? (label ? labelId : undefined)}
                    aria-describedby={describedBy}
                    aria-invalid={error ? true : ariaInvalid}
                    {...props}
                >
                    <BaseCheckbox.Indicator className={CHECKBOX_STYLES.indicator}>
                        <Icon
                            icon={CheckIcon}
                            size={'xs'}
                            className={CHECKBOX_STYLES.checkIcon}
                        />
                        <Icon
                            icon={MinusIcon}
                            size={'xs'}
                            className={CHECKBOX_STYLES.indeterminateIcon}
                        />
                    </BaseCheckbox.Indicator>
                </BaseCheckbox.Root>

                {label && (
                    <FormLabel
                        id={labelId}
                        className={CHECKBOX_STYLES.label}
                    >
                        {label}
                    </FormLabel>
                )}
            </Flex>
            {(error || helperText) && (
                <HelperText
                    id={helperId}
                    hasError={Boolean(error)}
                >
                    {error ?? helperText}
                </HelperText>
            )}
        </Flex>
    )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
