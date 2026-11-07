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
            const notificationConsumerPath = resolve(outputDirectory, 'notification-consumer.tsx')
            await copyFile(
                resolve('tests', 'distribution', 'fixtures', 'notification-consumer.tsx.txt'),
                notificationConsumerPath,
            )
            const datePickerConsumerPath = resolve(outputDirectory, 'date-picker-consumer.tsx')
            await copyFile(
                resolve('tests', 'distribution', 'fixtures', 'date-picker-consumer.tsx.txt'),
                datePickerConsumerPath,
            )
            const program = ts.createProgram([consumerTypesPath, notificationConsumerPath, datePickerConsumerPath], {
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
            expect(declarations).not.toMatch(/react-day-picker|react-aria-components|@internationalized\/date/)
            expect(declarations).toContain('export declare const NotificationCard:')
            expect(declarations).toContain('export declare const Toaster:')
            expect(declarations).toContain('export declare const ToasterProvider:')
            expect(declarations).toContain('export declare type NotificationCardProps')
            expect(declarations).toContain('export declare type ToasterProps')
            expect(declarations).toContain('export declare type ToasterProviderProps')
            expect(declarations).not.toMatch(/export declare (?:const|type) Toast(?:Provider|Props|Variant|:)/)
            expect(declarations).toContain('export declare const Legend:')
            expect(declarations).toContain('export declare const LEGEND_STYLES:')
            expect(declarations).toContain('export declare type LegendProps')
            expect(declarations).toContain('export declare type AvatarGroupItemProps')
            expect(declarations).toContain('export declare type AvatarGroupCompound')
            expect(declarations).toContain('export declare type ToggleGroupItemProps')
            expect(declarations).toContain('export declare type ToggleGroupCompound')
            expect(declarations).toContain('export declare type CheckboxCompound')
            expect(declarations).toContain('export declare type CheckboxRootProps')
            expect(declarations).toContain('export declare type CheckboxIndicatorProps')
            expect(declarations).toContain('export declare type CheckboxGroupCompound')
            expect(declarations).toContain('export declare type CheckboxGroupHeaderProps')
            const themeCss = await readFile(resolve(outputDirectory, 'styles.css'), 'utf8')
            expect(themeCss).toContain('--color-primary-main')
            expect(themeCss).toContain('--color-border-main:#878d99')
            expect(themeCss).toContain('--color-border-main:#6d737f')
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

            const readComponentCss = async (componentModule: string): Promise<string> => {
                const modulePath = resolve(outputDirectory, 'components', ...componentModule.split('/'))
                const contents = await readFile(modulePath, 'utf8')
                const cssImports = [...contents.matchAll(/import\s*['"]([^'"]+\.css)['"]/g)]
                    .map((match) => match[1])
                    .filter((path) => path.includes('assets/components/'))

                expect(cssImports, componentModule).not.toHaveLength(0)
                const stylesheets = await Promise.all(cssImports.map((path) => readFile(resolve(dirname(modulePath), path), 'utf8')))

                return stylesheets.join('\n')
            }

            const decorativeBorders = [
                'surfaces/card/Card.css.js',
                'surfaces/accordion/components/accordion-item/styles/AccordionItem.css.js',
                'data-display/table/Table.css.js',
                'data-display/table/components/table-row/TableRow.css.js',
                'data-display/table/components/table-header/TableHeader.css.js',
                'data-display/table/components/table-footer/TableFooter.css.js',
                'data-display/rich-text-renderer/RichTextRenderer.css.js',
                'foundation/typography/Typography.css.js',
                'feedback/notification-card/NotificationCard.css.js',
                'forms/calendar/styles/calendarRoot.css.js',
                'forms/select/components/select-content/styles/SelectContent.css.js',
                'forms/autocomplete/components/autocomplete-content/styles/AutocompleteContent.css.js',
                'forms/time-picker/components/time-picker-panel/styles/TimePickerPanel.css.js',
                'overlay/dialog/Dialog.css.js',
                'overlay/popover/components/content/PopoverContent.css.js',
                'overlay/dropdown-menu/components/content/DropdownMenuContent.css.js',
                'overlay/dropdown-menu/components/shortcut/DropdownMenuShortcut.css.js',
                'overlay/command/Command.css.js',
                'overlay/command/components/command-input/CommandInput.css.js',
                'overlay/command/components/command-item/CommandItem.css.js',
                'navigation/tabs/components/tabs-list/TabsList.css.js',
                'navigation/bottom-navigation/BottomNavigation.css.js',
                'layout/separator/Separator.css.js',
                'forms/select/components/select-separator/styles/SelectSeparator.css.js',
                'forms/autocomplete/components/autocomplete-separator/styles/AutocompleteSeparator.css.js',
                'forms/rich-text-editor/components/toolbar-separator/styles/ToolbarSeparator.css.js',
                'overlay/command/components/command-separator/CommandSeparator.css.js',
                'overlay/dropdown-menu/components/separator/DropdownMenuSeparator.css.js',
                'overlay/bottom-sheet/components/bottom-sheet-separator/BottomSheetSeparator.css.js',
            ]
            for (const componentModule of decorativeBorders) {
                expect(await readComponentCss(componentModule), componentModule).toContain('var(--color-border-muted)')
            }

            const functionalBorders = [
                'forms/text-field/styles/TextField.css.js',
                'forms/text-area/styles/TextArea.css.js',
                'forms/select/components/select-trigger/styles/SelectTrigger.css.js',
                'forms/autocomplete/components/autocomplete-input/styles/AutocompleteInput.css.js',
                'forms/checkbox/Checkbox.css.js',
                'forms/radio-group/components/radio-item/styles/RadioItem.css.js',
                'forms/image-picker/styles/ImagePicker.css.js',
            ]
            for (const componentModule of functionalBorders) {
                expect(await readComponentCss(componentModule), componentModule).toContain('var(--color-border-main)')
            }

            const editorStylesPath = resolve(outputDirectory, 'components/forms/rich-text-editor/styles/RichTextEditor.css.js')
            const toolbarStylesPath = resolve(outputDirectory, 'components/forms/rich-text-editor/components/toolbar/styles/Toolbar.css.js')
            const editorStyles = await readFile(editorStylesPath, 'utf8')
            const toolbarStyles = await readFile(toolbarStylesPath, 'utf8')
            const editorClass = editorStyles.match(/editor:\s*["']([^"']+)["']/)?.[1]
            const toolbarClass = toolbarStyles.match(/root:\s*["']([^"']+)["']/)?.[1]
            expect(editorClass).toBeTruthy()
            expect(toolbarClass).toBeTruthy()
            const editorCss = await readComponentCss('forms/rich-text-editor/styles/RichTextEditor.css.js')
            const toolbarCss = await readComponentCss('forms/rich-text-editor/components/toolbar/styles/Toolbar.css.js')
            const editorRule = editorCss.match(new RegExp(`\\.${editorClass}\\s*\\{([^}]+)\\}`))?.[1]
            const toolbarRule = toolbarCss.match(new RegExp(`\\.${toolbarClass}\\s*\\{([^}]+)\\}`))?.[1]
            const sharedBorder = /border:1px solid var\(--color-border-main\)/
            expect(editorRule).toMatch(sharedBorder)
            expect(toolbarRule).toMatch(sharedBorder)
            expect(toolbarRule).toContain('border-bottom:none')
            expect(editorCss).toContain('var(--color-danger-main)')
            expect(editorCss).toContain('var(--color-primary-main)')

            const avatarCss = await readComponentCss('data-display/avatar/components/avatar-root/AvatarRoot.css.js')
            const badgeCss = await readComponentCss('data-display/badge/Badge.css.js')
            const toggleCss = await readComponentCss('actions/toggle/Toggle.css.js')
            const toggleStyles = await readFile(
                resolve(outputDirectory, 'components/actions/toggle/Toggle.css.js'),
                'utf8',
            )
            const toggleDefaults = toggleStyles.match(/defaultVariants:\s*\{([^}]+)}/)?.[1]
            expect(toggleDefaults).toMatch(/variant:\s*["']ghostSubtle["']/)
            expect(toggleStyles).not.toMatch(/subtle:\s*\{\s*true:/)
            const ghostSubtleClass = toggleStyles.match(
                /variant:\s*["']ghostSubtle["'],\s*color:\s*["']primary["']\s*},\s*["']([^"']+)["']/,
            )?.[1]
            const primaryClass = toggleStyles.match(/color:\s*\{\s*primary:\s*["']([^"']+)["']/)?.[1]
            expect(ghostSubtleClass).toBeTruthy()
            expect(primaryClass).toBeTruthy()
            const subtlePressedRule = toggleCss.match(new RegExp(`\\.${ghostSubtleClass}\\[data-pressed]\\s*\\{([^}]+)\\}`))?.[1]
            expect(subtlePressedRule).toContain('background-color:var(--color-primary-subtlePressed)')
            expect(subtlePressedRule).toContain('color:var(--color-primary-subtleForeground)')
            expect(toggleCss.indexOf(`.${ghostSubtleClass}[data-pressed]`))
                .toBeGreaterThan(toggleCss.indexOf(`.${primaryClass}[data-pressed]`))
            for (const [color, intent] of [
                ['primary', 'primary'], ['secondary', 'secondary'], ['neutral', 'neutral'],
                ['danger', 'danger'], ['success', 'success'], ['warning', 'warning'], ['info', 'info'],
            ]) {
                for (const variant of ['ghostSubtle', 'outlinedSubtle']) {
                    const className = toggleStyles.match(new RegExp(
                        `variant:\\s*["']${variant}["'],\\s*color:\\s*["']${color}["']\\s*},\\s*["']([^"']+)["']`,
                    ))?.[1]
                    expect(className, `${variant} ${color}`).toBeTruthy()
                    const pressedRule = toggleCss.match(new RegExp(`\\.${className}\\[data-pressed]\\s*\\{([^}]+)\\}`))?.[1]
                    const hoverRule = toggleCss.match(new RegExp(
                        `\\.${className}:hover:not\\(:disabled\\):not\\(\\[aria-disabled=(?:true|"true")\\]\\)\\s*\\{([^}]+)\\}`,
                    ))?.[1]
                    expect(pressedRule, `${variant} ${color}`).toContain(`background-color:var(--color-${intent}-subtlePressed)`)
                    expect(pressedRule, `${variant} ${color}`).toContain(`color:var(--color-${intent}-subtleForeground)`)
                    expect(hoverRule, `${variant} ${color}`).toContain(`background-color:var(--color-${intent}-subtle)`)
                    if (variant === 'outlinedSubtle') {
                        expect(pressedRule).toContain(`border-color:var(--color-${intent}-border)`)
                    } else {
                        expect(pressedRule).toMatch(/border-color:(?:transparent|#0000)/)
                    }
                }
            }
            const avatarStyles = await readFile(
                resolve(outputDirectory, 'components/data-display/avatar/components/avatar-root/AvatarRoot.css.js'),
                'utf8',
            )
            const badgeStyles = await readFile(
                resolve(outputDirectory, 'components/data-display/badge/Badge.css.js'),
                'utf8',
            )
            const avatarBaseClass = avatarStyles.match(/defaultClassName:\s*["']([^"']+)["']/)?.[1]
            expect(avatarBaseClass).toBeTruthy()
            const avatarBaseRule = avatarCss.match(new RegExp(`\\.${avatarBaseClass}\\s*\\{([^}]+)\\}`))?.[1]
            expect(avatarBaseRule).toMatch(/border:1px solid (?:transparent|#0000)/)
            expect(avatarStyles).toMatch(/defaultVariants:\s*\{[^}]*variant:\s*["']outlinedSubtle["']/)
            for (const [css, styles] of [[avatarCss, avatarStyles], [badgeCss, badgeStyles]]) {
                const variantSection = styles.match(/variant:\s*\{([^}]+)}/)?.[1]
                const outlinedClass = variantSection?.match(/outlined:\s*["']([^"']+)["']/)?.[1]
                expect(outlinedClass).toBeTruthy()
                const outlinedRule = css.match(new RegExp(`\\.${outlinedClass}\\s*\\{([^}]+)\\}`))?.[1]
                expect(outlinedRule).toMatch(/background-color:(?:transparent|#0000)/)
            }
            for (const [color, intent] of [
                ['primary', 'primary'], ['secondary', 'secondary'], ['neutral', 'neutral'],
                ['danger', 'danger'], ['success', 'success'], ['warning', 'warning'], ['info', 'info'],
                ['purple', 'accentPurple'], ['pink', 'accentPink'], ['orange', 'accentOrange'],
                ['teal', 'accentTeal'], ['cyan', 'accentCyan'], ['indigo', 'accentIndigo'],
            ]) {
                for (const variant of ['contained', 'subtle', 'outlined', 'outlinedSubtle']) {
                    const matchPattern = new RegExp(
                        `variant:\\s*["']${variant}["'],\\s*color:\\s*["']${color}["']\\s*},\\s*["']([^"']+)["']`,
                    )
                    const avatarClass = avatarStyles.match(matchPattern)?.[1]
                    const badgeClass = badgeStyles.match(matchPattern)?.[1]
                    expect(avatarClass, `${color} ${variant}`).toBeTruthy()
                    expect(badgeClass, `${color} ${variant}`).toBeTruthy()
                    const avatarRule = avatarCss.match(new RegExp(`\\.${avatarClass}\\s*\\{([^}]+)\\}`))?.[1]
                    const badgeRule = badgeCss.match(new RegExp(`\\.${badgeClass}\\s*\\{([^}]+)\\}`))?.[1]
                    expect(avatarRule, `${color} ${variant}`).toBe(badgeRule)
                    if (variant === 'contained') {
                        expect(avatarRule).toContain(`background-color:var(--color-${intent}-main)`)
                        expect(avatarRule).toContain(`color:var(--color-${intent}-foreground)`)
                    } else {
                        expect(avatarRule).toContain(`color:var(--color-${intent}-subtleForeground)`)
                    }
                    if (variant === 'subtle' || variant === 'outlinedSubtle') {
                        expect(avatarRule).toContain(`background-color:var(--color-${intent}-subtle)`)
                    }
                    if (variant === 'outlined' || variant === 'outlinedSubtle') {
                        expect(avatarRule).toContain(`border-color:var(--color-${intent}-subtleHover)`)
                    }
                }
            }

            for (const extension of ['js', 'cjs']) {
                const entry = await readFile(resolve(outputDirectory, `index.${extension}`), 'utf8')
                expect(entry).toContain(`components/data-display/avatar-group/components/avatar-group-item/AvatarGroupItem.${extension}`)
                expect(entry).toContain(`components/data-display/avatar-group/AvatarGroup.${extension}`)
                expect(entry).toContain(`components/actions/toggle-group/components/toggle-group-item/ToggleGroupItem.${extension}`)
                expect(entry).toContain(`components/actions/toggle-group/ToggleGroup.${extension}`)
                expect(entry).toContain(`components/forms/primitives/legend/Legend.${extension}`)
                const legendStylesPath = resolve(outputDirectory, `components/forms/primitives/legend/Legend.css.${extension}`)
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
