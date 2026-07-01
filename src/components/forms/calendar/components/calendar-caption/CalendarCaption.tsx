import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { IconButton } from '@components/actions/icon-button'
import { Typography } from '@components/foundation/typography'
import { CALENDAR_CAPTION_STYLES } from '@components/forms/calendar/components/calendar-caption/CalendarCaption.css.ts'
import { useCalendarCaption } from '@components/forms/calendar/components/calendar-caption/hooks/useCalendarCaption.hook.ts'
import Flex from '@components/layout/flex/Flex.tsx'

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
const CalendarCaption = (): ReactElement => {
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

    return (
        <Flex
            align={'center'}
            justify={'between'}
            gap={'xs'}
            className={CALENDAR_CAPTION_STYLES.monthCaption}
        >
            <IconButton
                icon={'mdi:chevron-left'}
                aria-label={'Previous'}
                variant={'ghost'}
                color={'secondary'}
                size={'sm'}
                disabled={isPrevDisabled}
                onClick={handlePrev}
            />

            <Flex
                align={'center'}
                justify={'center'}
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
                        {decadeStart}
                        {' '}
                        -{decadeEnd}
                    </Typography>
                )}
            </Flex>

            <IconButton
                icon={'mdi:chevron-right'}
                aria-label={'Next'}
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
