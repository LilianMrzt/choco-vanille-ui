export type CalendarCaptionLabels = {
    /** Accessible label for the previous-month button in day view. @default 'Previous month' */
    previousMonth?: string
    /** Accessible label for the next-month button in day view. @default 'Next month' */
    nextMonth?: string
    /** Accessible label for the previous-year button in month view. @default 'Previous year' */
    previousYear?: string
    /** Accessible label for the next-year button in month view. @default 'Next year' */
    nextYear?: string
    /** Accessible label for the previous-page button in year view. @default 'Previous years' */
    previousYears?: string
    /** Accessible label for the next-page button in year view. @default 'Next years' */
    nextYears?: string
}

export type CalendarCaptionProps = {
    /** Localized labels for the caption navigation buttons. */
    labels?: CalendarCaptionLabels
}
