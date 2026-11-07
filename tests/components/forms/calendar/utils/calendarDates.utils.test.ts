import { describe, expect, it } from 'vitest'

import { createLocalDate, findClosestEnabledDay } from '@components/forms/calendar/utils/calendarDates.utils.ts'

describe('findClosestEnabledDay', () => {
    it('prefers the later day when two enabled days are equally close', () => {
        expect(findClosestEnabledDay(
            new Date(2024, 0, 15, 23),
            new Date(2024, 0, 1),
            new Date(2024, 0, 31),
            new Date(2024, 0, 15),
        )).toEqual(new Date(2024, 0, 16))
    })

    it('combines exclusive boundary matchers and predicate matchers', () => {
        expect(findClosestEnabledDay(
            new Date(2024, 0, 1),
            new Date(2024, 0, 1),
            new Date(2024, 0, 31),
            [{ before: new Date(2024, 0, 10, 23) }, { after: new Date(2024, 0, 20) }, (date) => date.getDate() === 10],
        )).toEqual(new Date(2024, 0, 11))
    })

    it('returns no date when the entire interval is disabled', () => {
        const start = new Date(2024, 0, 1)
        const end = new Date(2024, 0, 4)
        expect(findClosestEnabledDay(start, start, end, () => true)).toBeUndefined()
        expect(findClosestEnabledDay(start, start, end, [{ dayOfWeek: [0, 1, 2] }, { dayOfWeek: [3, 4, 5, 6] }])).toBeUndefined()
        expect(findClosestEnabledDay(start, start, end, { from: start, to: end })).toBeUndefined()
        expect(findClosestEnabledDay(start, start, end, [{ before: end }, { after: start }])).toBeUndefined()
    })

    it('keeps years below 100 in the local calendar', () => {
        const first = createLocalDate(75, 0, 1)
        const target = createLocalDate(75, 0, 15)
        expect(findClosestEnabledDay(target, first, createLocalDate(75, 0, 31), target))
            .toEqual(createLocalDate(75, 0, 16))
    })
})
