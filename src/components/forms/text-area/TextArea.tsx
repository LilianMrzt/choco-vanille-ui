import {
    TextAreaLabel,
    TextAreaStartIcon,
    TextAreaEndAction,
} from '@components/forms/text-area/components/index.ts'
import { TEXT_AREA_STYLES } from '@components/forms/text-area/TextArea.css.ts'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { useAutoResizeTextArea } from '@components/forms/text-area/hooks/useAutoResizeTextArea.hook.tsx'
import { useTextArea } from '@components/forms/text-area/hooks/useTextArea.hook.tsx'
import type { TextAreaCompound } from '@components/forms/text-area/types'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'
import { useCallback, useRef } from 'react'

/**
 * A styled textarea built with a native `<textarea>` and `@radix-ui/react-label`.
 *
 * - `startIcon` - Iconify icon name rendered on the left.
 * - `endAction` - any ReactNode (e.g. `<IconButton>`) rendered on the right.
 * - `width` - overrides the default `100%` wrapper width.
 * - `rows` - sets the native number of visible text lines.
 * - `minRows` / `maxRows` - enables auto-resize; the textarea grows with content
 *   until it reaches `maxRows`, then stops expanding and shows a scrollbar.
 *   Manual resizing is always disabled.
 *
 * Focus ring behavior: visible only on keyboard navigation (Tab). A click on the
 * textarea shows the primary border without the ring halo, detected via `onMouseDown`
 * and a `data-mouse-focus` attribute.
 *
 * @example
 * ```tsx
 * <TextArea label="Description" placeholder="Tell us more…" rows={4} />
 * <TextArea label="Comment" startIcon="mdi:comment" minRows={2} maxRows={6} />
 * <TextArea label="Bio" endAction={<IconButton icon="mdi:close" aria-label="Clear" variant="ghost" color="primary" />} />
 * <TextArea label="Notes" width="24rem" />
 * ```
 */
const TextArea = ((props) => {
    const {
        inputId,
        helperId,
        hasError,
        hasStartIcon,
        hasEndAction,
        handleMouseDown,
        handleFocus,
        handleBlur,
    } = useTextArea(props)

    const {
        disabled,
        startIcon,
        className,
        width,
        error,
        helperText,
        label,
        endAction,
        size: sizeProp,
        placeholder,
        value,
        onChange,
        onKeyDown,
        onKeyUp,
        ref: forwardedRef,
        rows,
        minRows,
        maxRows,
        ...textareaProps
    } = props
    const size = sizeProp ?? 'md'

    const innerRef = useRef<HTMLTextAreaElement>(null)
    const setRef = useCallback((node: HTMLTextAreaElement | null) => {
        innerRef.current = node
        if (typeof forwardedRef === 'function') {
            forwardedRef(node)
        } else if (forwardedRef) {
            forwardedRef.current = node
        }
    }, [forwardedRef])

    const { isEnabled: autoResizeEnabled, resize } = useAutoResizeTextArea(innerRef, {
        minRows: minRows ?? rows,
        maxRows,
    })

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e)
        resize()
    }, [onChange, resize])

    return (
        <Flex
            flexDirection={'column'}
            gap={'xs'}
            width={'full'}
            alignItems={'start'}
            style={width !== undefined ? { width } : undefined}
        >
            {label && (
                <TextAreaLabel
                    htmlFor={inputId}
                    disabled={disabled}
                >
                    {label}
                </TextAreaLabel>
            )}

            <Flex
                position={'relative'}
                width={'full'}
                gap={'none'}
            >
                {startIcon && (
                    <TextAreaStartIcon
                        icon={startIcon}
                        size={size}
                    />
                )}

                <textarea
                    ref={setRef}
                    id={inputId}
                    disabled={disabled}
                    aria-invalid={hasError || undefined}
                    aria-describedby={error || helperText ? helperId : undefined}
                    onMouseDown={handleMouseDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={cn(
                        TEXT_AREA_STYLES.recipe({ size, hasError, hasStartIcon, hasEndAction }),
                        className,
                    )}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    rows={autoResizeEnabled ? (minRows ?? rows) : rows}
                    {...textareaProps}
                />

                {hasEndAction && (
                    <TextAreaEndAction>
                        {endAction}
                    </TextAreaEndAction>
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
}) as TextAreaCompound

TextArea.displayName = 'TextArea'
TextArea.Label = TextAreaLabel
TextArea.StartIcon = TextAreaStartIcon
TextArea.EndAction = TextAreaEndAction

export default TextArea
