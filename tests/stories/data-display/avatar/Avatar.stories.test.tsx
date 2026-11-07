import { render, screen, within } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import ts from 'typescript'

import meta, { Appearance, Content, GroupSpacing, OnMutedSurface, Statuses } from '@stories/data-display/avatar/Avatar.stories'
import { createAvatarCompoundSource } from '@stories/data-display/avatar/utils/create-avatar-compound-source/createAvatarCompoundSource.utils'
import { createAvatarGroupExampleSource } from '@stories/data-display/avatar/utils/create-avatar-group-example-source.utils'
import AvatarSizes from '@stories/data-display/avatar/components/avatar-sizes/AvatarSizes'
import CompoundPlayground from '@stories/data-display/avatar/components/compound-playground/CompoundPlayground'
import AvatarGroupExample from '@stories/data-display/avatar/components/avatar-group-example/AvatarGroupExample'
import AvatarGroupSpacing from '@stories/data-display/avatar-group/components/avatar-group-spacing/AvatarGroupSpacing'
import AvatarAppearance from '@stories/data-display/avatar/components/avatar-appearance/AvatarAppearance'
import { COLORS, VARIANTS } from '@stories/data-display/avatar/constants'
import { AVATAR_STYLES } from '@components/data-display/avatar'

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
        expect(within(avatar).getByText('AB')).toBeTruthy()
        expect(screen.queryByRole('group')).toBeNull()
    })

    it('passes the selected variant through when the playground has an image', () => {
        render(createElement(meta.render, { ...meta.args, src: '/portrait.png', variant: 'contained' }))
        const avatar = screen.getByLabelText('Jane Doe')
        for (const className of AVATAR_STYLES.recipe({ size: 'md', shape: 'circle', color: 'primary', variant: 'contained' }).split(' ')) {
            expect(avatar.classList.contains(className)).toBe(true)
        }
    })

    it('uses the shadcn profile image in both image examples and their consumer source', () => {
        expect(Content.parameters?.docs.source.code).toContain('src="https://github.com/shadcn.png"')
        expect(Content.parameters?.docs.source.code).toContain('alt="shadcn"')
        const source = OnMutedSurface.parameters?.docs.source.code
        expect(source).toContain('https://github.com/shadcn.png')
        expect(source).toContain('alt="shadcn"')
    })

    it('keeps the size comparison wired to its private renderer', () => {
        render(createElement(AvatarSizes))
        for (const size of ['sm', 'md', 'lg', 'xl']) {
            expect(screen.getByLabelText('Jane Doe, ' + size)).toBeTruthy()
        }
    })

    it.each([Appearance, Statuses, OnMutedSurface])('emits valid TSX for comparative examples', (story) => {
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

    it('compares every variant in every color and keeps the source aligned', () => {
        render(createElement(AvatarAppearance))
        const source = Appearance.parameters?.docs.source.code
        for (const color of COLORS) {
            for (const variant of VARIANTS) {
                const avatar = screen.getByLabelText(`Jane Doe, ${color}, ${variant}`)
                for (const className of AVATAR_STYLES.recipe({ size: 'md', shape: 'circle', color, variant }).split(' ')) {
                    expect(avatar.classList.contains(className)).toBe(true)
                }
                expect(source).toContain(`aria-label="Jane Doe, ${color}, ${variant}" color="${color}" initials="JD" variant="${variant}"`)
            }
        }
        expect(source).not.toContain('size=')
    })

    it('forwards compound controls to their slots and emits valid consumer source', () => {
        const args = {
            ...meta.args,
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
        const compoundSource = createAvatarCompoundSource('', { args })
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

    it('renders group controls and produces matching namespaced consumer source', () => {
        const args = { ...meta.args, groupMax: 3, groupLabel: '{{children}} $&' }
        render(createElement(AvatarGroupExample, args))
        expect(screen.getByRole('group', { name: '{{children}} $&' })).toBeTruthy()
        expect(screen.getByLabelText('Alex Brown')).toBeTruthy()
        expect(screen.queryByLabelText('Gale Hill')).toBeNull()
        expect(screen.getByRole('img', { name: '2 more' })).toBeTruthy()
        const source = createAvatarGroupExampleSource('', { args })
        expect(source).toContain('max={3}')
        expect(source).toContain('aria-label={"{{children}} $&"}')
        expect(source.match(/<AvatarGroup.Item aria-label=/g)).toHaveLength(5)
        const result = ts.transpileModule(source, {
            fileName: 'AvatarGroup.consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
            reportDiagnostics: true,
        })
        expect(result.diagnostics?.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))).toEqual([])
    })

    it('shows overflow alone and supports a localized overflow name', () => {
        const { rerender } = render(createElement(AvatarGroupExample, { ...meta.args, groupMax: 0 }))
        expect(screen.getByRole('img', { name: '5 more' }).textContent).toBe('+5')
        rerender(createElement(AvatarGroupExample, { ...meta.args, groupMax: 2, groupOverflowLabel: (count: number) => `${count} additional participants` }))
        expect(screen.getByRole('img', { name: '3 additional participants' })).toBeTruthy()
    })

    it('shows every group spacing preset', () => {
        expect(GroupSpacing.render).toBe(AvatarGroupSpacing)
        render(createElement(AvatarGroupSpacing))
        for (const spacing of ['none', 'sm', 'md', 'lg', 'xl']) {
            expect(screen.getByRole('group', { name: 'Participants, ' + spacing })).toBeTruthy()
        }
    })
})
