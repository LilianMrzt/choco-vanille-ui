import { describe, expect, it } from 'vitest'

import {
    formatDateToString,
    parseStringToDate,
} from '@components/forms/date-picker/utils/datePicker.utils.ts'

describe('formatDateToString', () => {
    it('formats a valid local date as YYYY-MM-DD', () => {
        expect(formatDateToString(new Date(2024, 6, 4))).toBe('2024-07-04')
    })

    it('pads single-digit months and days', () => {
        expect(formatDateToString(new Date(2024, 0, 1))).toBe('2024-01-01')
    })

    it('returns an empty string when the date is undefined', () => {
        expect(formatDateToString(undefined)).toBe('')
    })

    it('returns an empty string when the date is invalid', () => {
        expect(formatDateToString(new Date(NaN))).toBe('')
    })
})

describe('parseStringToDate', () => {
    it('parses a valid ISO date string into a local Date', () => {
        const date = parseStringToDate('2024-07-04')
        expect(date).toBeDefined()
        expect(date?.getFullYear()).toBe(2024)
        expect(date?.getMonth()).toBe(6)
        expect(date?.getDate()).toBe(4)
    })

    it('returns undefined for an empty string', () => {
        expect(parseStringToDate('')).toBeUndefined()
    })

    it('returns undefined for a malformed date string', () => {
        expect(parseStringToDate('2024/07/04')).toBeUndefined()
    })

    it('returns undefined for an invalid calendar date', () => {
        expect(parseStringToDate('2024-02-30')).toBeUndefined()
    })

    it('returns undefined for a non-existent month', () => {
        expect(parseStringToDate('2024-13-01')).toBeUndefined()
    })
})
