const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/

/** Returns whether the value is a valid 24-hour `HH:mm` time. */
export const isValidTime = (value: string | undefined): value is string =>
    value !== undefined && TIME_REGEX.test(value)

/**
 * Splits a `HH:mm` time into its hour and minute parts.
 * Returns `undefined` when the value is empty or invalid.
 */
export const splitTime = (
    value: string | undefined,
): { hour: string; minute: string } | undefined => {
    if (!isValidTime(value)) {return undefined}

    const [hour, minute] = value.split(':')

    return { hour, minute }
}

/** Builds a `HH:mm` time from an hour and a minute. */
export const joinTime = (hour: string, minute: string): string =>
    `${hour}:${minute}`

const pad = (value: number): string => String(value).padStart(2, '0')

const getSafeStep = (step: number, max: number): number =>
    Number.isInteger(step) && step >= 1 && step <= max ? step : 1

/**
 * Lists the hours of the day as two-digit strings, every `step` hours.
 * Invalid steps fall back to one hour.
 */
export const getHourOptions = (step = 1): string[] => {
    const safeStep = getSafeStep(step, 24)

    return Array.from(
        { length: Math.ceil(24 / safeStep) },
        (_, index) => pad(index * safeStep),
    )
}

/**
 * Lists the minutes of an hour as two-digit strings, every `step` minutes.
 * Invalid steps fall back to one minute.
 */
export const getMinuteOptions = (step: number): string[] => {
    const safeStep = getSafeStep(step, 60)

    return Array.from(
        { length: Math.ceil(60 / safeStep) },
        (_, index) => pad(index * safeStep),
    )
}

/**
 * Returns whether a time sits within the optional `min` and `max` bounds
 * (inclusive). Invalid bounds are ignored.
 */
export const isTimeInRange = (
    time: string,
    min?: string,
    max?: string,
): boolean =>
    (!isValidTime(min) || time >= min) && (!isValidTime(max) || time <= max)

/** Moves a time to the nearest bound when it falls outside the range. */
export const clampTime = (time: string, min?: string, max?: string): string => {
    if (isValidTime(min) && time < min) {return min}
    if (isValidTime(max) && time > max) {return max}

    return time
}

/** Returns the current local time as `HH:mm`. */
export const getCurrentTime = (now: Date = new Date()): string =>
    `${pad(now.getHours())}:${pad(now.getMinutes())}`
