import { describe, expect, it } from 'vitest'

import {
    clampTime,
    getHourOptions,
    getMinuteOptions,
    isTimeInRange,
    isValidTime,
    joinTime,
    splitTime,
} from '@components/forms/time-picker/utils/timePicker.utils.ts'

describe('isValidTime', () => {
    it('accepts 24-hour HH:mm times', () => {
        expect(isValidTime('00:00')).toBe(true)
        expect(isValidTime('23:59')).toBe(true)
    })

    it('rejects invalid values', () => {
        expect(isValidTime('24:00')).toBe(false)
        expect(isValidTime('12:60')).toBe(false)
        expect(isValidTime('9:30')).toBe(false)
        expect(isValidTime('')).toBe(false)
        expect(isValidTime(undefined)).toBe(false)
    })
})

describe('splitTime / joinTime', () => {
    it('splits a valid time', () => {
        expect(splitTime('09:30')).toEqual({ hour: '09', minute: '30' })
    })

    it('returns undefined for invalid times', () => {
        expect(splitTime('nope')).toBeUndefined()
    })

    it('joins hour and minute', () => {
        expect(joinTime('09', '05')).toBe('09:05')
    })
})

describe('options', () => {
    it('lists 24 hours', () => {
        const hours = getHourOptions()
        expect(hours).toHaveLength(24)
        expect(hours[0]).toBe('00')
        expect(hours[23]).toBe('23')
    })

    it('lists minutes by step', () => {
        expect(getMinuteOptions(15)).toEqual(['00', '15', '30', '45'])
    })

    it('falls back to every minute for invalid steps', () => {
        expect(getMinuteOptions(0)).toHaveLength(60)
    })
})

describe('hour step', () => {
    it('lists hours by step', () => {
        expect(getHourOptions(6)).toEqual(['00', '06', '12', '18'])
    })
})

describe('range helpers', () => {
    it('checks inclusive bounds', () => {
        expect(isTimeInRange('09:00', '09:00', '17:00')).toBe(true)
        expect(isTimeInRange('08:59', '09:00', '17:00')).toBe(false)
        expect(isTimeInRange('17:01', '09:00', '17:00')).toBe(false)
        expect(isTimeInRange('12:00')).toBe(true)
    })

    it('clamps a time to the nearest bound', () => {
        expect(clampTime('07:00', '09:00', '17:00')).toBe('09:00')
        expect(clampTime('20:00', '09:00', '17:00')).toBe('17:00')
        expect(clampTime('12:00', '09:00', '17:00')).toBe('12:00')
    })
})