import BoldIcon from '@resources/asset/BoldIcon.svg?react'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { ToggleStoryArgs } from '@stories/actions/toggle/types'
import groupSource from '@stories/actions/toggle/utils/create-toggle-source/sources/createToggleGroupSource.source.tsx.txt?raw'

/**
 * Builds consumer JSX for the current standalone controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current standalone and demonstration controls.
 * @returns Consumer JSX reflecting the standalone props.
 * @example
 * createToggleSource('', { args: { label: 'Bold' } })
 */
export const createToggleSource = (_source: string, { args }: Readonly<{ args: ToggleStoryArgs }>): string => {
    const attributes = [
        args.label !== undefined ? ` label={${JSON.stringify(args.label)}}` : '',
        args.icon === BoldIcon ? ' icon={BoldIcon}' : '',
        args['aria-label'] !== undefined ? ` aria-label={${JSON.stringify(args['aria-label'])}}` : '',
        ...(['variant', 'color', 'size', 'radius', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'width', 'alignSelf', 'value'] as const)
            .map((key) => args[key] === undefined ? '' : ` ${key}={${JSON.stringify(args[key])}}`),
        args.disabled ? ' disabled' : '',
        args.pressed !== undefined ? ' pressed={pressed} onPressedChange={setPressed}' : '',
        args.pressed === undefined && args.defaultPressed ? ' defaultPressed' : '',
    ].join('')

    const toggle = `<Toggle${attributes} />`
    if (args.pressed === undefined) {
        return toggle
    }
    return `const [pressed, setPressed] = useState(${JSON.stringify(args.pressed)})\n\n${toggle}`
}

/**
 * Builds consumer JSX for the controlled group controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current standalone and demonstration controls.
 * @returns Consumer JSX reflecting the group props.
 * @example
 * createToggleGroupSource('', { args: { label: 'Bold', groupValue: ['bold'] } })
 */
export const createToggleGroupSource = (_source: string, { args }: Readonly<{ args: ToggleStoryArgs }>): string => {
    const attributes = [
        args.groupMultiple ? ' multiple' : '',
        args.groupDisabled ? ' disabled' : '',
        args.groupOrientation === 'vertical' ? ' orientation="vertical"' : '',
    ].join('')
    return renderSource(groupSource, {
        attributes,
        value: JSON.stringify(args.groupValue ?? []),
    })
}
