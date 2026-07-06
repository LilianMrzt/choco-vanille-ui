import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { useId, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { IconRegistry } from '@constants/icons'
import { Typography } from '@components/foundation/typography'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'
import { CHECKBOX_STYLES } from '@components/forms/checkbox/Checkbox.css.ts'
import type { CheckboxProps } from '@components/forms/checkbox/types/Checkbox.props.ts'

/**
  * A styled checkbox control built on top of `@radix-ui/react-checkbox`.
  *
  * Supports controlled (`checked` + `onCheckedChange`) and uncontrolled
  * (`defaultChecked`) modes, plus an optional inline `label`.
  *
  * @example
  * ```tsx
  * <Checkbox label="Accept terms" checked={accepted} onCheckedChange={setAccepted} />
  * ```
  */
const Checkbox: FC<CheckboxProps> = ({ label, id, className, ...props }) => {
    const generatedId = useId()
    const checkboxId = id ?? (label ? generatedId : undefined)

    return (
        <Flex
            as={'span'}
            inline
            gap={'sm'}
        >
            <RadixCheckbox.Root
                id={checkboxId}
                className={cn(CHECKBOX_STYLES.root, className)}
                {...props}
            >
                <RadixCheckbox.Indicator className={CHECKBOX_STYLES.indicator}>
                    <Icon
                        icon={IconRegistry.check}
                        size={'xs'}
                    />
                </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>

            {label && (
                <Typography
                    as={'label'}
                    variant={'label'}
                    color={'foreground'}
                    htmlFor={checkboxId}
                    className={CHECKBOX_STYLES.label}
                >
                    {label}
                </Typography>
            )}
        </Flex>
    )
}

Checkbox.displayName = 'Checkbox'

export default Checkbox