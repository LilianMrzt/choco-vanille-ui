// @vitest-environment node

import { copyFile, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

import { build } from 'vite'
import { describe, expect, it } from 'vitest'
import ts from 'typescript'

describe('package distribution', () => {
    it('associates each module with its CSS and preserves selective imports', async () => {
        const outputDirectory = await mkdtemp(resolve('node_modules', '.distribution-test-'))

        try {
            await build({
                configFile: resolve('vite.config.ts'),
                logLevel: 'silent',
                build: { outDir: outputDirectory },
            })
            await copyFile(resolve('package.json'), resolve(outputDirectory, 'package.json'))
            // Declarations use the plugin's configured output, independently of Vite's test outDir.
            await copyFile(resolve('dist/index.d.ts'), resolve(outputDirectory, 'index.d.ts'))

            const consumerTypesPath = resolve(outputDirectory, 'color-consumer.tsx')
            await writeFile(consumerTypesPath, `
import { Box, Icon, Typography, ThemeProvider, lightTheme, darkTheme, vars,
    type ThemeColor, type ThemeColorAccent, type ThemeColors, type ThemeColorOverrides
} from './index.js'
const accent: ThemeColorAccent = lightTheme.color.primary
const colors: ThemeColors = darkTheme.color
const path: ThemeColor = 'primary.subtleForeground'
const overrides: ThemeColorOverrides = { primary: { main: 'var(--brand)' }, surface: { elevated: '#fff' } }
const icon = () => <svg />
const example = <ThemeProvider tokens={overrides}>
    <Box backgroundColor={vars.color.surface.main} borderColor="var(--app-border)" padding={80} gap={112} margin={0} borderRadius={8} boxShadow="xs">
        <Typography color={vars.color.primary.main} fontSize={72} margin="auto">Brand</Typography>
        <Icon icon={icon} color="var(--app-icon)" padding={0} borderRadius="full" />
    </Box>
</ThemeProvider>
// @ts-expect-error A branch is not a token leaf.
const branch: ThemeColor = 'primary'
// @ts-expect-error Legacy names no longer exist.
const legacy: ThemeColor = 'primaryHover'
// @ts-expect-error Groups cannot contain another object.
const nested: ThemeColorOverrides = { primary: { subtle: { main: 'red' } } }
// @ts-expect-error A complete theme requires every leaf.
const incomplete: ThemeColors = { primary: { main: 'red' } }
// @ts-expect-error A color object is not a CSS color.
const objectColor = <Typography color={vars.color.primary} />
// @ts-expect-error Subtle is a direct leaf.
const deep = vars.color.primary.subtle.main
const numericTokens = [vars.space[16], vars.space[80], vars.space[112], vars.fontSize[14], vars.radius[8], vars.radius.full, vars.shadow.xs, vars.dropShadow.xs]
// @ts-expect-error Spacing props require numbers, not quoted numeric keys.
const quotedSpacing = <Box padding="16" />
// @ts-expect-error Font-size props require numbers.
const quotedFontSize = <Typography fontSize="14" />
// @ts-expect-error Radius props require numbers or full.
const quotedRadius = <Box borderRadius="8" />
// @ts-expect-error Only the finite spacing scale is supported.
const arbitrarySpacing = <Box padding={17} />
// @ts-expect-error Only the finite font-size scale is supported.
const arbitraryFontSize = <Typography fontSize={15} />
void [accent, colors, path, example, numericTokens]
`)
            const program = ts.createProgram([consumerTypesPath], {
                noEmit: true,
                strict: true,
                skipLibCheck: true,
                target: ts.ScriptTarget.ES2022,
                module: ts.ModuleKind.ESNext,
                moduleResolution: ts.ModuleResolutionKind.Bundler,
                jsx: ts.JsxEmit.ReactJSX,
            })
            const diagnostics = ts.getPreEmitDiagnostics(program)
            expect(diagnostics.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')))
                .toEqual([])

            const declarations = await readFile(resolve(outputDirectory, 'index.d.ts'), 'utf8')
            expect(declarations).not.toMatch(/from ['"]@(?:theme|components|utils|hooks)\b/)
            const themeCss = await readFile(resolve(outputDirectory, 'styles.css'), 'utf8')
            expect(themeCss).toContain('--color-primary-main')
            expect(themeCss).toContain('--color-primary-subtlePressed')
            expect(themeCss).toContain('--color-text-primary')
            expect(themeCss).toContain('--space-128')
            expect(themeCss).toContain('--space-80')
            expect(themeCss).toContain('--space-112')
            expect(themeCss).toContain('--shadow-xs')
            expect(themeCss).toContain('--dropShadow-xs')
            expect(themeCss).toMatch(/padding\s*:\s*var\(--space-80\)/)
            expect(themeCss).toMatch(/gap\s*:\s*var\(--space-112\)/)
            expect(themeCss).toContain('--fontSize-72')
            expect(themeCss).toContain('--radius-8')
            expect(themeCss).not.toMatch(/--(?:space|fontSize|radius)-(?:none|xs|sm|md|lg|xl)\b/)
            expect(themeCss).not.toMatch(/--color-(?:primary|primaryHover|primaryActive|foreground|surface|borderStrong)\s*[:)]/)
            expect(themeCss).not.toContain('[object Object]')

            const selectStylesPath = resolve(
                outputDirectory,
                'components/forms/select/components/select-item/styles/SelectItem.css.js',
            )
            const selectStyles = await readFile(selectStylesPath, 'utf8')
            const selectClass = selectStyles.match(/root:\s*["']([^"']+)["']/)?.[1]
            expect(selectClass).toBeTruthy()

            for (const extension of ['js', 'cjs']) {
                const modulePath = selectStylesPath.replace(/\.js$/, `.${extension}`)
                const moduleContents = await readFile(modulePath, 'utf8')
                const cssImports = [...moduleContents.matchAll(/(?:import\s*|require\()\s*['"]([^'"]+\.css)['"]/g)]
                const stylesheets = await Promise.all(
                    cssImports.map((match) => readFile(resolve(dirname(modulePath), match[1]), 'utf8')),
                )
                expect(stylesheets.some((css) => css.includes(`.${selectClass}`))).toBe(true)
            }

            const buttonStyles = await readFile(
                resolve(outputDirectory, 'components/actions/button/styles/Button.css.js'),
                'utf8',
            )
            const buttonClass = buttonStyles.match(/defaultClassName:\s*["']([^"']+)["']/)?.[1]
            expect(buttonClass).toBeTruthy()

            const consumer = await build({
                configFile: false,
                logLevel: 'silent',
                resolve: { alias: { '@choco-vanille/ui': resolve(outputDirectory, 'index.js') } },
                plugins: [{
                    name: 'distribution-test-entry',
                    resolveId: (id) => id === 'virtual:consumer' ? id : undefined,
                    load: (id) => id === 'virtual:consumer'
                        ? "import { Button } from '@choco-vanille/ui'; console.log(Button)"
                        : undefined,
                }],
                build: {
                    write: false,
                    sourcemap: true,
                    rolldownOptions: { input: 'virtual:consumer' },
                },
            })

            if (!('output' in consumer)) {
                throw new Error('Expected a single consumer build output')
            }

            const chunk = consumer.output.find((output) => output.type === 'chunk')
            const css = consumer.output.find(
                (output) => output.type === 'asset' && output.fileName.endsWith('.css'),
            )
            if (!css || css.type !== 'asset') {
                throw new Error('Expected a consumer CSS asset')
            }

            const sources = chunk?.map?.sources ?? []
            expect(sources.some((source) => source.includes('/components/actions/button/'))).toBe(true)
            expect(sources.some((source) => source.includes('/components/forms/select/'))).toBe(false)
            expect(css.source.toString()).toContain(`.${buttonClass}`)
            expect(css.source.toString()).not.toContain(`.${selectClass}`)
        } finally {
            await rm(outputDirectory, { recursive: true, force: true })
        }
    }, 120_000)
})
