import ts from 'typescript'
import { describe, expect, it } from 'vitest'

import { createCompoundSource } from '@stories/forms/checkbox/utils/create-compound-source/createCompoundSource.utils'

describe('createCompoundSource', () => {
    it('reflects the current root and indicator controls in consumer code', () => {
        const source = createCompoundSource('', {
            args: {
                checked: true,
                disabled: true,
                compoundLabel: 'Terms "{{label}}"',
                indicatorText: 'X "{{indicator}}"',
                indicatorKeepMounted: true,
                groupLabel: 'Notifications',
                groupHelperText: 'Select options.',
                groupDisabled: false,
                groupValue: [],
                groupOnValueChange: undefined,
                groupHeaderLabel: 'All',
                groupLabelOne: 'Email',
                groupLabelTwo: 'SMS',
                groupLabelThree: 'Push',
            },
        })

        expect(source).toContain('useState(true)')
        expect(source).toContain('aria-label={"Terms \\"{{label}}\\""}')
        expect(source).toContain('disabled={true}')
        expect(source).toContain('keepMounted={true}')
        expect(source).toContain('{"X \\"{{indicator}}\\""}')
        const result = ts.transpileModule(source, {
            fileName: 'consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
            reportDiagnostics: true,
        })
        expect(result.diagnostics).toEqual([])
    })
})
