import { IconButton } from '@components/actions/icon-button'
import FormLabel from '@components/forms/_shared/components/form-label/FormLabel.tsx'
import {
    TextFieldStartIcon,
    TextFieldEndAction,
} from '@components/forms/text-field/components/index.ts'
import { TEXT_FIELD_STYLES } from '@components/forms/text-field/styles/TextField.css.ts'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { fieldSizeToActionSize } from '@components/forms/text-field/constants'
import { useTextField } from '@components/forms/text-field/hooks/useTextfield.hook.tsx'
import type { TextFieldCompound } from '@components/forms/text-field/types'
import { Flex } from '@components/layout/flex'
import EyeIcon from '@resources/asset/EyeIcon.svg?react'
import EyeOffIcon from '@resources/asset/EyeOffIcon.svg?react'
import { cn } from '@utils/cn.ts'
import { vars } from '@theme/contract.css.ts'
import { memo, useCallback } from 'react'
import type { TextFieldProps } from '@/components'

/**
  * A styled text input built with a native `<input>` and selectable label text.
  *
  * - `startIcon` - Iconify icon name rendered on the left.
  * - `endAction` - any ReactNode (e.g. `<IconButton>`) rendered on the right.
  * - `type="password"` - auto-shows an eye-toggle `IconButton` (overrides `endAction`).
  * - `width` - overrides the default `100%` wrapper width.
  *
  * Focus ring behavior: visible only on keyboard navigation (Tab). A click on the
  * input shows the primary border without the ring halo, detected via `onMouseDown`
  * and a `data-mouse-focus` attribute.
  *
  * @example
  * ```tsx
  * <TextField label="Email" startIcon="lucide:mail" placeholder="you@example.com" />
  * <TextField label="Password" type="password" />
  * <TextField label="Search" endAction={<IconButton icon="lucide:search" aria-label="Search" variant="ghost" color="primary" />} />
  * <TextField label="Amount" width="12rem" />
  * ```
  */
const TextField = memo<TextFieldProps>((props) => {
    const {
        inputId,
        helperId,
        hasError,
        hasStartIcon,
        hasEndAction,
        handleMouseDown,
        handleFocus,
        handleBlur,
        resolvedType,
        isPassword,
        showPassword,
        setShowPassword,
    } = useTextField(props)

    const {
        disabled,
        startIcon,
        className,
        width,
        error,
        helperText,
        label,
        required,
        showRequiredIndicator = true,
        endAction,
        size: sizeProp,
        fontSize: fontSizeProp = 'md',
        placeholder,
        value,
        onChange,
        onKeyDown,
        onKeyUp,
        ref,
        style: inputStyle,
        type: _type,
        'aria-labelledby': ariaLabelledBy,
        ...inputProps
    } = props
    const size = sizeProp ?? 'md'
    const labelId = label && inputId ? `${inputId}-label` : undefined

    const handleTogglePassword = useCallback(
        () => setShowPassword(!showPassword),
        [setShowPassword, showPassword],
    )

    const resolvedEndAction = isPassword ? (
        <IconButton
            icon={showPassword ? EyeOffIcon : EyeIcon}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            variant={'ghost'}
            color={'primary'}
            size={fieldSizeToActionSize[size]}
            type={'button'}
            tabIndex={-1}
            onClick={handleTogglePassword}
        />
    ) : (
        endAction
    )

    return (
        <Flex
            flexDirection={'column'}
            gap={'xs'}
            width={'100%'}
            alignItems={'start'}
            style={width !== undefined ? { width } : undefined}
        >
            {label && (
                <FormLabel
                    id={labelId}
                    disabled={disabled}
                    required={required && showRequiredIndicator}
                    fontSize={fontSizeProp}
                >
                    {label}
                </FormLabel>
            )}

            <Flex
                position={'relative'}
                width={'100%'}
                gap={'none'}
            >
                {startIcon && (
                    <TextFieldStartIcon
                        icon={startIcon}
                        size={size}
                    />
                )}

                <input
                    ref={ref}
                    id={inputId}
                    // `type` is resolved by useTextField for password toggling.
                    type={resolvedType}
                    disabled={disabled}
                    required={required}
                    aria-labelledby={ariaLabelledBy ?? labelId}
                    aria-invalid={hasError || undefined}
                    aria-describedby={error || helperText ? helperId : undefined}
                    onMouseDown={handleMouseDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={cn(
                        TEXT_FIELD_STYLES.recipe({
                            size,
                            hasError,
                            hasStartIcon,
                            hasEndAction,
                        }),
                        className,
                    )}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    {...inputProps}
                    style={{ fontSize: vars.fontSize[fontSizeProp], ...inputStyle }}
                />

                {hasEndAction && (
                    <TextFieldEndAction>{resolvedEndAction}</TextFieldEndAction>
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
}) as unknown as TextFieldCompound

TextField.displayName = 'TextField'
TextField.Label = FormLabel
TextField.StartIcon = TextFieldStartIcon
TextField.EndAction = TextFieldEndAction

export default TextField
