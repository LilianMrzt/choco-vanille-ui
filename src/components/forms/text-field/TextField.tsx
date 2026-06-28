import * as RadixLabel from '@radix-ui/react-label'
import { useId, useRef, useState, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { Icon } from '@components/foundation/icon'
import { IconButton } from '@components/actions/icon-button'
import {
    textFieldWrapperClass,
    textFieldFieldClass,
    textFieldStartIconClass,
    textFieldEndActionClass,
    textFieldLabelClass,
    textFieldInputRecipe,
    textFieldHelperClass,
    textFieldErrorClass,
} from '@components/forms/text-field/TextField.css.ts'
import type { TextFieldProps } from '@components/forms/text-field/types/TextField.props.ts'
import type { TextFieldSize } from '@components/forms/text-field/types/TextField.types.ts'

/** Maps field size to the icon size rendered in the start slot. */
const fieldSizeToIconSize: Record<NonNullable<TextFieldSize>, 'xs' | 'sm'> = {
    sm: 'xs',
    md: 'xs',
    lg: 'sm',
}

/** Maps field size to the IconButton size used in the end-action slot. */
const fieldSizeToActionSize: Record<NonNullable<TextFieldSize>, 'sm' | 'md'> = {
    sm: 'sm',
    md: 'sm',
    lg: 'md',
}

/**
 * A styled text input built with a native `<input>` and `@radix-ui/react-label`.
 *
 * - `startIcon` — Iconify icon name rendered on the left.
 * - `endAction` — any ReactNode (e.g. `<IconButton>`) rendered on the right.
 * - `type="password"` — auto-shows an eye-toggle `IconButton` (overrides `endAction`).
 * - `width` — overrides the default `100%` wrapper width.
 *
 * Focus ring behaviour: visible only on keyboard navigation (Tab). A click on the
 * input shows the primary border without the ring halo, detected via `onMouseDown`
 * and a `data-mouse-focus` attribute.
 *
 * @example
 * ```tsx
 * <TextField label="Email" startIcon="mdi:email" placeholder="you@example.com" />
 * <TextField label="Password" type="password" />
 * <TextField label="Search" endAction={<IconButton icon="mdi:magnify" aria-label="Search" variant="ghost" color="primary" />} />
 * <TextField label="Amount" width="12rem" />
 * ```
 */
const TextField: FC<TextFieldProps> = ({
    label,
    helperText,
    error,
    size = 'md',
    id,
    className,
    disabled,
    ref,
    startIcon,
    endAction,
    width,
    type,
    onMouseDown,
    onFocus,
    onBlur,
    ...props
}) => {
    const generatedId = useId()
    const inputId = id ?? (label ? generatedId : undefined)
    const helperId = `${generatedId}-helper`
    const hasError = Boolean(error)
    const isPassword = type === 'password'

    const [showPassword, setShowPassword] = useState(false)

    // ── Click-focus detection (suppresses the ring on mouse click) ────────────
    const pointerDownRef = useRef(false)

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
        pointerDownRef.current = true
        onMouseDown?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (pointerDownRef.current) {
            e.currentTarget.setAttribute('data-mouse-focus', '')
            pointerDownRef.current = false
        }
        onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        pointerDownRef.current = false
        e.currentTarget.removeAttribute('data-mouse-focus')
        onBlur?.(e)
    }

    // ── Derived values ────────────────────────────────────────────────────────
    const hasStartIcon = Boolean(startIcon)
    const hasEndAction = isPassword || Boolean(endAction)

    const resolvedEndAction = isPassword ? (
        <IconButton
            icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            variant={'ghost'}
            color={'primary'}
            size={fieldSizeToActionSize[size]}
            type={'button'}
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
        />
    ) : endAction

    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
        <div
            className={textFieldWrapperClass}
            style={width !== undefined ? { width } : undefined}
        >
            {label && (
                <RadixLabel.Root
                    htmlFor={inputId}
                    className={textFieldLabelClass}
                    data-disabled={disabled ? '' : undefined}
                >
                    {label}
                </RadixLabel.Root>
            )}

            <div className={textFieldFieldClass}>
                {startIcon && (
                    <span className={textFieldStartIconClass}>
                        <Icon
                            icon={startIcon}
                            size={fieldSizeToIconSize[size]}
                        />
                    </span>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    type={resolvedType}
                    disabled={disabled}
                    aria-invalid={hasError || undefined}
                    aria-describedby={error || helperText ? helperId : undefined}
                    onMouseDown={handleMouseDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={cn(
                        textFieldInputRecipe({ size, hasError, hasStartIcon, hasEndAction }),
                        className,
                    )}
                    {...props}
                />

                {hasEndAction && (
                    <span className={textFieldEndActionClass}>
                        {resolvedEndAction}
                    </span>
                )}
            </div>

            {(error || helperText) && (
                <span
                    id={helperId}
                    className={error ? textFieldErrorClass : textFieldHelperClass}
                >
                    {error ?? helperText}
                </span>
            )}
        </div>
    )
}

TextField.displayName = 'TextField'

export default TextField
