import type { DayPickerProps } from 'react-day-picker'

import type { CalendarCaptionLabels } from '@components/forms/calendar/components/calendar-caption/types/CalendarCaption.props.ts'

export type CalendarProps = DayPickerProps & {
    /** Additional CSS class applied to the root element. */
    className?: string
    /**
     * Convenience shorthand for `startMonth`.
     * Sets the earliest year selectable in the dropdowns.
     * Defaults to 100 years before the current year.
     */
    startYear?: number
    /**
     * Convenience shorthand for `endMonth`.
     * Sets the latest year selectable in the dropdowns.
     * Defaults to 10 years after the current year.
     */
    endYear?: number
    /** Localized labels for the caption navigation buttons. */
    captionLabels?: CalendarCaptionLabels
}
