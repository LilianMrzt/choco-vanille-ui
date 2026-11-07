import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ts from 'typescript'
import { describe, expect, it, vi } from 'vitest'

import typographyMeta from '@stories/foundation/typography/Typography.stories'
import boxMeta from '@stories/layout/box/Box.stories'
import flexMeta from '@stories/layout/flex/Flex.stories'
import formMeta from '@stories/forms/primitives/form/Form.stories'
import gridMeta from '@stories/layout/grid/Grid.stories'
import imageMeta from '@stories/data-display/image/Image.stories'
import insetMeta from '@stories/layout/inset/Inset.stories'
import separatorMeta from '@stories/layout/separator/Separator.stories'
import svgImageMeta from '@stories/data-display/svg-image/SvgImage.stories'
import FormPlayground from '@stories/forms/primitives/form/components/form-playground/FormPlayground'
import typographyVariants from '@stories/foundation/typography/sources/TypographyVariants.source.txt?raw'
import typographySizes from '@stories/foundation/typography/sources/TypographyFontSizes.source.txt?raw'
import typographyWeights from '@stories/foundation/typography/sources/TypographyFontWeights.source.txt?raw'
import separatorColors from '@stories/layout/separator/sources/SeparatorColors.source.txt?raw'
import separatorLabels from '@stories/layout/separator/sources/SeparatorWithLabel.source.txt?raw'
import separatorOrientations from '@stories/layout/separator/sources/SeparatorOrientations.source.txt?raw'
import svgColors from '@stories/data-display/svg-image/sources/SvgImageColors.source.txt?raw'
import svgFits from '@stories/data-display/svg-image/sources/SvgImageObjectFits.source.txt?raw'

const expectValidTsx = (source: string): void => {
    const result = ts.transpileModule(source, {
        fileName: 'consumer.tsx',
        compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
        reportDiagnostics: true,
    })

    expect(result.diagnostics?.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))).toEqual([])
}

describe('Foundation and layout stories', () => {
    it('updates consumer JSX from current typography and layout controls', () => {
        const typography = typographyMeta.parameters.docs.source.transform('', {
            args: { ...typographyMeta.args, variant: 'h2', children: 'A "heading"' },
        })
        const box = boxMeta.parameters.docs.source.transform('', {
            args: { ...boxMeta.args, padding: 24, children: 'Content' },
        })
        const flex = flexMeta.parameters.docs.source.transform('', {
            args: { ...flexMeta.args, gap: 16 },
        })
        const grid = gridMeta.parameters.docs.source.transform('', {
            args: { ...gridMeta.args, columns: 2 },
        })

        expect(typography).toContain('variant={"h2"}')
        expect(typography).toContain('{"A \\"heading\\""}')
        expect(box).toContain('padding={24}')
        expect(flex).toContain('gap={16}')
        expect(flex).toContain('Item 3')
        expect(grid).toContain('columns={2}')
        expect(grid).toContain('Cell 9')
        for (const source of [typography, box, flex, grid]) {
            expectValidTsx(source)
        }
    })

    it('generates current image, inset and separator props without private story details', () => {
        const image = imageMeta.parameters.docs.source.transform('', {
            args: { ...imageMeta.args, alt: '', objectFit: 'contain' },
        })
        const inset = insetMeta.parameters.docs.source.transform('', {
            args: { ...insetMeta.args, side: 'bottom' },
        })
        const separator = separatorMeta.parameters.docs.source.transform('', {
            args: { orientation: 'vertical', label: 'Or' },
        })
        const svg = svgImageMeta.parameters.docs.source.transform('', {
            args: { ...svgImageMeta.args, color: 'danger.main' },
        })

        expect(image).toContain('alt={""}')
        expect(image).toContain('objectFit={"contain"}')
        expect(inset).toContain('side={"bottom"}')
        expect(separator).toContain('orientation={"vertical"}')
        expect(separator).toContain('<span>Left</span>')
        expect(svg).toContain('image={ImageIcon}')
        expect(svg).toContain('color={"danger.main"}')
        for (const source of [image, inset, separator, svg]) {
            expectValidTsx(source)
        }
    })

    it('forwards the form controls and submit event while preventing navigation', async () => {
        const user = userEvent.setup()
        const onSubmit = vi.fn(event => expect(event.defaultPrevented).toBe(true))
        render(<FormPlayground aria-label="Example form" name="example" onSubmit={onSubmit} />)

        expect(screen.getByRole('form', { name: 'Example form' }).getAttribute('name')).toBe('example')
        await user.type(screen.getByLabelText('Email'), 'hello@example.com')
        await user.type(screen.getByLabelText('Password'), 'secret')
        await user.click(screen.getByRole('button', { name: 'Sign in' }))
        expect(onSubmit).toHaveBeenCalledOnce()
        expect(screen.getByText('Form submitted!')).toBeTruthy()

        const source = formMeta.parameters.docs.source.transform('', {
            args: { ...formMeta.args, name: 'example' },
        })
        expect(source).toContain('name={"example"}')
        expect(source).toContain('event.preventDefault()')
        expectValidTsx(source)
    })

    it.each([
        typographyVariants, typographySizes, typographyWeights, separatorColors,
        separatorLabels, separatorOrientations, svgColors, svgFits,
    ])('provides valid public TSX for a comparison example', source => {
        expect(source).toContain("from '@choco-vanille/ui'")
        expectValidTsx(source)
    })
})
