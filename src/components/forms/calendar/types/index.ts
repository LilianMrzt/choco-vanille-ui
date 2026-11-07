import type { CalendarCaptionLabels } from '@components/forms/calendar/components/calendar-caption/types/CalendarCaption.props.ts'

/** Inclusive local-calendar dates; `to` is absent while a range is being chosen. */
export type CalendarRange = Readonly<{ from: Date; to?: Date }>

/** A date, weekday, exclusive boundary, inclusive range, or predicate. */
export type CalendarMatcher =
    | boolean
    | Date
    | Readonly<{ before: Date }>
    | Readonly<{ after: Date }>
    | Readonly<{ from: Date; to: Date }>
    | Readonly<{ dayOfWeek: readonly number[] }>
    | ((date: Date) => boolean)

type CalendarCommonProps = Readonly<{
    /** Additional class applied to the calendar root. */
    className?: string
    /** Accessible name for the calendar container. */
    'aria-label'?: string
    /** Localized labels for the navigation buttons. */
    captionLabels?: CalendarCaptionLabels
    /** BCP 47 locale for Gregorian dates and month/weekday names; defaults to the runtime locale. */
    locale?: string
    /** Controlled displayed month. */
    month?: Date
    /** Initial displayed month; defaults to the selected date or current month, clamped to navigation bounds. */
    defaultMonth?: Date
    /** Called when navigation requests another month. */
    onMonthChange?: (month: Date) => void
    /** Earliest navigable month, overriding `startYear`. */
    startMonth?: Date
    /** Latest navigable month, overriding `endYear`. */
    endMonth?: Date
    /** Earliest navigable year; defaults to 100 years before the current year. */
    startYear?: number
    /** Latest navigable year; defaults to 10 years after the current year. */
    endYear?: number
    /** First weekday, from Sunday (0) to Saturday (6); defaults to Monday. */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    /** Whether days from adjacent months are visible; defaults to true. */
    showOutsideDays?: boolean
    /** Rules preventing individual day selection; range interiors may include disabled days. */
    disabled?: CalendarMatcher | readonly CalendarMatcher[]
}>

/**
 * The selection and its callback are determined by `mode`. Pass `selected`
 * (including `undefined`) for a controlled selection, or `defaultSelected`
 * for an uncontrolled selection. Selecting an already-selected single or
 * multiple date clears it; after a range is completed the next selection
 * starts a new range.
 */
export type CalendarProps = CalendarCommonProps & (
    | Readonly<{ mode: 'single'; selected?: Date; defaultSelected?: Date; onSelect?: (value: Date | undefined) => void }>
    | Readonly<{ mode: 'multiple'; selected?: Date[]; defaultSelected?: Date[]; onSelect?: (value: Date[] | undefined) => void }>
    | Readonly<{ mode: 'range'; selected?: CalendarRange; defaultSelected?: CalendarRange; onSelect?: (value: CalendarRange | undefined) => void }>
)
