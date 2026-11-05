import { render, screen } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import ts from 'typescript'

import meta, { Colors, Compound, Shapes, Sizes, Statuses, Variants } from '@stories/data-display/avatar/Avatar.stories'
import AvatarSizes from '@stories/data-display/avatar/components/avatar-sizes/AvatarSizes'
import CompoundPlayground from '@stories/data-display/avatar/components/compound-playground/CompoundPlayground'

describe('Avatar stories', () => {
    it('preserves accessible naming and native props in the extracted playground', () => {
        render(createElement(meta.render, {
            ...meta.args,
            'aria-label': 'Alex Brown',
            initials: 'AB',
            title: 'Profile',
            compoundLabel: 'Not a native prop',
        }))
        const avatar = screen.getByLabelText('Alex Brown')
        expect(avatar.getAttribute('title')).toBe('Profile')
        expect(avatar.hasAttribute('compoundLabel')).toBe(false)
        expect(screen.getByText('AB')).toBeTruthy()
    })

    it('keeps the size comparison wired to its private renderer', () => {
        expect(Sizes.render).toBe(AvatarSizes)
        render(createElement(AvatarSizes))
        for (const size of ['sm', 'md', 'lg', 'xl']) {
            expect(screen.getByLabelText('Jane Doe, ' + size)).toBeTruthy()
        }
    })

    it.each([Sizes, Shapes, Colors, Variants, Statuses])('emits valid TSX for comparative examples', (story) => {
        const source = story.parameters?.docs.source.code
        expect(typeof source).toBe('string')
        const result = ts.transpileModule(source, {
            fileName: 'Avatar.consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
            reportDiagnostics: true,
        })
        expect(result.diagnostics?.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')))
            .toEqual([])
    })

    it('forwards compound controls to their slots and emits valid consumer source', () => {
        const args = {
            ...meta.args,
            ...Compound.args,
            compoundLabel: 'Alex Brown',
            compoundFallback: 'AB',
            compoundStatus: 'online' as const,
            statusLabel: 'Available',
            statusSize: 'sm' as const,
        }
        render(createElement(CompoundPlayground, args))
        expect(screen.getByLabelText('Alex Brown')).toBeTruthy()
        expect(screen.getByText('AB')).toBeTruthy()
        expect(screen.getByLabelText('Available')).toBeTruthy()

        const source = meta.parameters.docs.source.transform('', { args })
        expect(source).not.toContain('compoundLabel')
        expect(source).not.toContain('compoundStatus')
        const compoundSource = Compound.parameters?.docs.source.transform('', { args })
        expect(compoundSource).toContain('<Avatar.Root')
        expect(compoundSource).toContain('<Avatar.Fallback initials={"AB"}')
        expect(compoundSource).toContain('label={"Available"}')
        const result = ts.transpileModule(compoundSource, {
            fileName: 'AvatarCompound.consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
            reportDiagnostics: true,
        })
        expect(result.diagnostics?.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')))
            .toEqual([])
    })
})
