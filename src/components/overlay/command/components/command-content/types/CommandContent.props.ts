import type { Dialog } from '@base-ui/react/dialog'

import type { CommandSize } from '@components/overlay/command/types/Command.types.ts'

/** Props for `Command.Content`. */
export type CommandContentProps = Omit<Dialog.Popup.Props, 'children'> & {
    /**
     * Width preset for the command panel.
     * @default 'md'
     */
    size?: CommandSize
    /**
     * Accessible name used when neither `aria-label` nor `aria-labelledby` is
     * provided. Override this for i18n.
     * @default 'Command palette'
     */
    defaultAriaLabel?: string
    children?: React.ReactNode
}
