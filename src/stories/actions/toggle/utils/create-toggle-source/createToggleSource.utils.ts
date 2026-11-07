import BoldIcon from '@resources/asset/BoldIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import UploadIcon from '@resources/asset/UploadIcon.svg?react'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { ToggleStoryArgs } from '@stories/actions/toggle/types'
import groupSource from '@stories/actions/toggle/utils/create-toggle-source/sources/createToggleGroupSource.source.txt?raw'
import template from '@stories/actions/toggle/utils/create-toggle-source/sources/Toggle.source.txt?raw'
import stateTemplate from '@stories/actions/toggle/utils/create-toggle-source/sources/ToggleState.source.txt?raw'
import stateImport from '@stories/actions/toggle/utils/create-toggle-source/sources/StateImport.source.txt?raw'
import playgroundTemplate from '@stories/actions/toggle/utils/create-toggle-source/sources/TogglePlayground.source.txt?raw'
import iconImportTemplate from '@stories/_shared/controlled-source/utils/create-controlled-source/sources/IconImport.source.txt?raw'

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
        args.startIcon === BoldIcon ? ' startIcon={BoldIcon}' : '',
        args.startIcon === UploadIcon ? ' startIcon={UploadIcon}' : '',
        args.endIcon === ChevronRightIcon ? ' endIcon={ChevronRightIcon}' : '',
        args['aria-label'] !== undefined ? ` aria-label={${JSON.stringify(args['aria-label'])}}` : '',
        ...(['variant', 'color', 'size', 'radius', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'width', 'alignSelf', 'value'] as const)
            .map((key) => args[key] === undefined ? '' : ` ${key}={${JSON.stringify(args[key])}}`),
        args.disabled ? ' disabled' : '',
        args.pressed !== undefined ? ' pressed={pressed} onPressedChange={setPressed}' : '',
        args.pressed === undefined && args.defaultPressed ? ' defaultPressed' : '',
    ].join('')

    const icons = [
        (args.icon === BoldIcon || args.startIcon === BoldIcon) && 'BoldIcon',
        args.startIcon === UploadIcon && 'UploadIcon',
        args.endIcon === ChevronRightIcon && 'ChevronRightIcon',
    ].filter((name): name is string => typeof name === 'string')

    return renderSource(template, {
        attributes,
        stateImport: args.pressed === undefined ? '' : stateImport.trim() + '\n',
        stateDeclaration: args.pressed === undefined ? '' : '    ' + renderSource(stateTemplate, { pressed: JSON.stringify(args.pressed) }),
        iconImports: icons.map(name => renderSource(iconImportTemplate, { name })).join('\n'),
    })
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

/**
 * Includes both controlled APIs displayed in the primary playground.
 * @internal Not part of the public package API.
 * @param _source - Generated source replaced by the consumer examples.
 * @param context - Current story context.
 * @param context.args - Standalone props and group controls.
 * @returns One source block with both controlled examples.
 * @example createTogglePlaygroundSource('', { args: { label: 'Bold', pressed: false } })
 */
export const createTogglePlaygroundSource = (_source: string, context: Readonly<{ args: ToggleStoryArgs }>): string => {
    const standalone = createToggleSource(_source, context)
    const group = createToggleGroupSource(_source, context)
    const iconImports = standalone.split(/\r?\n/).filter(line => /^import .+ from '\.\//.test(line)).join('\n')

    return renderSource(playgroundTemplate, {
        iconImports,
        standalone: standalone.replace(/^import .*\r?\n/gm, '').replace('const Example', 'const StandaloneExample').trim(),
        group: group.replace(/^import .*\r?\n/gm, '').replace('export const FormattingOptions', 'const GroupExample').trim(),
    })
}
