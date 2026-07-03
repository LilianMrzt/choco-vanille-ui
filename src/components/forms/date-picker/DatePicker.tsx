import { Calendar } from '@components/forms/calendar'
import { TextField } from '@components/forms/text-field'
import { Popover } from '@components/overlay/popover'
import { IconButton } from '@components/actions/icon-button'
import { useDatePicker } from '@components/forms/date-picker/hooks/useDatePicker.hook.ts'
import { DATE_PICKER_STYLES } from '@components/forms/date-picker/DatePicker.css.ts'
import { cn } from '@utils/cn.ts'
import type { DatePickerProps } from '@components/forms/date-picker/types/DatePicker.props.ts'

/**
 * A date picker that combines a native `type="date"` text field with a
 * calendar popover.
 *
 * - Typing a valid `YYYY-MM-DD` date updates the calendar and calls `onChange`.
 * - Selecting a day in the calendar updates the input and closes the popover.
 * - Invalid or incomplete typed values are kept in the input but do not update
 *   the selected date until they become valid.
 *
 * @example
 * ```tsx
 * const [date, setDate] = useState<Date | undefined>()
 * <DatePicker label="Pick a date" value={date} onChange={setDate} />
 * ```
 */
const DatePicker = ({
    value,
    defaultValue,
    onChange,
    calendarProps,
    id,
    disabled,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    calendarAriaLabel = 'Calendar',
    onKeyDown,
    ...textFieldProps
}: DatePickerProps) => {
    const {
        selectedDate,
        inputValue,
        open,
        inputId,
        handleInputChange,
        handleInputKeyDown,
        handleCalendarSelect,
        setOpen,
    } = useDatePicker({ value, defaultValue, onChange, id })

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        handleInputKeyDown(event)
        onKeyDown?.(event)
    }

    const { className: calendarClassName, ...restCalendarProps } = calendarProps ?? {}

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <Popover.Trigger asChild>
                <TextField
                    {...textFieldProps}
                    id={inputId}
                    type={'date'}
                    disabled={disabled}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className={cn(DATE_PICKER_STYLES.input, textFieldProps.className)}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    aria-haspopup={'dialog'}
                    aria-expanded={undefined}
                    endAction={(
                        <IconButton
                            icon={'mdi:calendar-month'}
                            aria-label={'Open calendar'}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            type={'button'}
                            tabIndex={-1}
                            disabled={disabled}
                            onClick={(event) => {
                                event.stopPropagation()
                                setOpen(true)
                            }}
                        />
                    )}
                />
            </Popover.Trigger>

            <Popover.Content
                side={'bottom'}
                align={'start'}
                className={DATE_PICKER_STYLES.content}
                aria-label={calendarAriaLabel}
            >
                <Calendar
                    mode={'single'}
                    selected={selectedDate}
                    onSelect={handleCalendarSelect}
                    disabled={disabled}
                    className={cn(DATE_PICKER_STYLES.calendar, calendarClassName)}
                    {...restCalendarProps}
                />
            </Popover.Content>
        </Popover>
    )
}

DatePicker.displayName = 'DatePicker'

export default DatePicker
