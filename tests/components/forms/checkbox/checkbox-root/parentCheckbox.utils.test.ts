import { describe, expect, it } from 'vitest'

import { getParentCheckboxState } from '@components/forms/checkbox/components/checkbox-root/hooks/use-checkbox-root/utils/getParentCheckboxState.utils.ts'
import { getParentCheckboxValues } from '@components/forms/checkbox/components/checkbox-root/hooks/use-checkbox-root/utils/getParentCheckboxValues.utils.ts'

describe('parent checkbox calculations', () => {
    it('determines unchecked, mixed and checked states within the parent scope', () => {
        expect(getParentCheckboxState([], ['other'])).toEqual({ checked: false, indeterminate: false })
        expect(getParentCheckboxState(['a', 'b'], ['other'])).toEqual({ checked: false, indeterminate: false })
        expect(getParentCheckboxState(['a', 'b'], ['a', 'other'])).toEqual({ checked: false, indeterminate: true })
        expect(getParentCheckboxState(['a', 'b'], ['a', 'b', 'other'])).toEqual({ checked: true, indeterminate: false })
    })

    it('retains disabled and out-of-scope selections when selecting or clearing', () => {
        const registrations = [
            { id: 'a', value: 'a', disabled: true },
            { id: 'b', value: 'b', disabled: false },
            { id: 'c', value: 'c', disabled: true },
        ]
        expect(getParentCheckboxValues(['a', 'b', 'c'], ['a', 'other'], registrations, true)).toEqual(['a', 'b', 'other'])
        expect(getParentCheckboxValues(['a', 'b', 'c'], ['a', 'b', 'other'], registrations, false)).toEqual(['a', 'other'])
    })
})
