import { DEFAULT_END_YEAR, DEFAULT_START_YEAR } from '@components/forms/calendar/constants'
import type { CalendarMatcher } from '@components/forms/calendar'
import type { DatePickerProps } from '@components/forms/date-picker/types'
import { compareDays, createLocalDate, findClosestEnabledDay } from '@components/forms/calendar/utils/calendarDates.utils.ts'

/**
 * Formats a local Gregorian date numerically using the locale's date order.
 * The day and month have two digits and the year has at least four.
 * @param date - Date to display in the local time zone.
 * @param locale - BCP 47 locale; defaults to `fr-FR`.
 * @returns The localized numeric date.
 * @example
 * formatDisplayDate(new Date(2027, 1, 16), 'fr-FR') // '16/02/2027'
 */
export const formatDisplayDate = (date: Date, locale = 'fr-FR'): string => {
    const formatter = new Intl.DateTimeFormat(locale, {
        calendar: 'gregory',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
    const formattedYear = new Intl.NumberFormat(locale, {
        minimumIntegerDigits: 4,
        numberingSystem: formatter.resolvedOptions().numberingSystem,
        useGrouping: false,
    }).format(date.getFullYear())

    return formatter.formatToParts(date).map((part) => part.type === 'year' ? formattedYear : part.value).join('')
}

/** Formats a local calendar date for form submission without UTC conversion. */
export const formatDateValue = (date?: Date): string => {
    if (!date) {return ''}
    const year = String(date.getFullYear()).padStart(4, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

/** Finds the nearest selectable day within the picker's navigation and date bounds. */
export const getInitialPickerDate = (
    calendar: DatePickerProps['calendarProps'],
    minDate: Date | undefined,
    maxDate: Date | undefined,
    disabled: readonly CalendarMatcher[],
): Date | undefined => {
    const start = calendar?.startMonth
        ? createLocalDate(calendar.startMonth.getFullYear(), calendar.startMonth.getMonth(), 1)
        : createLocalDate(calendar?.startYear ?? DEFAULT_START_YEAR, 0, 1)
    const end = calendar?.endMonth
        ? createLocalDate(calendar.endMonth.getFullYear(), calendar.endMonth.getMonth() + 1, 0)
        : createLocalDate(calendar?.endYear ?? DEFAULT_END_YEAR, 11, 31)
    const first = minDate && compareDays(minDate, start) > 0 ? minDate : start
    const last = maxDate && compareDays(maxDate, end) < 0 ? maxDate : end
    return findClosestEnabledDay(new Date(), first, last, disabled)
}
