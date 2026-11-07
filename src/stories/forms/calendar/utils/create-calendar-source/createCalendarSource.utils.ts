import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { CalendarArgs, CalendarSelection } from '@stories/forms/calendar/types'
import template from '@stories/forms/calendar/utils/create-calendar-source/sources/CalendarPlayground.source.txt?raw'
import attributeTemplate from '@stories/forms/calendar/utils/create-calendar-source/sources/Attribute.source.txt?raw'
import dateTemplate from '@stories/forms/calendar/utils/create-calendar-source/sources/Date.source.txt?raw'

/**
 * Serializes the current selected dates as Date constructor expressions.
 * @internal Not part of the public package API.
 * @param selection - Selected dates or range.
 * @returns A consumer expression preserving Date values.
 * @example
 * serializeSelection(new Date('2026-01-01'))
 */
const serializeSelection = (selection: CalendarSelection): string => {
    if (selection instanceof Date) {
        return renderSource(dateTemplate, { value: JSON.stringify(selection.toISOString()) }).trim()
    }
    if (Array.isArray(selection)) {
        return '[' + selection.map(serializeSelection).join(', ') + ']'
    }
    if (selection) {
        return '{ from: ' + serializeSelection(selection.from) + ', to: ' + serializeSelection(selection.to) + ' }'
    }
    return 'undefined'
}

/**
 * Shows a controlled calendar matching the current selection mode.
 * @internal Not part of the public package API.
 * @param _source - Storybook's generated source.
 * @param context - Storybook source context.
 * @param context.args - Current calendar controls.
 * @returns Consumer JSX without demonstration props.
 * @example
 * createCalendarSource('', { args: { mode: 'single' } })
 */
export const createCalendarSource = (_source: string, { args }: Readonly<{ args: CalendarArgs }>): string => {
    const mode = args.mode ?? 'single'
    const selection = args.selected
    const isCompatible = mode === 'single' ? selection instanceof Date
        : mode === 'multiple' ? Array.isArray(selection)
            : selection !== undefined && !(selection instanceof Date) && !Array.isArray(selection)
    const props = Object.entries(args).filter(([name, value]) =>
        !['mode', 'selected'].includes(name) && value !== undefined && typeof value !== 'function',
    ).map(([name, value]) => {
        const expression = value instanceof Date ? serializeSelection(value) : JSON.stringify(value)
        return ' ' + renderSource(attributeTemplate, { name, value: expression })
    }).join('')

    return renderSource(template, { mode, selected: serializeSelection(isCompatible ? selection : undefined), props })
}
