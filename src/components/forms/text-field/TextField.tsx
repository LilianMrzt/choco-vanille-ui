import { IconButton } from '@components/actions/icon-button'
import {
    TextFieldLabel,
    TextFieldStartIcon,
    TextFieldEndAction,
} from '@components/forms/text-field/components/index.ts'
import { TEXT_FIELD_STYLES } from '@components/forms/text-field/TextField.css.ts'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { fieldSizeToActionSize } from '@components/forms/text-field/constants'
import { useTextField } from '@components/forms/text-field/hooks/useTextfield.hook.tsx'
import type { TextFieldCompound } from '@components/forms/text-field/types'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'

/**
 * A styled text input built with a native `<input>` and `@radix-ui/react-label`.
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
 * <TextField label="Email" startIcon="mdi:email" placeholder="you@example.com" />
 * <TextField label="Password" type="password" />
 * <TextField label="Search" endAction={<IconButton icon="mdi:magnify" aria-label="Search" variant="ghost" color="primary" />} />
 * <TextField label="Amount" width="12rem" />
 * ```
 */
const TextField = ((props) => {
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

    const { disabled, startIcon, className, width, error, helperText } = props
    const size = props.size ?? 'md'

    const resolvedEndAction = isPassword ? (
        <IconButton
            icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            variant={'ghost'}
            color={'primary'}
            size={fieldSizeToActionSize[size]}
            type={'button'}
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
        />
    ) : props.endAction

    return (
        <Flex
            direction={'column'}
            gap={'xs'}
            w={'full'}
            align={'start'}
            style={width !== undefined ? { width } : undefined}
        >
            {props.label && (
                <TextFieldLabel
                    htmlFor={inputId}
                    disabled={disabled}
                >
                    {props.label}
                </TextFieldLabel>
            )}

            <Flex
                position={'relative'}
                w={'full'}
                gap={'none'}
            >
                {startIcon && (
                    <TextFieldStartIcon
                        icon={startIcon}
                        size={size}
                    />
                )}

                <input
                    ref={props.ref}
                    id={inputId}
                    type={resolvedType}
                    disabled={disabled}
                    aria-invalid={hasError || undefined}
                    aria-describedby={error || helperText ? helperId : undefined}
                    onMouseDown={handleMouseDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={cn(
                        TEXT_FIELD_STYLES.recipe({ size, hasError, hasStartIcon, hasEndAction }),
                        className,
                    )}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                    onKeyUp={props.onKeyUp}
                />

                {hasEndAction && (
                    <TextFieldEndAction>
                        {resolvedEndAction}
                    </TextFieldEndAction>
                )}
            </Flex>

            {(error || helperText) && (
                <HelperText
                    id={helperId}
                    error={hasError}
                >
                    {error ?? helperText}
                </HelperText>
            )}
        </Flex>
    )
}) as TextFieldCompound

TextField.displayName = 'TextField'
TextField.Label = TextFieldLabel
TextField.StartIcon = TextFieldStartIcon
TextField.EndAction = TextFieldEndAction

export default TextField
