// @vitest-environment node

import { copyFile, mkdtemp, readFile, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

import { build } from 'vite'
import { describe, expect, it } from 'vitest'

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
