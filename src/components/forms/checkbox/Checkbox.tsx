import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { memo, useId, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { IconRegistry } from '@constants/icons'
import { Typography } from '@components/foundation/typography'
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
    id,
    className,
    onCheckedChange,
    'aria-labelledby': ariaLabelledby,
    ...props
}) => {
    const generatedId = useId()
    const labelId = useId()
    const checkboxId = id ?? (label ? generatedId : undefined)

    return (
        <Flex
            as={'span'}
            inline
            gap={'sm'}
        >
            <BaseCheckbox.Root
                id={checkboxId}
                className={cn(CHECKBOX_STYLES.root, className)}
                onCheckedChange={onCheckedChange}
                aria-labelledby={ariaLabelledby ?? (label ? labelId : undefined)}
                {...props}
            >
                <BaseCheckbox.Indicator className={CHECKBOX_STYLES.indicator}>
                    <Icon
                        icon={IconRegistry.check}
                        size={'xs'}
                        className={CHECKBOX_STYLES.checkIcon}
                    />
                    <Icon
                        icon={IconRegistry.minus}
                        size={'xs'}
                        className={CHECKBOX_STYLES.indeterminateIcon}
                    />
                </BaseCheckbox.Indicator>
            </BaseCheckbox.Root>

            {label && (
                <Typography
                    as={'label'}
                    variant={'label'}
                    color={'foreground'}
                    id={labelId}
                    htmlFor={checkboxId}
                    className={CHECKBOX_STYLES.label}
                >
                    {label}
                </Typography>
            )}
        </Flex>
    )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
