const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

/**
 * Formats a local Date as an ISO date string (`YYYY-MM-DD`).
 * Returns an empty string when the date is missing or invalid.
 */
export const formatDateToString = (date: Date | undefined): string => {
    if (!date || Number.isNaN(date.getTime())) {return ''}

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

/**
 * Parses an ISO date string (`YYYY-MM-DD`) into a local Date.
 * Returns `undefined` when the value is empty or does not represent a valid date.
 */
export const parseStringToDate = (value: string): Date | undefined => {
    if (!value || !ISO_DATE_REGEX.test(value)) {return undefined}

    const [year, month, day] = value.split('-').map(Number)
    const date = new Date(year, month - 1, day)

    if (Number.isNaN(date.getTime())) {return undefined}
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return undefined
    }

    return date
}
