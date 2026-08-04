/**
 * IconRegistry — maps semantic names to Iconify identifiers used across the UI kit.
 *
 * Iconify format: "<set>:<icon>"
 * Browse available sets at https://icon-sets.iconify.design/
 *
 * Conventions:
 *  - camelCase for keys → arrowRight, not arrow-right
 *  - Group by functional domain when the registry grows
 *  - Prefer the Lucide set for visual consistency
 */
export const NavigationIcons = {
    close: 'lucide:x',
    chevronLeft: 'lucide:chevron-left',
    chevronRight: 'lucide:chevron-right',
    chevronUp: 'lucide:chevron-up',
    chevronDown: 'lucide:chevron-down',
    ellipsisVertical: 'lucide:ellipsis-vertical',
    ellipsisHorizontal: 'lucide:ellipsis',
} as const

export const FeedbackIcons = {
    info: 'lucide:info',
    success: 'lucide:circle-check',
    warning: 'lucide:triangle-alert',
    error: 'lucide:circle-x',
} as const

export const FormIcons = {
    check: 'lucide:check',
    minus: 'lucide:minus',
    radioIndicator: 'mdi:circle',
    eye: 'lucide:eye',
    eyeOff: 'lucide:eye-off',
    calendar: 'lucide:calendar',
    search: 'lucide:search',
    mail: 'lucide:mail',
    message: 'lucide:message-square',
    pencil: 'lucide:pencil',
} as const

export const DataIcons = {
    sort: 'lucide:arrow-up-down',
    sortAsc: 'lucide:arrow-up',
    sortDesc: 'lucide:arrow-down',
} as const

export const ActionIcons = {
    clipboard: 'lucide:clipboard',
    clipboardList: 'lucide:clipboard-list',
    trash: 'lucide:trash-2',
    user: 'lucide:user',
    userPlus: 'lucide:user-plus',
    settings: 'lucide:settings',
    logOut: 'lucide:log-out',
    cloudOff: 'lucide:cloud-off',
    creditCard: 'lucide:credit-card',
    home: 'lucide:home',
    mail: 'lucide:mail',
    bell: 'lucide:bell',
} as const

export const IconRegistry = {
    ...NavigationIcons,
    ...FeedbackIcons,
    ...FormIcons,
    ...DataIcons,
    ...ActionIcons,
} as const

export type IconName = keyof typeof IconRegistry
