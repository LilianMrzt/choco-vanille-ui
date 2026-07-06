import * as RadixSwitch from '@radix-ui/react-switch'
import { useId, type FC } from 'react'

import { Typography } from '@components/foundation/typography'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'
import { SWITCH_STYLES } from '@components/forms/switch/Switch.css.ts'
import type { SwitchProps } from '@components/forms/switch/types/Switch.props.ts'

/**
 * A styled switch control built on top of `@radix-ui/react-switch`.
 *
 * Supports controlled (`checked` + `onCheckedChange`) and uncontrolled
 * (`defaultChecked`) modes, plus an optional inline `label`.
 *
 * @example
 * ```tsx
 * <Switch label="Airplane mode" checked={enabled} onCheckedChange={setEnabled} />
 * ```
 */
const Switch: FC<SwitchProps> = ({ label, helperText, error, id, className, disabled, size = 'md', ...props }) => {
    const generatedId = useId()
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
                <RadixSwitch.Root
                    id={switchId}
                    disabled={disabled}
                    aria-describedby={helperId}
                    aria-invalid={hasError || undefined}
                    className={cn(SWITCH_STYLES.root({ size, error: hasError }), className)}
                    {...props}
                >
                    <RadixSwitch.Thumb className={SWITCH_STYLES.thumb({ size })} />
                </RadixSwitch.Root>

                {label && (
                    <Typography
                        as={'label'}
                        variant={'label'}
                        color={'foreground'}
                        htmlFor={switchId}
                        className={cn(SWITCH_STYLES.label, disabled && SWITCH_STYLES.labelDisabled)}
                    >
                        {label}
                    </Typography>
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
}

Switch.displayName = 'Switch'

export default Switch
