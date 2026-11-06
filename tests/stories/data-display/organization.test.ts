import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

const ENTRIES = [
    ['avatar', 'Avatar'],
    ['badge', 'Badge'],
    ['rich-text-renderer', 'RichTextRenderer'],
    ['status-badge', 'StatusBadge'],
    ['table', 'Table'],
] as const

describe('Data display story organization', () => {
    it.each(ENTRIES)('keeps %s CSF metadata separate from its owned resources', async (folder, name) => {
        const filename = resolve('src', 'stories', 'data-display', folder, name + '.stories.tsx')
        const text = await readFile(filename, 'utf8')
        const file = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
        const privateVariables = file.statements
            .filter(ts.isVariableStatement)
            .filter(statement => !statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword))
            .flatMap(statement => statement.declarationList.declarations.map(declaration => declaration.name.getText(file)))
        expect(privateVariables).toEqual(['meta'])
        expect(file.statements.filter(ts.isTypeAliasDeclaration).map(declaration => declaration.name.text)).toEqual(['Story'])
        expect(text).not.toMatch(/<(?:Canvas|Controls|Markdown|Stories)\b/)

        const meta = file.statements.filter(ts.isVariableStatement)
            .flatMap(statement => [...statement.declarationList.declarations])
            .find(declaration => declaration.name.getText(file) === 'meta')?.initializer
        if (!meta || !ts.isSatisfiesExpression(meta) || !ts.isObjectLiteralExpression(meta.expression)) {
            throw new Error('Expected typed CSF metadata for ' + name)
        }
        for (const propertyName of ['args', 'argTypes']) {
            const property = meta.expression.properties.find(candidate =>
                ts.isPropertyAssignment(candidate) && candidate.name.getText(file) === propertyName)
            if (!property || !ts.isPropertyAssignment(property)) {
                throw new Error('Missing ' + propertyName + ' in ' + name)
            }
            expect(ts.isIdentifier(property.initializer)).toBe(true)
        }
    })
})
