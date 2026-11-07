import type { CalendarMatcher, CalendarRange } from '@components/forms/calendar/types'

/** Constructs a local date, including years 0–99 and overflowing months or days. */
export const createLocalDate = (year: number, month: number, day: number): Date => {
    const date = new Date(0)
    date.setHours(0, 0, 0, 0)
    date.setFullYear(year, month, day)
    return date
}

/** Returns the local date at midnight without changing its calendar day. */
export const startOfDay = (date: Date): Date =>
    createLocalDate(date.getFullYear(), date.getMonth(), date.getDate())

/** Compares local calendar dates independently of their time of day. */
export const compareDays = (left: Date, right: Date): number =>
    startOfDay(left).getTime() - startOfDay(right).getTime()

/** Returns whether a local date matches any disabled-date rule. */
export const matchesDate = (date: Date, matchers?: CalendarMatcher | readonly CalendarMatcher[]): boolean => {
    if (matchers === undefined) {return false}
    if (Array.isArray(matchers)) {return matchers.some((matcher) => matchesDate(date, matcher))}
    if (typeof matchers === 'boolean') {return matchers}
    if (typeof matchers === 'function') {return matchers(date)}
    if (matchers instanceof Date) {return compareDays(date, matchers) === 0}
    if ('before' in matchers) {return compareDays(date, matchers.before) < 0}
    if ('after' in matchers) {return compareDays(date, matchers.after) > 0}
    if ('dayOfWeek' in matchers) {return matchers.dayOfWeek.includes(date.getDay())}
    if ('from' in matchers) {
        return compareDays(date, matchers.from) >= 0 && compareDays(date, matchers.to) <= 0
    }
    return false
}

/**
 * Finds the enabled local day closest to a reference within inclusive bounds.
 * Equidistant days prefer the later date; undefined means no day is enabled.
 * @param reference - Desired local day.
 * @param start - Inclusive lower bound.
 * @param end - Inclusive upper bound.
 * @param disabled - Rules for unavailable days.
 * @returns The nearest enabled date, or undefined.
 * @example
 * findClosestEnabledDay(new Date(2024, 0, 15), new Date(2024, 0, 1), new Date(2024, 0, 31))
 */
export const findClosestEnabledDay = (
    reference: Date,
    start: Date,
    end: Date,
    disabled?: CalendarMatcher | readonly CalendarMatcher[],
): Date | undefined => {
    let first = startOfDay(start)
    let last = startOfDay(end)
    const rules: readonly CalendarMatcher[] = disabled === undefined
        ? [] : Array.isArray(disabled) ? disabled : [disabled]
    const unavailableWeekdays = new Set<number>()
    for (const rule of rules) {
        if (rule === true) {return undefined}
        if (!rule || typeof rule !== 'object' || rule instanceof Date) {continue}
        if ('before' in rule && compareDays(rule.before, first) > 0) {first = startOfDay(rule.before)}
        if ('after' in rule && compareDays(rule.after, last) < 0) {last = startOfDay(rule.after)}
        if ('dayOfWeek' in rule) {
            for (const day of rule.dayOfWeek) {unavailableWeekdays.add(day)}
        }
    }
    if (first > last || [0, 1, 2, 3, 4, 5, 6].every((day) => unavailableWeekdays.has(day))) {return undefined}
    if (rules.some((rule) => typeof rule === 'object' && !(rule instanceof Date) && 'from' in rule &&
        compareDays(rule.from, first) <= 0 && compareDays(rule.to, last) >= 0)) {return undefined}

    const desired = startOfDay(reference)
    const center = desired < first ? first : desired > last ? last : desired
    if (!matchesDate(center, disabled)) {return center}

    const earlier = new Date(center)
    const later = new Date(center)
    while (earlier > first || later < last) {
        if (later < last) {
            later.setDate(later.getDate() + 1)
            if (!matchesDate(later, disabled)) {return new Date(later)}
        }
        if (earlier > first) {
            earlier.setDate(earlier.getDate() - 1)
            if (!matchesDate(earlier, disabled)) {return new Date(earlier)}
        }
    }

    return undefined
}

/** Returns whether the date belongs to an inclusive completed or partial range. */
export const isInRange = (date: Date, range?: CalendarRange): boolean =>
    range !== undefined && compareDays(date, range.from) >= 0 &&
    compareDays(date, range.to ?? range.from) <= 0

/** Creates the next range selection; a completed range starts a new selection. */
export const selectRange = (date: Date, range?: CalendarRange): CalendarRange => {
    if (!range || range.to) {return { from: date }}
    return compareDays(date, range.from) < 0
        ? { from: date, to: range.from }
        : { from: range.from, to: date }
}
