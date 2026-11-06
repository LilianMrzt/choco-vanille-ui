import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

const ENTRIES = [
    ['foundation', 'icon', 'Icon'],
    ['foundation', 'typography', 'Typography'],
    ['layout', 'box', 'Box'],
    ['layout', 'fieldset', 'Fieldset'],
    ['layout', 'flex', 'Flex'],
    ['layout', 'form', 'Form'],
    ['layout', 'grid', 'Grid'],
    ['layout', 'image', 'Image'],
    ['layout', 'inset', 'Inset'],
    ['forms', 'legend', 'Legend'],
    ['layout', 'separator', 'Separator'],
    ['layout', 'svg-image', 'SvgImage'],
] as const

describe('Foundation, layout and Legend story organization', () => {
    it.each(ENTRIES)('keeps %s/%s CSF entries focused on metadata', async (category, folder, name) => {
        const filename = resolve('src', 'stories', category, folder, name + '.stories.tsx')
        const text = await readFile(filename, 'utf8')
        const file = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
        const privateVariables = file.statements
            .filter(ts.isVariableStatement)
            .filter(statement => !statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword))
            .flatMap(statement => statement.declarationList.declarations.map(declaration => declaration.name.getText(file)))

        expect(privateVariables).toEqual(['meta'])
        expect(file.statements.filter(ts.isTypeAliasDeclaration).map(declaration => declaration.name.text)).toEqual(['Story'])
        expect(text).not.toMatch(/<(?:Canvas|Controls|Markdown|Stories)\b/)
    })
})
