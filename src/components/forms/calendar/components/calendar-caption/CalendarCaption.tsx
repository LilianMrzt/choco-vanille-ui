import type { FC, ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { IconButton } from '@components/actions/icon-button'
import { Typography } from '@components/foundation/typography'
import { CALENDAR_CAPTION_STYLES } from '@components/forms/calendar/components/calendar-caption/styles/CalendarCaption.css.ts'
import { useCalendarCaption } from '@components/forms/calendar/components/calendar-caption/hooks/useCalendarCaption.hook.ts'
import type { CalendarCaptionProps } from '@components/forms/calendar/components/calendar-caption/types/CalendarCaption.props.ts'
import Flex from '@components/layout/flex/Flex.tsx'
import { IconRegistry } from '@constants/icons'
import { DEFAULT_CALENDAR_CAPTION_LABELS } from '@components/forms/calendar/components/calendar-caption/constants'

/**
  * Calendar header row: [← IconButton] [caption center] [→ IconButton]
  *
  * - **Day view**  — `[← ] [January] [2025] [→]`  (month & year are clickable chips)
  * - **Month view** — `[← ] [2025 ▸] [→]`  (year chip opens year picker)
  * - **Year view** — `[← ] [2024 — 2035] [→]`  (plain decade range label)
  *
  * Arrow semantics:
  * - Day view: navigate by month
  * - Month view: navigate by year
  * - Year view: navigate by page (12 years)
  */
const CalendarCaption: FC<CalendarCaptionProps> = ({
    labels = {},
}): ReactElement => {
    const {
        view,
        setView,
        year,
        decadeStart,
        decadeEnd,
        label,
        handlePrev,
        handleNext,
        isPrevDisabled,
        isNextDisabled,
    } = useCalendarCaption()

    const mergedLabels = { ...DEFAULT_CALENDAR_CAPTION_LABELS, ...labels }

    const prevLabel =
        view === 'day'
            ? mergedLabels.previousMonth
            : view === 'month'
                ? mergedLabels.previousYear
                : mergedLabels.previousYears

    const nextLabel =
        view === 'day'
            ? mergedLabels.nextMonth
            : view === 'month'
                ? mergedLabels.nextYear
                : mergedLabels.nextYears

    return (
        <Flex
            alignItems={'center'}
            justifyContent={'between'}
            gap={'xs'}
            className={CALENDAR_CAPTION_STYLES.monthCaption}
        >
            <IconButton
                icon={IconRegistry.chevronLeft}
                aria-label={prevLabel}
                variant={'ghost'}
                color={'secondary'}
                size={'sm'}
                disabled={isPrevDisabled}
                onClick={handlePrev}
            />

            <Flex
                alignItems={'center'}
                justifyContent={'center'}
                gap={'xxs'}
                className={CALENDAR_CAPTION_STYLES.captionCenter}
            >
                {view === 'day' && (
                    <Button
                        variant={'ghost'}
                        color={'secondary'}
                        size={'sm'}
                        label={label}
                        onClick={() => setView('year')}
                    />
                )}

                {view === 'month' && (
                    <Typography
                        variant={'span'}
                        fontSize={'sm'}
                        fontWeight={'semibold'}
                        className={CALENDAR_CAPTION_STYLES.captionLabel}
                    >
                        {year}
                    </Typography>
                )}

                {view === 'year' && (
                    <Typography
                        variant={'span'}
                        fontSize={'sm'}
                        fontWeight={'semibold'}
                        className={CALENDAR_CAPTION_STYLES.captionLabel}
                    >
                        {`${decadeStart} -${decadeEnd}`}
                    </Typography>
                )}
            </Flex>

            <IconButton
                icon={IconRegistry.chevronRight}
                aria-label={nextLabel}
                variant={'ghost'}
                color={'secondary'}
                size={'sm'}
                disabled={isNextDisabled}
                onClick={handleNext}
            />
        </Flex>
    )
}

CalendarCaption.displayName = 'CalendarCaption'

export default CalendarCaption
