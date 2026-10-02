import { memo, useEffect, useMemo, useRef } from 'react'

import { Button } from '@components/actions/button'
import { TIME_PICKER_PANEL_STYLES } from '@components/forms/time-picker/components/time-picker-panel/styles/TimePickerPanel.css.ts'
import type { TimePickerPanelProps } from '@components/forms/time-picker/components/time-picker-panel/types/TimePickerPanel.props.ts'
import {
    getHourOptions,
    getMinuteOptions,
    isTimeInRange,
    splitTime,
} from '@components/forms/time-picker/utils/timePicker.utils.ts'

/**
 * Two scrollable lists, hours and minutes, used inside the TimePicker popover.
 * Options outside the allowed range are not listed. The selected values, or the
 * default panel time, are scrolled into view on mount.
 */
const TimePickerPanel = memo(
    ({
        selectedTime,
        defaultPanelTime,
        minTime,
        maxTime,
        hourStep,
        minuteStep,
        hoursAriaLabel,
        minutesAriaLabel,
        showNowButton,
        clearable,
        nowLabel,
        clearLabel,
        onHourSelect,
        onMinuteSelect,
        onNowSelect,
        onClear,
    }: TimePickerPanelProps) => {
        const selected = splitTime(selectedTime)
        const reference = selected ?? splitTime(defaultPanelTime)
        const referenceHour = reference?.hour
        const hours = useMemo(
            () => getHourOptions(hourStep).filter(
                hour => isTimeInRange(`${hour}:59`, minTime, undefined)
                    && isTimeInRange(`${hour}:00`, undefined, maxTime),
            ),
            [hourStep, minTime, maxTime],
        )
        const minutes = useMemo(
            () => getMinuteOptions(minuteStep).filter(
                minute => referenceHour === undefined
                    || isTimeInRange(`${referenceHour}:${minute}`, minTime, maxTime),
            ),
            [minuteStep, referenceHour, minTime, maxTime],
        )
        const rootRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            rootRef.current
                ?.querySelectorAll<HTMLElement>('[aria-pressed="true"], [data-reference="true"]')
                .forEach((item) => {
                    const column = item.parentElement?.parentElement
                    if (column) {
                        column.scrollTop = item.offsetTop - column.clientHeight / 2 + item.clientHeight / 2
                    }
                })
        }, [])

        const getState = (isSelected: boolean, isReference: boolean) => ({
            'aria-pressed': isSelected,
            'data-reference': !selected && isReference ? true : undefined,
        })

        return (
            <div
                ref={rootRef}
                className={TIME_PICKER_PANEL_STYLES.root}
            >
                <div className={TIME_PICKER_PANEL_STYLES.body}>
                    <div className={TIME_PICKER_PANEL_STYLES.group}>
                        <p className={TIME_PICKER_PANEL_STYLES.title}>{hoursAriaLabel}</p>
                        <ul
                            aria-label={hoursAriaLabel}
                            className={TIME_PICKER_PANEL_STYLES.column}
                        >
                            {hours.map((hour) => (
                                <li key={hour}>
                                    <button
                                        type={'button'}
                                        {...getState(selected?.hour === hour, reference?.hour === hour)}
                                        className={TIME_PICKER_PANEL_STYLES.item}
                                        onClick={() => onHourSelect(hour)}
                                    >
                                        {hour}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={TIME_PICKER_PANEL_STYLES.group}>
                        <p className={TIME_PICKER_PANEL_STYLES.title}>{minutesAriaLabel}</p>
                        <ul
                            aria-label={minutesAriaLabel}
                            className={TIME_PICKER_PANEL_STYLES.column}
                        >
                            {minutes.map((minute) => (
                                <li key={minute}>
                                    <button
                                        type={'button'}
                                        {...getState(selected?.minute === minute, reference?.minute === minute)}
                                        className={TIME_PICKER_PANEL_STYLES.item}
                                        onClick={() => onMinuteSelect(minute)}
                                    >
                                        {minute}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {(showNowButton || clearable) && (
                    <div className={TIME_PICKER_PANEL_STYLES.footer}>
                        {clearable
                            ? (
                                <Button
                                    label={clearLabel}
                                    variant={'ghost'}
                                    size={'sm'}
                                    type={'button'}
                                    onClick={onClear}
                                />
                            )
                            : <span />}
                        {showNowButton && (
                            <Button
                                label={nowLabel}
                                variant={'ghost'}
                                size={'sm'}
                                type={'button'}
                                onClick={onNowSelect}
                            />
                        )}
                    </div>
                )}
            </div>
        )
    },
)

TimePickerPanel.displayName = 'TimePickerPanel'

export default TimePickerPanel
