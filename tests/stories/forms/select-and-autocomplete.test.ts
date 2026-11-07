import { describe, expect, it } from 'vitest'
import ts from 'typescript'

import selectMeta, { Sizes as SelectSizes, States as SelectStates, WithIcons as SelectWithIcons } from '@stories/forms/select/Select.stories'
import autocompleteMeta, { Sizes as AutocompleteSizes, States as AutocompleteStates, WithIcons as AutocompleteWithIcons } from '@stories/forms/autocomplete/Autocomplete.stories'
import selectUsage from '@stories/forms/select/sources/SelectUsage.source.txt?raw'
import selectStates from '@stories/forms/select/sources/SelectStates.source.txt?raw'
import selectIcons from '@stories/forms/select/sources/SelectWithIcons.source.txt?raw'
import autocompleteUsage from '@stories/forms/autocomplete/sources/AutocompleteUsage.source.txt?raw'
import autocompleteStates from '@stories/forms/autocomplete/sources/AutocompleteStates.source.txt?raw'
import autocompleteIcons from '@stories/forms/autocomplete/sources/AutocompleteWithIcons.source.txt?raw'
import selectSizes from '@stories/forms/select/sources/SelectSizes.source.txt?raw'
import autocompleteSizes from '@stories/forms/autocomplete/sources/AutocompleteSizes.source.txt?raw'

describe('Select and Autocomplete stories', () => {
    it.each([
        selectUsage,
        autocompleteUsage,
        selectSizes,
        selectStates,
        selectIcons,
        autocompleteSizes,
        autocompleteStates,
        autocompleteIcons,
    ])('provides valid TSX consumer source', (source) => {
        const result = ts.transpileModule(source, {
            fileName: 'consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
            reportDiagnostics: true,
        })

        expect(result.diagnostics?.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')))
            .toEqual([])
        expect(source).toContain("from '@choco-vanille/ui'")
    })

    it.each([
        [SelectSizes, selectSizes],
        [SelectStates, selectStates],
        [SelectWithIcons, selectIcons],
        [AutocompleteSizes, autocompleteSizes],
        [AutocompleteStates, autocompleteStates],
        [AutocompleteWithIcons, autocompleteIcons],
    ])('uses the consumer source for each example', (story, source) => {
        expect(story.parameters?.docs.source.code).toBe(source.trim())
    })

    it.each([
        [selectMeta.parameters.docs.description.component, selectUsage],
        [autocompleteMeta.parameters.docs.description.component, autocompleteUsage],
    ])('shows both APIs in one source block after the description', (description, source) => {
        expect(description.match(/~~~tsx/g)).toHaveLength(1)
        expect(description).toContain(source)
        expect(description.indexOf(source)).toBeGreaterThan(0)
    })
})
