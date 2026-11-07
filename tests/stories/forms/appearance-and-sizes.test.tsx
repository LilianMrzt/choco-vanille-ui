import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ts from 'typescript'

import { Sizes as SelectSizes } from '@stories/forms/select/Select.stories'
import { Sizes as AutocompleteSizes } from '@stories/forms/autocomplete/Autocomplete.stories'
import { Sizes as TextFieldSizes } from '@stories/forms/text-field/TextField.stories'
import { Sizes as TextAreaSizes } from '@stories/forms/text-area/TextArea.stories'
import { Sizes as NumberFieldSizes } from '@stories/forms/number-field/NumberField.stories'
import { Sizes as DatePickerSizes } from '@stories/forms/date-picker/DatePicker.stories'
import { Sizes as TimePickerSizes } from '@stories/forms/time-picker/TimePicker.stories'
import { Sizes as SwitchSizes } from '@stories/forms/switch/Switch.stories'
import { Appearance as SliderAppearanceStory, Sizes as SliderSizes } from '@stories/forms/slider/Slider.stories'
import SliderAppearance from '@stories/forms/slider/components/slider-appearance/SliderAppearance'
import { COLORS } from '@stories/forms/slider/constants'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'

const sizeStories = [
    ['Select', SelectSizes],
    ['Autocomplete', AutocompleteSizes],
    ['TextField', TextFieldSizes],
    ['TextArea', TextAreaSizes],
    ['NumberField', NumberFieldSizes],
    ['DatePicker', DatePickerSizes],
    ['TimePicker', TimePickerSizes],
    ['Switch', SwitchSizes],
    ['Slider', SliderSizes],
] as const

const getAttributeExpressions = (source: string, name: string): string[] => {
    const file = ts.createSourceFile('example.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const values: string[] = []
    const visit = (node: ts.Node): void => {
        if (ts.isJsxAttribute(node) && node.name.getText(file) === name && node.initializer) {
            if (ts.isStringLiteral(node.initializer)) {
                values.push(node.initializer.text)
            } else if (ts.isJsxExpression(node.initializer)) {
                const expression = node.initializer.expression
                if (expression && ts.isStringLiteral(expression)) {
                    values.push(expression.text)
                }
            }
        }
        ts.forEachChild(node, visit)
    }
    visit(file)
    return values
}

describe('Form appearance and size stories', () => {
    it.each(sizeStories)('%s exposes all sizes in its dedicated story and expanded source', (name, story) => {
        const source = story.parameters?.docs.source.code
        expect(typeof story.render).toBe('function')
        expect(getAttributeExpressions(source, 'size')).toEqual(['sm', 'md', 'lg'])
        expect(source).toContain("from '@choco-vanille/ui'")
        if (name !== 'Switch') {
            expect(getAttributeExpressions(source, 'width')).toEqual(['100%', '100%', '100%'])
        }
        const result = ts.transpileModule(source, {
            fileName: 'example.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
            reportDiagnostics: true,
        })
        expect(result.diagnostics).toEqual([])
    })

    it('keeps all slider colors and orientations in Appearance without sizes', () => {
        render(<SliderAppearance />)
        expect(screen.queryByRole('region', { name: 'Sizes' })).toBeNull()
        expect(screen.getByRole('region', { name: 'Colors' })).toBeTruthy()
        expect(screen.getByRole('region', { name: 'Orientations' })).toBeTruthy()
        const source = SliderAppearanceStory.parameters?.docs.source.code
        expect(getAttributeExpressions(source, 'size')).toEqual([])
        expect(getAttributeExpressions(source, 'color')).toEqual(COLORS)
        expect(getAttributeExpressions(source, 'orientation')).toEqual(['horizontal', 'vertical'])
    })

    it('bounds the outer frame and contains horizontal overflow without viewport-wide fields', () => {
        const { container } = render(FormStoryFrame(() => <input aria-label={'Bounded example'} style={{ width: '100%' }} />))
        const frame = container.firstElementChild
        if (!(frame instanceof HTMLElement)) {
            throw new Error('The form example frame was not rendered.')
        }
        const expectedFrame = document.createElement('div')
        expectedFrame.style.width = 'min(24rem, calc(100vw - 2rem))'
        expect(frame.style.width).toBe(expectedFrame.style.width)
        expect(frame.style.maxWidth).toBe('100%')
        expect(frame.style.minWidth).toBe('0px')
        expect(frame.style.overflowX).toBe('auto')
        expect(screen.getByRole('textbox', { name: 'Bounded example' }).style.width).toBe('100%')
    })
})
