import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { memo, useId, type FC } from 'react'

import FormLabel from '@components/forms/_shared/components/form-label/FormLabel.tsx'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'
import { SWITCH_STYLES } from '@components/forms/switch/styles/Switch.css.ts'
import type { SwitchProps } from '@components/forms/switch/types/Switch.props.ts'

/**
 * A styled switch control built on top of `@base-ui/react/switch`.
 *
 * Supports controlled (`checked` + `onCheckedChange`) and uncontrolled
 * (`defaultChecked`) modes, plus an optional inline `label`.
 *
 * @example
 * ```tsx
 * <Switch label="Airplane mode" checked={enabled} onCheckedChange={setEnabled} />
 * ```
 */
const Switch: FC<SwitchProps> = memo(({ label, helperText, error, id, className, disabled, size = 'md', onCheckedChange, ...props }) => {
    const generatedId = useId()
    const labelId = useId()
    const switchId = id ?? (label ? generatedId : undefined)
    const hasError = Boolean(error)
    const helperId = (helperText || error) ? `${switchId}-helper` : undefined

    return (
        <Flex
            as={'span'}
            inline
            flexDirection={'column'}
            gap={'xs'}
            alignItems={'start'}
            className={cn(SWITCH_STYLES.wrapper, disabled && SWITCH_STYLES.wrapperDisabled)}
        >
            <Flex
                as={'span'}
                inline
                gap={'sm'}
                alignItems={'center'}
            >
                <BaseSwitch.Root
                    id={switchId}
                    disabled={disabled}
                    aria-labelledby={label ? labelId : undefined}
                    aria-describedby={helperId}
                    aria-invalid={hasError || undefined}
                    className={cn(SWITCH_STYLES.root({ size, error: hasError }), className)}
                    onCheckedChange={onCheckedChange}
                    {...props}
                >
                    <BaseSwitch.Thumb className={SWITCH_STYLES.thumb({ size })} />
                </BaseSwitch.Root>

                {label && (
                    <FormLabel
                        id={labelId}
                        className={cn(SWITCH_STYLES.label, disabled && SWITCH_STYLES.labelDisabled)}
                    >
                        {label}
                    </FormLabel>
                )}
            </Flex>

            {(error || helperText) && (
                <HelperText
                    id={helperId}
                    hasError={hasError}
                >
                    {error ?? helperText}
                </HelperText>
            )}
        </Flex>
    )
})

Switch.displayName = 'Switch'

export default Switch
