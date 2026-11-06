import { describe, expect, it } from 'vitest'
import ts from 'typescript'

import BoldIcon from '@resources/asset/BoldIcon.svg?react'
import { createToggleGroupSource, createToggleSource } from '@stories/actions/toggle/utils/create-toggle-source/createToggleSource.utils'

describe('Toggle story consumer sources', () => {
    it('reflects controlled standalone and icon-only controls without leaking group args', () => {
        const source = createToggleSource('', {
            args: {
                icon: BoldIcon,
                'aria-label': 'Bold',
                pressed: true,
                variant: 'ghostSubtle',
                groupValue: ['italic'],
            },
        })
        expect(source).toContain('useState(true)')
        expect(source).toContain('icon={BoldIcon}')
        expect(source).toContain('aria-label={"Bold"}')
        expect(source).toContain('variant={"ghostSubtle"}')
        expect(source).not.toContain('groupValue')
    })

    it.each(['ghost', 'ghostSubtle', 'outlined', 'outlinedSubtle'] as const)('preserves the %s treatment', (variant) => {
        const source = createToggleSource('', {
            args: { label: 'Bold', variant },
        })
        expect(source).toContain(`variant={"${variant}"}`)
    })

    it('reflects controlled group settings and all rendered items', () => {
        const source = createToggleGroupSource('', {
            args: {
                label: 'Ignored standalone label',
                groupValue: ['bold', 'italic'],
                groupMultiple: true,
                groupOrientation: 'vertical',
                groupDisabled: true,
            },
        })
        expect(source).toContain('useState<string[]>(["bold","italic"])')
        expect(source).toContain("import { ToggleGroup } from '@choco-vanille/ui'")
        expect(source).toContain('aria-label="Text formatting" multiple disabled orientation="vertical"')
        expect(source).toContain('value="bold" label="Bold"')
        expect(source).toContain('value="italic" label="Italic"')
        expect(source).toContain('value="underline" label="Underline"')
        expect(source).not.toContain('Ignored standalone label')
        expect(ts.transpileModule(source, {
            fileName: 'example.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
            reportDiagnostics: true,
        }).diagnostics).toEqual([])
    })

    it('uses an empty group value without optional group attributes', () => {
        const source = createToggleGroupSource('', { args: { label: 'Bold' } })

        expect(source).toContain('useState<string[]>([])')
        expect(source).toContain('<ToggleGroup aria-label="Text formatting" value={value} onValueChange={setValue}>')
        expect(source).not.toContain('{{')
        expect(ts.transpileModule(source, {
            fileName: 'example.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
            reportDiagnostics: true,
        }).diagnostics).toEqual([])
    })
})
