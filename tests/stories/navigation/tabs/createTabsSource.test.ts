import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/navigation/tabs/constants'
import { createTabsSource } from '@stories/navigation/tabs/utils/create-tabs-source/createTabsSource.utils'

describe('createTabsSource', () => {
    it('reflects controlled root and slot values', () => {
        const source = createTabsSource('', {
            args: { ...DEFAULT_ARGS, value: 'password', listVariant: 'pills', activationMode: 'automatic', billingWidth: '12rem' },
        })

        expect(source).toContain('useState<TabsProps[\'value\']>("password")')
        expect(source).toContain('variant={"pills"}')
        expect(source).toContain('activationMode={"automatic"}')
        expect(source).toContain('width={"12rem"}')
    })

    it('generates uncontrolled selection', () => {
        const source = createTabsSource('', { args: { ...DEFAULT_ARGS, value: undefined, defaultValue: 'billing' } })
        expect(source).toContain('defaultValue={"billing"}')
    })
})
