import { describe, expect, it } from 'vitest'

import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'

describe('createControlledSource', () => {
    it('serializes current controls and controlled text state', () => {
        const transform = createControlledSource<{ label: string; value: string; onChange: () => void }>({
            component: 'TextField',
            stateProp: 'value',
            eventProp: 'onChange',
            handler: '(event) => setValue(event.target.value)',
        })
        const source = transform('', { args: { label: 'Email', value: 'hello', onChange: () => undefined } })

        expect(source).toContain('useState("hello")')
        expect(source).toContain('label={"Email"} value={value}')
        expect(source).toContain('onChange={(event) => setValue(event.target.value)}')
        expect(source).not.toContain('{{')
    })

    it('renders compound children and omits demonstration arguments', () => {
        const transform = createControlledSource<{ value: string[]; itemLabel: string }>({
            component: 'CheckboxGroup',
            stateProp: 'value',
            eventProp: 'onValueChange',
            stateType: 'string[]',
            handler: 'setValue',
            omitted: ['itemLabel'],
            children: ({ itemLabel }) => `<CheckboxGroup.Item value="a" label={${JSON.stringify(itemLabel)}} />`,
        })
        const source = transform('', { args: { value: ['a'], itemLabel: 'First' } })

        expect(source).toContain('useState<string[]>(["a"])')
        expect(source).toContain('<CheckboxGroup.Item value="a" label={"First"} />')
        expect(source).not.toContain('itemLabel=')
    })

    it('rejects nonserializable controlled state', () => {
        const transform = createControlledSource<{ value?: string }>({
            component: 'TextField',
            stateProp: 'value',
            eventProp: 'onChange',
            handler: 'setValue',
        })

        expect(() => transform('', { args: {} })).toThrow('must be serializable')
    })

    it('includes controlled popup state when provided', () => {
        const transform = createControlledSource<{ value: string; open: boolean }>({
            component: 'SelectField',
            stateProp: 'value',
            eventProp: 'onValueChange',
            handler: 'setValue',
            openState: true,
        })

        const source = transform('', { args: { value: 'a', open: true } })
        expect(source).toContain('const [open, setOpen] = useState(true)')
        expect(source).toContain('open={open} onOpenChange={setOpen}')
    })
})
