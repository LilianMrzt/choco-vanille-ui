import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, useId, useMemo, useState, type FC } from 'react'

import { PanelContext } from '@components/overlay/panel/context/Panel.context.ts'
import DialogBody from '@components/overlay/dialog/components/dialog-body/DialogBody.tsx'
import DialogClose from '@components/overlay/dialog/components/dialog-close/DialogClose.tsx'
import DialogDescription from '@components/overlay/dialog/components/dialog-description/DialogDescription.tsx'
import DialogFooter from '@components/overlay/dialog/components/dialog-footer/DialogFooter.tsx'
import DialogTitle from '@components/overlay/dialog/components/dialog-title/DialogTitle.tsx'
import DialogTrigger from '@components/overlay/dialog/components/dialog-trigger/DialogTrigger.tsx'
import PanelContent from '@components/overlay/panel/components/panel-content/PanelContent.tsx'
import PanelHeader from '@components/overlay/panel/components/panel-header/PanelHeader.tsx'
import type { PanelProps } from '@components/overlay/panel/types'

/**
 * Slide-in side panel backed by Base UI Dialog. Manages an auto-generated
 * `titleId` and tracks whether `Panel.Header` has rendered a title for
 * automatic `aria-labelledby`.
 *
 * Compound slots: `Panel.Trigger`, `.Content`, `.Header`, `.Body`,
 * `.Footer`, `.Title`, `.Description`, `.Close`.
 * @param props - Dialog state, callbacks and panel options.
 * @param props.withBackdrop - Whether to render a backdrop; defaults to `true`.
 * @returns The panel root.
 * @example
 * <Panel><Panel.Content aria-label="Settings" /></Panel>
 */
const PanelRoot: FC<PanelProps> = memo(({ withBackdrop = true, ...props }) => {
    const titleId = useId()
    const [hasTitle, setHasTitle] = useState(false)
    const contextValue = useMemo(
        () => ({ titleId, hasTitle, withBackdrop, setHasTitle }),
        [hasTitle, titleId, withBackdrop],
    )

    return (
        <PanelContext.Provider value={contextValue}>
            <BaseDialog.Root {...props} />
        </PanelContext.Provider>
    )
})

PanelRoot.displayName = 'Panel'

/**
 * Side panel root with namespaced trigger, content and section slots.
 * Provide a localized accessible name and a close control.
 * @example
 * <Panel><Panel.Content aria-label="Settings" /></Panel>
 */
const Panel = Object.assign(PanelRoot, {
    Trigger: DialogTrigger,
    Content: PanelContent,
    Header: PanelHeader,
    Body: DialogBody,
    Footer: DialogFooter,
    Title: DialogTitle,
    Description: DialogDescription,
    Close: DialogClose,
})

export default Panel
