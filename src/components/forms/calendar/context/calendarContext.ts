import { createContext, useContext } from 'react'

export type CalendarView = 'day' | 'month' | 'year'

export type CalendarContextValue = {
    view: CalendarView
    setView: (v: CalendarView) => void
    currentMonth: Date
    setCurrentMonth: (d: Date) => void
    startYear: number
    endYear: number
    startMonth?: Date
    endMonth?: Date
    locale?: string
}

export const CalendarContext = createContext<CalendarContextValue | undefined>(undefined)

export const useCalendarContext = (): CalendarContextValue => {
    const ctx = useContext(CalendarContext)
    if (!ctx) {throw new Error('useCalendarContext must be used within a Calendar')}
    return ctx
}
