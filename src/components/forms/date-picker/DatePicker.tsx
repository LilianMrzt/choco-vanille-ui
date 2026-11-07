import { useEffect, useId, useMemo, useRef, useState, type FC } from 'react'

import { Calendar, type CalendarMatcher } from '@components/forms/calendar'
import { compareDays } from '@components/forms/calendar/utils/calendarDates.utils.ts'
import { Popover } from '@components/overlay/popover'
import { Icon } from '@components/foundation/icon'
import { Flex } from '@components/layout/flex'
import FormLabel from '@components/forms/primitives/form-label/FormLabel.tsx'
import HelperText from '@components/forms/primitives/helper-text/HelperText.tsx'
import { TEXT_FIELD_STYLES } from '@components/forms/text-field/styles/TextField.css.ts'
import { DATE_PICKER_STYLES } from '@components/forms/date-picker/styles/DatePicker.css.ts'
import type { DatePickerProps } from '@components/forms/date-picker/types'
import { formatDateValue, formatDisplayDate, getInitialPickerDate } from '@components/forms/date-picker/utils/datePicker.utils.ts'
import CalendarIcon from '@resources/asset/CalendarIcon.svg?react'
import { cn } from '@utils/cn.ts'

/**
 * A date-selection button opening a calendar dialog. Provide `label`,
 * `aria-label`, or `aria-labelledby` for an accessible name. The selected
 * local date is submitted as `YYYY-MM-DD` when `name` is provided.
 * The date is displayed numerically in `DD/MM/YYYY` by default; `locale`
 * changes the numeric date format and the calendar's month and weekday names.
 * `required` displays an indicator but does not perform native validation;
 * applications are responsible for validation and can supply `error`.
 * Opening the calendar focuses the selected day or the nearest available day
 * to today. An explicit calendar month limits the initial focus to that month.
 * Disabled days remain focusable but cannot be selected.
 * @throws {RangeError} If date bounds are invalid or reversed.
 * @param props - Date, form, accessibility and calendar options.
 * @returns A date-selection control.
 * @example
 * <DatePicker label="Start date" name="start" />
 */
const DatePicker: FC<DatePickerProps> = (props) => {
    const {
        id, value, defaultValue, onChange, minDate, maxDate, calendarProps,
        calendarAriaLabel = 'Calendar', label, error, helperText, required,
        showRequiredIndicator = true, disabled, size = 'md', width, name,
        locale, placeholder = 'Select a date', requiredText = 'Required', 'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy, 'aria-describedby': ariaDescribedBy,
    } = props
    const generatedId = useId()
    const inputId = id ?? generatedId
    const labelId = label ? `${inputId}-label` : undefined
    const valueId = `${inputId}-value`
    const helperId = `${inputId}-helper`
    const requiredId = `${inputId}-required`
    const buttonRef = useRef<HTMLButtonElement>(null)
    const popupRef = useRef<HTMLDivElement>(null)
    const [internalDate, setInternalDate] = useState(defaultValue)
    const [open, setOpen] = useState(false)
    const selectedDate = 'value' in props ? value : internalDate
    const isControlled = 'value' in props
    useEffect(() => {
        const form = buttonRef.current?.form
        if (!form || isControlled) {return}
        const handleReset = (): void => setInternalDate(defaultValue)
        form.addEventListener('reset', handleReset)
        return () => form.removeEventListener('reset', handleReset)
    }, [defaultValue, isControlled])
    const valueText = selectedDate
        ? formatDisplayDate(selectedDate, locale)
        : placeholder
    const { className: calendarClassName, disabled: calendarDisabled, ...restCalendarProps } = calendarProps ?? {}
    if ((minDate && Number.isNaN(minDate.getTime())) || (maxDate && Number.isNaN(maxDate.getTime()))) {
        throw new RangeError('DatePicker bounds must be valid dates')
    }
    if (minDate && maxDate && compareDays(minDate, maxDate) > 0) {
        throw new RangeError('DatePicker minDate must not be after maxDate')
    }
    const disabledMatchers = useMemo<CalendarMatcher[]>(() => [
        ...(minDate ? [{ before: minDate }] : []),
        ...(maxDate ? [{ after: maxDate }] : []),
        ...(calendarDisabled === undefined ? [] : Array.isArray(calendarDisabled) ? calendarDisabled : [calendarDisabled]),
    ], [minDate, maxDate, calendarDisabled])
    const { month, defaultMonth, startMonth, endMonth, startYear, endYear } = restCalendarProps
    const initialDate = useMemo(() => {
        if (!open || selectedDate || month || defaultMonth) {return undefined}
        return getInitialPickerDate({ startMonth, endMonth, startYear, endYear }, minDate, maxDate, disabledMatchers)
    }, [open, selectedDate, month, defaultMonth, startMonth, endMonth, startYear, endYear, minDate, maxDate, disabledMatchers])
    const handleSelect = (date: Date | undefined): void => {
        setInternalDate(date)
        onChange?.(date)
        setOpen(false)
    }

    return (
        <Flex
            flexDirection={'column'}
            gap={4}
            width={'100%'}
            alignItems={'start'}
            className={DATE_PICKER_STYLES.root}
            style={width !== undefined ? { width } : undefined}
        >
            {label && (
                <FormLabel
                    id={labelId}
                    disabled={disabled}
                    required={required && showRequiredIndicator}
                >
                    {label}
                </FormLabel>
            )}
            <Popover
                open={open}
                onOpenChange={setOpen}
            >
                <Popover.Trigger>
                    <button
                        ref={buttonRef}
                        id={inputId}
                        type={'button'}
                        disabled={disabled}
                        aria-label={ariaLabel}
                        aria-labelledby={ariaLabelledBy || labelId ? `${ariaLabelledBy ?? labelId} ${valueId}` : undefined}
                        aria-describedby={[
                            ariaDescribedBy,
                            ariaLabel && !ariaLabelledBy && !labelId ? valueId : undefined,
                            required ? requiredId : undefined,
                            error || helperText ? helperId : undefined,
                        ].filter(Boolean).join(' ') || undefined}
                        className={cn(TEXT_FIELD_STYLES.recipe({ size, hasError: Boolean(error) }), DATE_PICKER_STYLES.input)}
                    >
                        <span
                            id={valueId}
                            className={DATE_PICKER_STYLES.segment}
                        >{valueText}</span>
                        <Icon
                            icon={CalendarIcon}
                            size={'sm'}
                        />
                    </button>
                </Popover.Trigger>
                <Popover.Content
                    ref={popupRef}
                    side={'bottom'}
                    align={'end'}
                    padding={0}
                    aria-label={calendarAriaLabel}
                    initialFocus={(openType) => openType === 'touch'
                        ? true
                        : popupRef.current?.querySelector<HTMLButtonElement>('[role="grid"] button[tabindex="0"]') ?? null}
                >
                    <Calendar
                        {...restCalendarProps}
                        locale={locale}
                        mode={'single'}
                        selected={selectedDate}
                        onSelect={handleSelect}
                        defaultMonth={defaultMonth ?? selectedDate ?? initialDate}
                        className={cn(DATE_PICKER_STYLES.calendar, calendarClassName)}
                        disabled={disabledMatchers}
                    />
                </Popover.Content>
            </Popover>
            {required && (
                <span
                    id={requiredId}
                    className={DATE_PICKER_STYLES.requiredDescription}
                >
                    {requiredText}
                </span>
            )}
            {name && (
                <input
                    type={'hidden'}
                    name={name}
                    value={formatDateValue(selectedDate)}
                    disabled={disabled}
                />
            )}
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
}

export default DatePicker
