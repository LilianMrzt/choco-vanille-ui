import { memo, useId, useMemo, type MouseEvent } from 'react'
import { DateField, DateInput, DateSegment } from 'react-aria-components'
import type { Matcher } from 'react-day-picker'

import { Calendar } from '@components/forms/calendar'
import { Popover } from '@components/overlay/popover'
import { IconButton } from '@components/actions/icon-button'
import { Flex } from '@components/layout/flex'
import FormLabel from '@components/forms/_shared/components/form-label/FormLabel.tsx'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { TextFieldEndAction } from '@components/forms/text-field/components/index.ts'
import { TEXT_FIELD_STYLES } from '@components/forms/text-field/styles/TextField.css.ts'
import { fieldSizeToActionSize } from '@components/forms/text-field/constants'
import { useDatePicker } from '@components/forms/date-picker/hooks/useDatePicker.hook.ts'
import { DATE_PICKER_STYLES } from '@components/forms/date-picker/styles/DatePicker.css.ts'
import type { DatePickerProps } from '@components/forms/date-picker/types/DatePicker.props.ts'
import { toCalendarDate } from '@components/forms/date-picker/utils/datePicker.utils.ts'
import CalendarIcon from '@resources/asset/CalendarIcon.svg?react'
import { vars } from '@theme/contract.css.ts'
import { cn } from '@utils/cn.ts'

/**
 * A date field with segmented day, month and year inputs and a calendar popover.
 *
 * Built on React Aria's `DateField`, which provides segment-by-segment typing,
 * arrow-key stepping, locale-aware ordering and screen-reader semantics. The
 * look comes from the design system's TextField styles.
 *
 * - Typing a complete, valid date updates the calendar and calls `onChange`.
 * - Picking a day in the calendar updates the segments and closes the popover.
 *
 * @example
 * ```tsx
 * const [date, setDate] = useState<Date | undefined>()
 * <DatePicker label="Start date" value={date} onChange={setDate} />
 * ```
 */
const DatePicker = memo(
    ({
        id,
        value,
        defaultValue,
        onChange,
        minDate,
        maxDate,
        calendarProps,
        calendarAriaLabel = 'Calendar',
        label,
        error,
        helperText,
        required,
        showRequiredIndicator = true,
        disabled,
        size = 'md',
        fontSize = 'md',
        width,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        name,
    }: DatePickerProps) => {
        const generatedId = useId()
        const inputId = id ?? generatedId
        const labelId = label ? `${inputId}-label` : undefined
        const helperId = `${inputId}-helper`
        const hasError = Boolean(error)
        const showHelper = Boolean(error || helperText)

        const {
            selectedDate,
            calendarValue,
            open,
            setOpen,
            handleFieldChange,
            handleCalendarSelect,
        } = useDatePicker({ value, defaultValue, onChange })

        const minTime = minDate?.getTime()
        const maxTime = maxDate?.getTime()

        const minCalendarValue = useMemo(
            () => toCalendarDate(minTime === undefined ? undefined : new Date(minTime)) ?? undefined,
            [minTime],
        )
        const maxCalendarValue = useMemo(
            () => toCalendarDate(maxTime === undefined ? undefined : new Date(maxTime)) ?? undefined,
            [maxTime],
        )

        const calendarDefaultMonth = useMemo(() => selectedDate ?? new Date(), [selectedDate])

        const { className: calendarClassName, disabled: calendarDisabled, ...restCalendarProps } = calendarProps ?? {}

        const calendarDisabledMatchers = useMemo((): Matcher | Matcher[] | undefined => {
            const rangeMatchers: Matcher[] = [
                ...(minTime === undefined ? [] : [{ before: new Date(minTime) }]),
                ...(maxTime === undefined ? [] : [{ after: new Date(maxTime) }]),
            ]

            if (rangeMatchers.length === 0) {
                return calendarDisabled
            }

            const extraMatchers = calendarDisabled === undefined
                ? []
                : Array.isArray(calendarDisabled) ? calendarDisabled : [calendarDisabled]

            return [...rangeMatchers, ...extraMatchers]
        }, [minTime, maxTime, calendarDisabled])

        // Keep focus in the date segments when the calendar button is pressed.
        const preventFocusSteal = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault()

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
                        fontSize={fontSize}
                    >
                        {label}
                    </FormLabel>
                )}

                <Popover
                    open={open}
                    onOpenChange={setOpen}
                >
                    <Flex
                        position={'relative'}
                        width={'100%'}
                        gap={'none'}
                    >
                        <DateField
                            className={DATE_PICKER_STYLES.root}
                            value={calendarValue}
                            onChange={handleFieldChange}
                            isDisabled={disabled}
                            isRequired={required}
                            isInvalid={hasError}
                            minValue={minCalendarValue}
                            maxValue={maxCalendarValue}
                            name={name}
                            aria-label={ariaLabel}
                            aria-labelledby={ariaLabelledBy ?? labelId}
                            aria-describedby={
                                [ariaDescribedBy, showHelper ? helperId : undefined]
                                    .filter(Boolean)
                                    .join(' ') || undefined
                            }
                        >
                            <DateInput
                                className={({ isInvalid }) =>
                                    cn(
                                        TEXT_FIELD_STYLES.recipe({
                                            size,
                                            hasError: isInvalid,
                                            hasStartIcon: false,
                                            hasEndAction: true,
                                        }),
                                        DATE_PICKER_STYLES.input,
                                    )
                                }
                                style={{ fontSize: vars.fontSize[fontSize] }}
                            >
                                {(segment) => (
                                    <DateSegment
                                        segment={segment}
                                        className={DATE_PICKER_STYLES.segment}
                                    />
                                )}
                            </DateInput>
                        </DateField>

                        <TextFieldEndAction>
                            <Popover.Trigger>
                                <IconButton
                                    icon={CalendarIcon}
                                    aria-label={'Open calendar'}
                                    variant={'ghost'}
                                    color={'primary'}
                                    size={fieldSizeToActionSize[size]}
                                    type={'button'}
                                    disabled={disabled}
                                    onMouseDown={preventFocusSteal}
                                />
                            </Popover.Trigger>
                        </TextFieldEndAction>
                    </Flex>

                    <Popover.Content
                        side={'bottom'}
                        align={'end'}
                        padding={'none'}
                        aria-label={calendarAriaLabel}
                    >
                        <Calendar
                            mode={'single'}
                            selected={selectedDate}
                            onSelect={handleCalendarSelect}
                            defaultMonth={calendarDefaultMonth}
                            className={cn(DATE_PICKER_STYLES.calendar, calendarClassName)}
                            disabled={calendarDisabledMatchers}
                            {...restCalendarProps}
                        />
                    </Popover.Content>
                </Popover>

                {showHelper && (
                    <HelperText
                        id={helperId}
                        hasError={hasError}
                    >
                        {error ?? helperText}
                    </HelperText>
                )}
            </Flex>
        )
    },
)

DatePicker.displayName = 'DatePicker'

export default DatePicker
