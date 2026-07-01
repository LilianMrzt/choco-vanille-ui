import { YEARS_PER_PAGE } from '@components/forms/calendar/constants'

export const getDecadeStart = (year: number): number =>
    Math.floor(year / YEARS_PER_PAGE) * YEARS_PER_PAGE
