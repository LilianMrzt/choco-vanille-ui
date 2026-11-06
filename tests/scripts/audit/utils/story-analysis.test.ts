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
