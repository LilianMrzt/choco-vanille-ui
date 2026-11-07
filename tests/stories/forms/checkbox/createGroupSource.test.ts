import { describe, expect, it } from 'vitest'

import { createGroupSource } from '@stories/forms/checkbox/utils/create-group-source/createGroupSource.utils'

describe('createGroupSource', () => {
    it('reflects group controls without leaking story-only arguments', () => {
        const source = createGroupSource('', {
            args: {
                checked: false,
                compoundLabel: 'Terms',
                indicatorText: 'X',
                indicatorKeepMounted: false,
                groupLabel: 'Channels',
                groupHelperText: 'Choose channels.',
                groupError: 'Required',
                groupDisabled: true,
                groupValue: ['sms'],
                groupOnValueChange: undefined,
                groupHeaderLabel: 'All channels',
                groupLabelOne: 'Mail',
                groupLabelTwo: 'Text',
                groupLabelThree: 'Push',
            },
        })

        expect(source).toContain('useState<string[]>(["sms"])')
        expect(source).toContain('label={"Channels"}')
        expect(source).toContain('helperText={"Choose channels."}')
        expect(source).toContain('error={"Required"}')
        expect(source).toContain('disabled={true}')
        expect(source).toContain('allValues={["email","sms","push"]}')
        expect(source).toContain('<CheckboxGroup.Header label={"All channels"} />')
        expect(source).toContain('<CheckboxGroup.Item value="sms" label={"Text"} />')
        expect(source).not.toContain('groupLabel')
        expect(source).not.toContain('compoundLabel')
    })
})
