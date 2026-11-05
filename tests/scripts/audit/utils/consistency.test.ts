import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

import { buildSourceGraph } from '@scripts/audit/utils/source-graph'
import { analyzeComponents } from '@scripts/audit/utils/component-analysis'
import { detectConsistency } from '@scripts/audit/utils/consistency'

describe('v2 public default documentation audit', () => {
    it('reads types/index.ts and still detects a missing size default', () => {
        const root = resolve('.')
        const componentsRoot = resolve(root, 'src', 'components')
        const graph = buildSourceGraph(root, componentsRoot)
        const components = analyzeComponents({ ...graph, componentsRoot })
        const context = { root, components, sourceFiles: graph.sourceFiles, publicExports: graph.publicExports }
        const hasAvatarSizeWarning = () => detectConsistency(context).some(
            (finding) => finding.component === 'Avatar' && finding.rule === 'undocumented-public-default',
        )

        expect(hasAvatarSizeWarning()).toBe(false)

        const propsPath = resolve(componentsRoot, 'data-display', 'avatar', 'types', 'index.ts')
        const propsFile = graph.sourceFiles.find((sourceFile) => resolve(sourceFile.getFilePath()) === propsPath)
        if (!propsFile) {
            throw new Error('Expected Avatar types/index.ts in the source graph')
        }
        const source = propsFile.getFullText()
        propsFile.replaceWithText(source.replace(/Defaults? to `md`\./g, 'Size preset.'))

        expect(hasAvatarSizeWarning()).toBe(true)
    }, 30_000)
})
