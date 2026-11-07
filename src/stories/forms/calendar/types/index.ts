import { MODES } from '@stories/forms/calendar/constants'
import type { CalendarProps } from '@components/forms/calendar'

export type CalendarSelection = Extract<CalendarProps, { mode: 'single' | 'multiple' | 'range' }>['selected']

export type CalendarArgs = Readonly<Pick<CalendarProps, 'captionLabels' | 'className' | 'disabled' | 'onDayClick' | 'month' | 'defaultMonth' | 'onMonthChange' | 'startMonth' | 'endMonth'> & {
    mode?: (typeof MODES)[number]
    showOutsideDays?: boolean
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    startYear?: number
    endYear?: number
    selected?: CalendarSelection
    onSelect?: (...args: Parameters<NonNullable<Extract<CalendarProps, { mode: 'single' | 'multiple' | 'range' }>['onSelect']>>) => void
}>
