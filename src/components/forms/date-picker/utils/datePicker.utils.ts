import { CalendarDate, getLocalTimeZone, type DateValue } from '@internationalized/date'

/** Converts a JS Date into the calendar value used by React Aria's date field. */
export const toCalendarDate = (date?: Date): CalendarDate | null => {
    if (!date || Number.isNaN(date.getTime())) {return null}

    return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

/** Converts a React Aria date value back into a local JS Date. */
export const toJsDate = (value: DateValue | null): Date | undefined =>
    value ? value.toDate(getLocalTimeZone()) : undefined
