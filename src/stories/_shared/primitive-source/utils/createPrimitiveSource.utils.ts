import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { PrimitiveSourceOptions } from '@stories/_shared/primitive-source/types'

/**
 * Serializes a story's primitive props into a public JSX source template.
 * The caller explicitly excludes non-serializable demonstration props.
 * @internal Not part of the public package API.
 * @template Props - Component props accepted by the story.
 * @param template - Source text containing `attributes` and optionally `children` placeholders.
 * @param options - Properties to omit and whether text children are rendered.
 * @returns A Storybook source transform.
 * @throws When a supplied value cannot be represented as JSON.
 * @example
 * createPrimitiveSource('<Box{{attributes}}>{{children}}</Box>', { hasChildren: true })
 */
export const createPrimitiveSource = <Props extends object>(
    template: string,
    options: PrimitiveSourceOptions = {},
): ((_source: string, context: Readonly<{ args: Props }>) => string) => (
        _source,
        { args },
    ) => {
        const entries = Object.entries(args)
        const omitted = new Set(['children', 'ref', ...(options.omit ?? [])])
        const attributes = entries
            .filter(([name, value]) => !omitted.has(name) && value !== undefined && !/^on[A-Z]/.test(name))
            .map(([name, value]) => {
                const serialized = JSON.stringify(value)
                if (serialized === undefined) {
                    throw new TypeError(`Cannot serialize story prop: ${name}`)
                }

                return ` ${name}={${serialized}}`
            })
            .join('')
        const child = entries.find(([name]) => name === 'children')?.[1]
        let children = ''
        if (options.hasChildren && child !== undefined && child !== null) {
            if (typeof child !== 'string' && typeof child !== 'number') {
                throw new TypeError('Story children must be text or a number')
            }
            children = `{${JSON.stringify(child)}}`
        }

        return renderSource(template, { attributes, children })
    }
