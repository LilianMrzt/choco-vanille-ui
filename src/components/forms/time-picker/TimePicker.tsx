import { IconButton } from '@components/actions/icon-button'
import { TextField } from '@components/forms/text-field'
import TimePickerPanel from '@components/forms/time-picker/components/time-picker-panel/TimePickerPanel.tsx'
import { DEFAULT_HOUR_STEP, DEFAULT_MINUTE_STEP } from '@components/forms/time-picker/constants'
import { useTimePicker } from '@components/forms/time-picker/hooks/useTimePicker.hook.ts'
import { TIME_PICKER_STYLES } from '@components/forms/time-picker/styles/TimePicker.css.ts'
import type { TimePickerProps } from '@components/forms/time-picker/types/TimePicker.props.ts'
import { Popover } from '@components/overlay/popover'
import ClockIcon from '@resources/asset/ClockIcon.svg?react'
import { cn } from '@utils/cn.ts'
import { memo, useCallback, useRef } from 'react'

/**
 * A time picker that combines a native `type="time"` text field with a popover
 * listing hours and minutes.
 *
 * - Typing a valid `HH:mm` time updates the popover and calls `onChange`.
 * - Choosing an hour updates the input; choosing a minute also closes the popover.
 * - Incomplete typed values are kept in the input but do not update the selected
 *   time until they become valid.
 * - Closing the popover returns focus to the input.
 *
 * @example
 * ```tsx
 * const [time, setTime] = useState<string | undefined>()
 * <TimePicker label="Start time" value={time} onChange={setTime} />
 * ```
 */
const TimePicker = memo(
    ({
        value,
        defaultValue,
        onChange,
        defaultPanelTime,
        minTime,
        maxTime,
        hourStep = DEFAULT_HOUR_STEP,
        minuteStep = DEFAULT_MINUTE_STEP,
        showNowButton = false,
        clearable = false,
        nowLabel = 'Now',
        clearLabel = 'Clear',
        id,
        disabled,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        panelAriaLabel = 'Time',
        hoursAriaLabel = 'Hours',
        minutesAriaLabel = 'Minutes',
        triggerAriaLabel = 'Open time picker',
        onKeyDown,
        ...textFieldProps
    }: TimePickerProps) => {
        const {
            selectedTime,
            inputValue,
            open,
            inputId,
            handleInputChange,
            handleInputKeyDown,
            handleHourSelect,
            handleMinuteSelect,
            handleNowSelect,
            handleClear,
            setOpen,
        } = useTimePicker({
            value,
            defaultValue,
            onChange,
            id,
            defaultPanelTime,
            minTime,
            maxTime,
        })

        const inputRef = useRef<HTMLInputElement>(null)

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                handleInputKeyDown(event)
                onKeyDown?.(event)
            },
            [handleInputKeyDown, onKeyDown],
        )

        const handleInputClick = useCallback(
            (event: React.MouseEvent<HTMLInputElement>) => {
                // Stops mobile browsers from opening their native time picker.
                event.preventDefault()
            },
            [],
        )

        const handleTriggerMouseDown = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault()
            },
            [],
        )

        return (
            <Popover
                open={open}
                onOpenChange={setOpen}
            >
                <TextField
                    {...textFieldProps}
                    ref={inputRef}
                    id={inputId}
                    type={'time'}
                    min={minTime}
                    max={maxTime}
                    disabled={disabled}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onClick={handleInputClick}
                    className={cn(TIME_PICKER_STYLES.input, textFieldProps.className)}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    aria-haspopup={'dialog'}
                    endAction={
                        <Popover.Trigger>
                            <IconButton
                                icon={ClockIcon}
                                aria-label={triggerAriaLabel}
                                variant={'ghost'}
                                color={'primary'}
                                size={'sm'}
                                type={'button'}
                                disabled={disabled}
                                onMouseDown={handleTriggerMouseDown}
                            />
                        </Popover.Trigger>
                    }
                />

                <Popover.Content
                    side={'bottom'}
                    align={'end'}
                    padding={'none'}
                    aria-label={panelAriaLabel}
                    initialFocus={false}
                    finalFocus={inputRef}
                >
                    <TimePickerPanel
                        selectedTime={selectedTime}
                        defaultPanelTime={defaultPanelTime}
                        minTime={minTime}
                        maxTime={maxTime}
                        hourStep={hourStep}
                        minuteStep={minuteStep}
                        hoursAriaLabel={hoursAriaLabel}
                        minutesAriaLabel={minutesAriaLabel}
                        showNowButton={showNowButton}
                        clearable={clearable}
                        nowLabel={nowLabel}
                        clearLabel={clearLabel}
                        onHourSelect={handleHourSelect}
                        onMinuteSelect={handleMinuteSelect}
                        onNowSelect={handleNowSelect}
                        onClear={handleClear}
                    />
                </Popover.Content>
            </Popover>
        )
    },
)

TimePicker.displayName = 'TimePicker'

export default TimePicker
