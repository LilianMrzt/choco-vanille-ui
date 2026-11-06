import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { memo, useId, type FC } from 'react'

import FormLabel from '@components/forms/_shared/components/form-label/FormLabel.tsx'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'
import { SWITCH_STYLES } from '@components/forms/switch/Switch.css.ts'
import type { SwitchProps } from '@components/forms/switch/types'

/**
 * A two-state switch with optional label and supporting text. Provide an
 * accessible name through `label`, `aria-label` or `aria-labelledby`.
 * Use `checked` and `onCheckedChange` for controlled state, or
 * `defaultChecked` for uncontrolled state. Defaults to unchecked and md size.
 * The ref and native attributes are forwarded to the switch control.
 * @param props - Switch options and forwarded control attributes.
 * @param props.label - Optional visible accessible label.
 * @param props.helperText - Supporting text, replaced by an error when present.
 * @param props.error - Error message and invalid state.
 * @param props.id - Optional control ID.
 * @param props.className - Additional control class.
 * @param props.disabled - Disables interaction.
 * @param props.size - Size preset; defaults to md.
 * @param props.onCheckedChange - Receives the checked state and event details.
 * @param props["aria-describedby"] - Additional description IDs.
 * @returns The switch and its optional supporting text.
 * @example
 * ```tsx
 * <Switch label="Airplane mode" checked={enabled} onCheckedChange={setEnabled} />
 * ```
 */
const Switch: FC<SwitchProps> = memo(({ label, helperText, error, id, className, disabled, size = 'md', onCheckedChange, 'aria-describedby': describedBy, ...props }) => {
    const generatedId = useId()
    const labelId = useId()
    const switchId = id ?? (label ? generatedId : undefined)
    const hasError = Boolean(error)
    const helperId = (helperText || error) ? `${id ?? generatedId}-helper` : undefined
    const descriptionIds = [describedBy, helperId].filter(Boolean).join(' ') || undefined

    return (
        <Flex
            as={'span'}
            inline
            flexDirection={'column'}
            gap={4}
            alignItems={'start'}
            className={cn(SWITCH_STYLES.wrapper, disabled && SWITCH_STYLES.wrapperDisabled)}
        >
            <Flex
                as={'span'}
                inline
                gap={8}
                alignItems={'center'}
            >
                <BaseSwitch.Root
                    id={switchId}
                    disabled={disabled}
                    aria-labelledby={label ? labelId : undefined}
                    aria-describedby={descriptionIds}
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
