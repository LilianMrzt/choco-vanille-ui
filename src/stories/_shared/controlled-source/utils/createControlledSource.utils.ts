import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'

type ControlledSourceOptions<Props> = Readonly<{
    component: string
    stateProp: string
    eventProp: string
    stateType?: string
    handler: string
    omitted?: readonly string[]
    icon?: Readonly<{ prop: string; name: string }>
    children?: (args: Props) => string
    openState?: boolean
    additionalImports?: string
    wrapElement?: (element: string) => string
}>

/**
 * Generates a controlled consumer example from serializable Storybook args.
 * @internal Storybook-only utility; not part of the public package API.
 * @template Props - Props accepted by the example.
 * @param options - Component, controlled state and event configuration.
 * @returns A Storybook source transform.
 * @example
 * createControlledSource({ component: 'Checkbox', stateProp: 'checked', eventProp: 'onCheckedChange', handler: 'setValue' })
 */
export const createControlledSource = <Props extends object>(options: ControlledSourceOptions<Props>) => (
    _source: string,
    { args }: Readonly<{ args: Props }>,
): string => {
    const entries = Object.entries(args)
    const state = entries.find(([name]) => name === options.stateProp)?.[1]
    const stateValue = JSON.stringify(state)
    if (stateValue === undefined) {
        throw new TypeError(`The controlled ${options.stateProp} must be serializable`)
    }

    const omitted = new Set([options.stateProp, options.eventProp, 'defaultValue', 'defaultChecked', 'ref', ...(options.omitted ?? [])])
    const open = entries.find(([name]) => name === 'open')?.[1]
    const isOpenControlled = options.openState === true && typeof open === 'boolean'
    if (isOpenControlled) {
        omitted.add('open')
        omitted.add('defaultOpen')
    }
    let hasIcon = false
    const attributes = entries.map(([name, value]) => {
        if (omitted.has(name) || value === undefined || /^on[A-Z]/.test(name)) {
            return ''
        }
        if (name === options.icon?.prop) {
            hasIcon = true
            return ` ${name}={${options.icon.name}}`
        }
        const serialized = JSON.stringify(value)
        if (serialized === undefined) {
            throw new TypeError(`Cannot serialize story prop: ${name}`)
        }
        return ` ${name}={${serialized}}`
    }).join('')
    const iconImport = hasIcon ? `import ${options.icon?.name} from './${options.icon?.name}'\n` : ''
    const stateType = options.stateType ? `<${options.stateType}>` : ''
    const element = options.children
        ? `<{{component}}{{attributes}}{{openAttributes}} {{stateProp}}={value} {{eventProp}}={{{handler}}}>\n{{children}}\n    </{{component}}>`
        : `<{{component}}{{attributes}}{{openAttributes}} {{stateProp}}={value} {{eventProp}}={{{handler}}} />`
    const wrappedElement = options.wrapElement ? options.wrapElement(element) : element
    const template = `import { useState } from 'react'
import { {{component}} } from '@choco-vanille/ui'
{{iconImport}}{{additionalImports}}
const Example = () => {
    const [value, setValue] = useState{{stateType}}({{stateValue}})
{{openState}}

    return ${wrappedElement}
}`

    return renderSource(template, {
        component: options.component,
        iconImport,
        additionalImports: options.additionalImports ?? '',
        stateType,
        stateValue,
        attributes,
        stateProp: options.stateProp,
        eventProp: options.eventProp,
        handler: options.handler,
        children: options.children?.(args) ?? '',
        openState: isOpenControlled ? `    const [open, setOpen] = useState(${open})\n` : '',
        openAttributes: isOpenControlled ? ' open={open} onOpenChange={setOpen}' : '',
    })
}
