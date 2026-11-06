import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { HoverCardStoryArgs } from '@stories/overlay/hover-card/constants'
import controlledTemplate from '@stories/overlay/hover-card/utils/create-hover-card-source/sources/controlled.source.tsx.txt?raw'
import uncontrolledTemplate from '@stories/overlay/hover-card/utils/create-hover-card-source/sources/uncontrolled.source.tsx.txt?raw'

/**
 * Generates JSX reflecting the current preview card controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createHoverCardSource('', { args })
 */
export const createHoverCardSource = (_source: string, { args }: Readonly<{ args: HoverCardStoryArgs }>): string =>
    renderSource(args.open === undefined ? uncontrolledTemplate : controlledTemplate, {
        open: JSON.stringify(args.open ?? args.defaultOpen ?? false),
        triggerLabel: JSON.stringify(args.triggerLabel),
        triggerDelay: JSON.stringify(args.triggerDelay),
        closeDelay: JSON.stringify(args.closeDelay),
        contentWidth: JSON.stringify(args.contentWidth),
        contentText: JSON.stringify(args.contentText),
    })
