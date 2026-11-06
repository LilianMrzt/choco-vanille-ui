// @vitest-environment node

import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises'
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
            await copyFile(
                resolve('tests', 'distribution', 'fixtures', 'color-consumer.tsx.txt'),
                consumerTypesPath,
            )
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
            expect(declarations).toContain('export declare const Legend:')
            expect(declarations).toContain('export declare const LEGEND_STYLES:')
            expect(declarations).toContain('export declare type LegendProps')
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

            for (const extension of ['js', 'cjs']) {
                const entry = await readFile(resolve(outputDirectory, `index.${extension}`), 'utf8')
                expect(entry).toContain(`components/forms/legend/Legend.${extension}`)
                const legendStylesPath = resolve(outputDirectory, `components/forms/legend/Legend.css.${extension}`)
                const legendStyles = await readFile(legendStylesPath, 'utf8')
                const legendClass = legendStyles.match(/root:\s*["'`]([^"'`]+)["'`]/)?.[1]
                expect(legendClass).toBeTruthy()
                const legendCssImports = [...legendStyles.matchAll(/(?:import\s*|require\()\s*['"]([^'"]+\.css)['"]/g)]
                const legendStylesheets = await Promise.all(
                    legendCssImports.map((match) => readFile(resolve(dirname(legendStylesPath), match[1]), 'utf8')),
                )
                expect(legendStylesheets.some((css) => css.includes(`.${legendClass}`))).toBe(true)

                const statusStylesPath = resolve(outputDirectory, `components/data-display/status-badge/StatusBadge.css.${extension}`)
                const statusStyles = await readFile(statusStylesPath, 'utf8')
                const cssImports = [...statusStyles.matchAll(/(?:import\s*|require\()\s*['"]([^'"]+\.css)['"]/g)]
                const stylesheets = await Promise.all(
                    cssImports.map((match) => readFile(resolve(dirname(statusStylesPath), match[1]), 'utf8')),
                )
                const css = stylesheets.join('\n')
                const numberedSizes = [...statusStyles.matchAll(/size:\s*["'`](sm|md|lg)["'`],\s*hasNumber:\s*(?:!0|true)\s*},\s*["'`]([^"'`]+)["'`]/g)]
                const minimumWidths: Record<string, number> = { sm: 16, md: 20, lg: 24 }

                expect(numberedSizes).toHaveLength(3)
                for (const [, size, className] of numberedSizes) {
                    const numberRule = css.match(new RegExp(`\\.${className}\\s*\\{([^}]+)\\}`))?.[1]
                    expect(numberRule).toBeDefined()
                    expect(numberRule).toMatch(new RegExp(`min-width:\\s*var\\(--space-${minimumWidths[size]}\\)`))
                    expect(numberRule).toMatch(/(?:^|;)\s*width:\s*auto(?:;|$)/)
                }
            }

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
                resolve(outputDirectory, 'components/actions/button/Button.css.js'),
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
