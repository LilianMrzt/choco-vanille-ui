import { Project } from 'ts-morph'
import { describe, expect, it } from 'vitest'

import { analyzeComponentStories } from '@scripts/audit/utils/story-analysis'
import type { ComponentInfo } from '@scripts/audit/types'

const findSourceErrors = (source: string): string[] => {
    const project = new Project({ useInMemoryFileSystem: true })
    const file = project.createSourceFile('src/stories/data-display/badge/Badge.stories.tsx', source)
    const result = analyzeComponentStories('/', [file], [])

    return result.findings.filter((finding) => finding.rule === 'story-source-code').map((finding) => finding.rule)
}

describe('Storybook consumer source audit', () => {
    it('requires compound controls only for slots rendered by the primary playground', () => {
        const component: ComponentInfo = {
            name: 'Example', sourcePath: 'src/components/forms/example/Example.tsx',
            category: 'forms', scope: 'public', props: [], variants: [], statuses: [],
            tones: [], rawDimensions: [], stylingProps: [], vanillaExtractStyleBases: [],
            exports: ['ExampleCompound'], subComponents: ['ExampleRoot', 'ExampleIndicator'], parentComponents: [],
        }
        const cases = [
            {
                name: 'standalone playground with compound documentation and secondary story',
                render: '() => <Example label="Standalone" />',
                extra: 'const documentation = "Compound: Root"; export const Compound = { render: () => <Example.Root /> }',
                controls: '',
                missing: false,
            },
            {
                name: 'compound playground with missing controls',
                render: '() => <Example.Root><Example.Indicator /></Example.Root>',
                extra: 'const documentation = "Compound: Root Compound: Indicator";',
                controls: '',
                missing: true,
            },
            {
                name: 'compound playground with a missing slot category',
                render: '() => <Example.Root><Example.Indicator /></Example.Root>',
                extra: '',
                controls: "root: { control: 'text', table: { category: 'Compound: Root' } }",
                missing: true,
            },
            {
                name: 'compound playground with both slot categories',
                render: '() => <Example.Root><Example.Indicator /></Example.Root>',
                extra: '',
                controls: "root: { table: { category: 'Compound: Root' } }, indicator: { table: { category: 'Compound: Root', subcategory: 'Compound: Indicator' } }",
                missing: false,
            },
        ]
        for (const testCase of cases) {
            const project = new Project({ useInMemoryFileSystem: true })
            const file = project.createSourceFile('/src/stories/forms/example/Example.stories.tsx', `
const meta = { component: ExampleField, argTypes: { ${testCase.controls} } }
export default meta
export const Playground = { render: ${testCase.render} }
${testCase.extra}
`)
            const findings = analyzeComponentStories('/', [file], [component]).findings
                .filter((finding) => finding.rule === 'story-compound-controls')
            expect(findings.length, testCase.name).toBe(testCase.missing ? 1 : 0)
        }
    })

    it('follows extracted primary renderers and named component aliases but not other stories', () => {
        const project = new Project({
            useInMemoryFileSystem: true,
            compilerOptions: { baseUrl: '/', paths: { '@stories/*': ['src/stories/*'] } },
        })
        const file = project.createSourceFile('/src/stories/forms/example/Example.stories.tsx', `
import PlaygroundRenderer from '@stories/forms/example/components/playground/Playground'
import Secondary from '@stories/forms/example/components/secondary/Secondary'
const meta = { render: () => <PlaygroundRenderer />, argTypes: {} }
export default meta
export const Playground = {}
export const Other = { render: Secondary }
`)
        project.createSourceFile('/src/stories/forms/example/components/playground/Playground.tsx', `
import Nested from '../nested/Nested'
const Playground = () => <Nested />
export default Playground
`)
        const nested = project.createSourceFile('/src/stories/forms/example/components/nested/Nested.tsx', `
import { Example as Alias } from '@components/forms/example'
const Nested = () => <Alias.Root />
export default Nested
`)
        project.createSourceFile('/src/stories/forms/example/components/secondary/Secondary.tsx', `
const Secondary = () => <Example.Indicator />
export default Secondary
`)
        const component: ComponentInfo = {
            name: 'Example', sourcePath: 'src/components/forms/example/Example.tsx',
            category: 'forms', scope: 'public', props: [], variants: [], statuses: [],
            tones: [], rawDimensions: [], stylingProps: [], vanillaExtractStyleBases: [],
            exports: ['ExampleCompound'], subComponents: ['ExampleRoot', 'ExampleIndicator'], parentComponents: [],
        }
        const compoundFindings = () => analyzeComponentStories('/', [file], [component]).findings
            .filter((finding) => finding.rule === 'story-compound-controls')

        expect(compoundFindings()).toHaveLength(1)
        nested.replaceWithText('const Nested = () => <Example label="Standalone" />; export default Nested')
        expect(compoundFindings()).toHaveLength(0)
    })

    it('recognizes inherited JSX children and respects playground overrides', () => {
        const project = new Project({ useInMemoryFileSystem: true })
        const file = project.createSourceFile('/src/stories/forms/example/Example.stories.tsx', `
const meta = { component: Example, args: { children: <Example.Root /> } }
export default meta
export const Playground = {}
`)
        const component: ComponentInfo = {
            name: 'Example', sourcePath: 'src/components/forms/example/Example.tsx',
            category: 'forms', scope: 'public', props: [], variants: [], statuses: [],
            tones: [], rawDimensions: [], stylingProps: [], vanillaExtractStyleBases: [],
            exports: ['ExampleCompound'], subComponents: ['ExampleRoot'], parentComponents: [],
        }
        const compoundFindings = () => analyzeComponentStories('/', [file], [component]).findings
            .filter((finding) => finding.rule === 'story-compound-controls')

        expect(compoundFindings()).toHaveLength(1)
        file.getVariableDeclarationOrThrow('Playground').setInitializer('{ args: { children: "Simple" } }')
        expect(compoundFindings()).toHaveLength(0)
    })

    it('recognizes a function declaration used as the playground renderer', () => {
        const project = new Project({ useInMemoryFileSystem: true })
        const file = project.createSourceFile('/src/stories/forms/example/Example.stories.tsx', `
function renderExample() { return <Example.Root /> }
const meta = { component: Example }
export default meta
export const Playground = { render: renderExample }
`)
        const component: ComponentInfo = {
            name: 'Example', sourcePath: 'src/components/forms/example/Example.tsx',
            category: 'forms', scope: 'public', props: [], variants: [], statuses: [],
            tones: [], rawDimensions: [], stylingProps: [], vanillaExtractStyleBases: [],
            exports: ['ExampleCompound'], subComponents: ['ExampleRoot'], parentComponents: [],
        }
        const findings = analyzeComponentStories('/', [file], [component]).findings
        expect(findings.some((finding) => finding.rule === 'story-compound-controls')).toBe(true)
    })

    it.each(['color', 'text', 'select'])('distinguishes free CSS colors from finite color axes (%s)', (control) => {
        const project = new Project({ useInMemoryFileSystem: true })
        const file = project.createSourceFile('/src/stories/layout/box/Box.stories.tsx', `
const Box = (_props: { color?: string }) => null
const meta = { component: Box, argTypes: { color: { control: '${control}' } } }
export default meta
export const Playground = {}
`)
        const component: ComponentInfo = {
            name: 'Box', sourcePath: 'src/components/layout/box/Box.tsx',
            category: 'layout', scope: 'public', props: [], variants: [], statuses: [],
            tones: [], rawDimensions: [], stylingProps: [], vanillaExtractStyleBases: [],
            exports: [], subComponents: [], parentComponents: [],
        }
        const findings = analyzeComponentStories('/', [file], [component]).findings
        expect(findings.some((finding) => finding.rule === 'story-canonical-showcase')).toBe(control === 'select')
    })

    it.each([true, false])('requires populated labelled Appearance sections (populated: %s)', (populated) => {
        const project = new Project({ useInMemoryFileSystem: true })
        const file = project.createSourceFile('/src/stories/data-display/badge/Badge.stories.tsx', `
const BadgeAppearance = () => <section><h3>Variants / Colors</h3>${populated ? '<Badge variant="contained" color="primary" /><Badge variant="outlined" color="primary" />' : ''}</section>
const meta = { argTypes: { variant: { control: 'select' }, color: { control: 'select' } } }
export default meta
export const Playground = {}
export const Appearance = { render: BadgeAppearance }
`)
        const component: ComponentInfo = {
            name: 'Badge', sourcePath: 'src/components/data-display/badge/Badge.tsx',
            category: 'data-display', scope: 'public', props: [], variants: [], statuses: [],
            tones: [], rawDimensions: [], stylingProps: [], vanillaExtractStyleBases: [],
            exports: [], subComponents: [], parentComponents: [],
        }
        const findings = analyzeComponentStories('/', [file], [component]).findings
        expect(findings.some((finding) => finding.rule === 'story-canonical-showcase')).toBe(!populated)
    })

    it.each([true, false])('requires a separate Sizes story even with a populated appearance section (dedicated: %s)', (dedicated) => {
        const project = new Project({ useInMemoryFileSystem: true })
        const file = project.createSourceFile('/src/stories/data-display/badge/Badge.stories.tsx', `
const BadgeAppearance = () => <section><h3>Sizes</h3><Badge size="sm" /><Badge size="md" /></section>
const meta = { argTypes: { size: { control: 'select' } } }
export default meta
export const Playground = {}
export const Appearance = { render: BadgeAppearance }
${dedicated ? 'export const Sizes = { render: BadgeAppearance }' : ''}
`)
        const component: ComponentInfo = {
            name: 'Badge', sourcePath: 'src/components/data-display/badge/Badge.tsx',
            category: 'data-display', scope: 'public', props: [], variants: [], statuses: [],
            tones: [], rawDimensions: [], stylingProps: [], vanillaExtractStyleBases: [],
            exports: [], subComponents: [], parentComponents: [],
        }
        const findings = analyzeComponentStories('/', [file], [component]).findings
        expect(findings.some((finding) => finding.rule === 'story-canonical-showcase')).toBe(!dedicated)
    })

    it('audits component stories without applying component rules to reference pages', () => {
        const project = new Project({ useInMemoryFileSystem: true })
        const paths = [
            '/src/stories/docs/colors/Colors.stories.tsx',
            '/src/stories/docs/css-variables/CssVariables.stories.tsx',
            '/src/stories/docs/tokens/Tokens.stories.tsx',
            '/src/stories/guidelines/example/Example.stories.tsx',
            '/src/stories/overview/example/Example.stories.tsx',
            '/src/stories/data-display/badge/docs/Badge.stories.tsx',
        ]
        const files = paths.map((filePath) => project.createSourceFile(filePath, 'export const Reference = {}'))
        const result = analyzeComponentStories('/', files, [])

        expect(result.storyCount).toBe(1)
        expect(result.findings.map((finding) => finding.rule)).toContain('story-playground')
        expect(result.findings.every((finding) => finding.file === 'src/stories/data-display/badge/docs/Badge.stories.tsx')).toBe(true)
    })

    it('does not confuse a docs-page subsection with the component description', () => {
        const project = new Project({ useInMemoryFileSystem: true, compilerOptions: { paths: { '@stories/*': ['/src/stories/*'] } } })
        const file = project.createSourceFile('/src/stories/data-display/badge/Badge.stories.tsx', `
import DocsPage from '@stories/data-display/badge/components/docs-page/DocsPage'
const meta = { parameters: { docs: { page: DocsPage, description: { component: 'A badge.' } } } }
export default meta
export const Playground = {}
`)
        project.createSourceFile('/src/stories/data-display/badge/components/docs-page/DocsPage.tsx', `
const details = md\`**Sub-components**\`
const DocsPage = () => <><Controls /><Markdown>{details}</Markdown></>
export default DocsPage
`)
        const findings = analyzeComponentStories('/', [file], []).findings
        expect(findings.filter((finding) => finding.rule === 'story-subcomponents-order')).toEqual([])
    })

    it('still flags subcomponents inside the component description', () => {
        const project = new Project({ useInMemoryFileSystem: true })
        const file = project.createSourceFile('/src/stories/data-display/badge/Badge.stories.tsx', `
const meta = { parameters: { docs: { description: { component: md\`Badge. **Sub-components**\` } } } }
export default meta
export const Playground = {}
`)
        const findings = analyzeComponentStories('/', [file], []).findings
        expect(findings.some((finding) => finding.rule === 'story-subcomponents-order')).toBe(true)
    })

    it('accepts a shared dynamic source transform inherited by stories', () => {
        expect(findSourceErrors(`
const meta = {
    parameters: { docs: { source: { type: 'dynamic', transform: (_source, { args }) => '<Badge label="' + args.label + '" />' } } },
} satisfies Meta<typeof Badge>
export default meta
export const Playground = {}
export const LongLabel = { args: { label: 'Long label' } }
`)).toEqual([])
    })

    it('accepts explicit source code and per-story helper parameters', () => {
        expect(findSourceErrors(`
const meta = {}
export default meta
export const Playground = { parameters: { docs: { source: { code: '<Badge label="Badge" />' } } } }
export const Colors = { parameters: { docs: { ...storySource('<Badge label="Success" color="success" />') } } }
`)).toEqual([])
    })

    it('recognizes callable source transforms returned by factories', () => {
        expect(findSourceErrors(`
const createSource = (template: string) => (_source: string) => template
const meta = { parameters: { docs: { source: { transform: createSource('<Box />') } } } }
export default meta
export const Playground = {}
`)).toEqual([])
    })

    it('rejects factory results that are not callable', () => {
        expect(findSourceErrors(`
const createSource = () => '<Box />'
const meta = { parameters: { docs: { source: { transform: createSource() } } } }
export default meta
export const Playground = {}
`)).toEqual(['story-source-code'])
    })

    it('rejects a missing source even when another story has multiple source helper calls', () => {
        expect(findSourceErrors(`
const meta = {}
export default meta
export const Playground = { parameters: { docs: { ...storySource('one'), ...storySource('two') } } }
export const Missing = {}
`)).toEqual(['story-source-code'])
    })

    it('does not treat dynamic serialization without a consumer transform as controlled source', () => {
        expect(findSourceErrors(`
const meta = { parameters: { docs: { source: { type: 'dynamic' } } } }
export default meta
export const Playground = {}
`)).toEqual(['story-source-code'])
    })

    it('follows owned documentation, imported transforms and control constants', () => {
        const project = new Project({
            useInMemoryFileSystem: true,
            compilerOptions: { paths: { '@stories/*': ['/src/stories/*'] } },
        })
        project.createSourceFile('/src/stories/data-display/badge/Badge.stories.tsx', `
import BadgeDocsPage from '@stories/data-display/badge/components/badge-docs-page/BadgeDocsPage'
import { ARG_TYPES } from '@stories/data-display/badge/constants'
import { createSource } from '@stories/data-display/badge/utils/createSource.utils'
const meta = {
    argTypes: ARG_TYPES,
    parameters: { docs: {
        page: BadgeDocsPage,
        description: { component: 'A noninteractive label.' },
        source: { transform: createSource },
    } },
}
export default meta
export const Playground = {}
`)
        project.createSourceFile('/src/stories/data-display/badge/components/badge-docs-page/BadgeDocsPage.tsx', `
import { ACCESSIBILITY_DESCRIPTION } from '@stories/data-display/badge/components/badge-docs-page/constants'
const BadgeDocsPage = () => <>
    <Canvas />
    <Controls />
    <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
    <Stories includePrimary={false} />
</>
export default BadgeDocsPage
`)
        project.createSourceFile('/src/stories/data-display/badge/components/badge-docs-page/constants/index.ts', `
export const ACCESSIBILITY_DESCRIPTION = 'Accessibility\\n| Prop / Attribute | Required | Type | Notes |'
`)
        project.createSourceFile('/src/stories/data-display/badge/constants/index.ts', `
export const ARG_TYPES = { size: { control: 'select', options: ['sm', 'md'] } } satisfies ArgTypes
`)
        project.createSourceFile('/src/stories/data-display/badge/utils/createSource.utils.ts', `
export const createSource = () => '<Badge label="Badge" />'
`)
        const component: ComponentInfo = {
            name: 'Badge',
            sourcePath: 'src/components/data-display/badge/Badge.tsx',
            category: 'data-display',
            scope: 'public',
            props: [],
            variants: [],
            statuses: [],
            tones: [],
            rawDimensions: [],
            stylingProps: [],
            vanillaExtractStyleBases: [],
            exports: [],
            subComponents: [],
            parentComponents: [],
        }
        const result = analyzeComponentStories('/', project.getSourceFiles(), [component])
        expect(result.storyCount).toBe(1)
        expect(result.findings.map((finding) => finding.rule)).toEqual(['story-canonical-showcase'])
        expect(result.findings[0]?.message).toContain('Sizes')
    })

    it.each([
        ["'eager' | 'lazy'", false, false],
        ['boolean', false, true],
        ["'eager' | 'lazy'", true, true],
    ])('distinguishes native loading from interactive states (%s, disabled: %s)', (loadingType, disabled, requiresStates) => {
        const project = new Project({ useInMemoryFileSystem: true })
        const file = project.createSourceFile('/src/stories/layout/example/Example.stories.tsx', `
const Example = (_props: { loading?: ${loadingType}, disabled?: boolean }) => null
const meta = { component: Example, argTypes: { loading: {}, ${disabled ? 'disabled: {},' : ''} } }
export default meta
export const Playground = {}
`)
        const component: ComponentInfo = {
            name: 'Example',
            sourcePath: 'src/components/layout/example/Example.tsx',
            category: 'layout',
            scope: 'public',
            props: [],
            variants: [],
            statuses: [],
            tones: [],
            rawDimensions: [],
            stylingProps: [],
            vanillaExtractStyleBases: [],
            exports: [],
            subComponents: [],
            parentComponents: [],
        }
        const findings = analyzeComponentStories('/', [file], [component]).findings
        expect(findings.some((finding) => finding.rule === 'story-canonical-showcase' && finding.message.includes('States')))
            .toBe(requiresStates)
    })

    it('does not borrow documentation from unrelated sibling modules', () => {
        const project = new Project({ useInMemoryFileSystem: true })
        const file = project.createSourceFile('/src/stories/data-display/badge/Badge.stories.tsx', `
const meta = { parameters: { docs: { description: { component: 'Badge' }, page: MissingPage } } }
export default meta
export const Playground = {}
`)
        project.createSourceFile('/src/stories/data-display/avatar/components/docs/Docs.tsx', `
const Docs = () => <><Controls /><Markdown>Accessibility | Prop / Attribute | Required | Type | Notes |</Markdown><Stories includePrimary={false} /></>
`)
        const result = analyzeComponentStories('/', project.getSourceFiles(), [])
        expect(result.storyCount).toBe(1)
        expect(result.findings.map((finding) => finding.rule)).toContain('story-docs-page')
        expect(result.findings.map((finding) => finding.rule)).toContain('story-accessibility-table')
        expect(file.getVariableDeclaration('meta')).toBeDefined()
    })
})
