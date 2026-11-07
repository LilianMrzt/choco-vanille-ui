import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

import { createCalendarSource } from '@stories/forms/calendar/utils/create-calendar-source/createCalendarSource.utils'
import { createImagePickerSource } from '@stories/forms/image-picker/utils/create-image-picker-source/createImagePickerSource.utils'
import { createCheckboxPlaygroundSource } from '@stories/forms/checkbox/utils/createCheckboxPlaygroundSource.utils'
import { DEFAULT_ARGS as CHECKBOX_ARGS } from '@stories/forms/checkbox/constants'
import { DEFAULT_ARGS as CALENDAR_ARGS } from '@stories/forms/calendar/constants'

const listFiles = (directory: string): string[] =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name)
        return entry.isDirectory() ? listFiles(path) : [path]
    })

const expectValidTsx = (source: string): void => {
    const result = ts.transpileModule(source, {
        fileName: 'consumer.tsx',
        compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
        reportDiagnostics: true,
    })
    expect(result.diagnostics?.map((item) => ts.flattenDiagnosticMessageText(item.messageText, '\n'))).toEqual([])
    expect(source).not.toMatch(/\{\{\w+}}/)
}

describe('Form consumer sources', () => {
    const modules = listFiles(join(process.cwd(), 'src', 'stories', 'forms'))
        .filter((file) => file.endsWith('.source.txt'))
        .map((file) => [file, readFileSync(file, 'utf8')] as const)
        .filter(([, source]) => source.startsWith('import ') && !source.includes('{{'))

    it.each(modules)('keeps %s valid as a standalone TSX module', (_path, source) => {
        expectValidTsx(source)
    })

    it('shows only the standalone checkbox in the playground source', () => {
        const source = createCheckboxPlaygroundSource('', { args: CHECKBOX_ARGS })
        expectValidTsx(source)
        expect(source).toContain('<Checkbox ')
        expect(source).not.toContain('CheckboxGroup')
        expect(source).not.toContain('Checkbox.Root')
    })

    it('keeps calendar Date values and selection modes in consumer source', () => {
        const source = createCalendarSource('', {
            args: { ...CALENDAR_ARGS, mode: 'range', selected: { from: new Date('2026-11-01T12:00:00Z'), to: new Date('2026-11-03T12:00:00Z') } },
        })
        expectValidTsx(source)
        expect(source).toContain('mode="range"')
        expect(source).toContain('new Date("2026-11-01T12:00:00.000Z")')
        expect(source).not.toContain('selection=')
    })

    it('shows the selected image File rather than serializing it as an empty object', () => {
        const source = createImagePickerSource('', {
            args: { label: 'Avatar', value: new File(['image'], 'avatar.png', { type: 'image/png' }) },
        })
        expectValidTsx(source)
        expect(source).toContain('new File(')
        expect(source).toContain('"avatar.png"')
        expect(source).toContain('"image/png"')
        expect(source).toContain('useState<File | string | null>(selectedFile)')
    })
})
