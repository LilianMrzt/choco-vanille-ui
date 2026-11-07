import { Calendar } from '@/components/forms/calendar'
import type { CalendarArgs } from '@stories/forms/calendar/types'
import type { ReactElement } from 'react'

/**
 * Renders the Calendar interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @param args - Public controls and the selection handler supplied by the story renderer.
 * @returns The pure calendar example.
 * @example
 * <CalendarPlayground />
 */
const CalendarPlayground = (args: CalendarArgs): ReactElement => {
    const { mode = 'single', selected, onSelect, ...props } = args
    const instanceKey = mode + ':' + (props.defaultMonth?.getTime() ?? '')
    if (mode === 'range') {
        return (
            <Calendar
                key={instanceKey}
                {...props}
                mode={'range'}
                selected={selected && !(selected instanceof Date) && !Array.isArray(selected) ? selected : undefined}
                onSelect={onSelect}
            />
        )
    }
    if (mode === 'multiple') {
        return (
            <Calendar
                key={instanceKey}
                {...props}
                mode={'multiple'}
                selected={Array.isArray(selected) ? selected : undefined}
                onSelect={onSelect}
            />
        )
    }
    return (
        <Calendar
            key={instanceKey}
            {...props}
            mode={'single'}
            selected={selected instanceof Date ? selected : undefined}
            onSelect={onSelect}
        />
    )
}

export default CalendarPlayground
