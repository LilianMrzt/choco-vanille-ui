/**
 * IconRegistry — maps semantic names to Iconify identifiers used across the UI kit.
 *
 * Iconify format: "<set>:<icon>"
 * Browse available sets at https://icon-sets.iconify.design/
 *
 * Conventions:
 *  - camelCase for keys → arrowRight, not arrow-right
 *  - Group by functional domain when the registry grows
 */
export const NavigationIcons = {
    close: 'lucide:x',
} as const

export const FeedbackIcons = {
    info: 'lucide:info',
    success: 'lucide:circle-check',
    warning: 'lucide:triangle-alert',
    error: 'lucide:circle-x',
} as const

export const IconRegistry = {
    ...NavigationIcons,
    ...FeedbackIcons,
} as const

export type IconName = keyof typeof IconRegistry
