import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { AvatarStoryArgs } from '@stories/data-display/avatar/types'
import sourceTemplate from '@stories/data-display/avatar/utils/create-avatar-compound-source/sources/createAvatarCompoundSource.source.txt?raw'
import statusTemplate from '@stories/data-display/avatar/utils/create-avatar-compound-source/sources/AvatarStatus.source.txt?raw'
import { createAvatarSource } from '@stories/data-display/avatar/utils/create-avatar-source/createAvatarSource.utils'

export const createAvatarCompoundSource = (_source: string, { args }: Readonly<{ args: AvatarStoryArgs }>): string => {
    const rootSource = createAvatarSource({
        'aria-label': args.compoundLabel,
        'aria-labelledby': args['aria-labelledby'],
        color: args.color,
        shape: args.shape,
        size: args.size,
        variant: args.variant,
        className: args.className,
        style: args.style,
        role: args.role,
        onClick: args.onClick,
    }).replace(/<Avatar(?=\s|>)/, '<Avatar.Root').replace('/>', '>')
    const statusSource = args.compoundStatus
        ? '\n    ' + renderSource(statusTemplate, {
            status: JSON.stringify(args.compoundStatus),
            size: JSON.stringify(args.statusSize ?? args.size) ?? 'undefined',
            label: JSON.stringify(args.statusLabel) ?? 'undefined',
        })
        : ''
    const imageHandler = args.onLoadingStatusChange
        ? ' onLoadingStatusChange={(status) => { /* Handle image status */ }}'
        : ''

    return renderSource(sourceTemplate, {
        rootSource,
        image: JSON.stringify(args.compoundImage) ?? 'undefined',
        alt: JSON.stringify(args.compoundAlt) ?? 'undefined',
        imageHandler,
        fallback: JSON.stringify(args.compoundFallback) ?? 'undefined',
        size: JSON.stringify(args.size) ?? 'undefined',
        delay: JSON.stringify(args.fallbackDelay) ?? 'undefined',
        statusSource,
    })
}
