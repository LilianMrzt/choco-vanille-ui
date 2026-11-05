import { render, screen } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import ts from 'typescript'

import meta, { Spacing } from '@stories/data-display/avatar-group/AvatarGroup.stories'
import AvatarGroupSpacing from '@stories/data-display/avatar-group/components/avatar-group-spacing/AvatarGroupSpacing'

describe('AvatarGroup stories', () => {
    it('preserves group controls, identifying children and overflow naming', () => {
        render(createElement(meta.render, { ...meta.args, max: 3 }))
        expect(screen.getByRole('group', { name: 'Project participants' })).toBeTruthy()
        expect(screen.getByLabelText('Alex Brown')).toBeTruthy()
        expect(screen.getByLabelText('Emery Fox')).toBeTruthy()
        expect(screen.queryByLabelText('Gale Hill')).toBeNull()
        expect(screen.getByRole('img', { name: '2 more' })).toBeTruthy()
    })

    it('keeps the spacing comparison wired to its private renderer', () => {
        expect(Spacing.render).toBe(AvatarGroupSpacing)
        render(createElement(AvatarGroupSpacing))
        for (const spacing of ['none', 'sm', 'md', 'lg', 'xl']) {
            expect(screen.getByRole('group', { name: 'Participants, ' + spacing })).toBeTruthy()
        }
        const result = ts.transpileModule(Spacing.parameters?.docs.source.code, {
            fileName: 'AvatarGroupSpacing.consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
            reportDiagnostics: true,
        })
        expect(result.diagnostics?.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')))
            .toEqual([])
    })

    it('serializes current controls without interpreting inserted template tokens', () => {
        const source = meta.parameters.docs.source.transform('', {
            args: { ...meta.args, max: 0, 'aria-label': '{{children}} $&' },
        })
        expect(source).toContain('max={0}')
        expect(source).toContain('aria-label={"{{children}} $&"}')
        expect(source.match(/<Avatar aria-label=/g)).toHaveLength(5)
        const result = ts.transpileModule(source, {
            fileName: 'AvatarGroup.consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
            reportDiagnostics: true,
        })
        expect(result.diagnostics?.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')))
            .toEqual([])
    })
})
