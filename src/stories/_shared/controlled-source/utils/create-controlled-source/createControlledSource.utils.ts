import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { ControlledSourceOptions } from '@stories/_shared/controlled-source/utils/create-controlled-source/types'
import exampleTemplate from '@stories/_shared/controlled-source/utils/create-controlled-source/sources/ControlledExample.source.txt?raw'
import elementTemplate from '@stories/_shared/controlled-source/utils/create-controlled-source/sources/Element.source.txt?raw'
import childrenTemplate from '@stories/_shared/controlled-source/utils/create-controlled-source/sources/ElementWithChildren.source.txt?raw'
import openStateTemplate from '@stories/_shared/controlled-source/utils/create-controlled-source/sources/OpenState.source.txt?raw'
import openAttributes from '@stories/_shared/controlled-source/utils/create-controlled-source/sources/OpenAttributes.source.txt?raw'
import iconImportTemplate from '@stories/_shared/controlled-source/utils/create-controlled-source/sources/IconImport.source.txt?raw'

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
    const iconImport = hasIcon && options.icon
        ? renderSource(iconImportTemplate, { name: options.icon.name, module: options.icon.module }) + '\n'
        : ''
    const stateType = options.stateType ? `<${options.stateType}>` : ''
    const element = renderSource(options.children ? childrenTemplate : elementTemplate, {
        component: options.component,
        attributes,
        stateProp: options.stateProp,
        eventProp: options.eventProp,
        handler: options.handler,
        children: options.children?.(args) ?? '',
        openAttributes: isOpenControlled ? openAttributes.trimEnd() : '',
    })
    const wrappedElement = options.wrapElement ? options.wrapElement(element) : element

    return renderSource(exampleTemplate, {
        component: options.component,
        iconImport,
        additionalImports: options.additionalImports ?? '',
        stateType,
        stateValue,
        element: wrappedElement,
        openState: isOpenControlled ? '    ' + renderSource(openStateTemplate, { open: JSON.stringify(open) }) + '\n' : '',
    })
}
