import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, useId, useMemo, useState } from 'react'

import { PanelContext } from '@components/overlay/panel/context/Panel.context.ts'
import DialogBody from '@components/overlay/dialog/components/dialog-body/DialogBody.tsx'
import DialogClose from '@components/overlay/dialog/components/dialog-close/DialogClose.tsx'
import DialogDescription from '@components/overlay/dialog/components/dialog-description/DialogDescription.tsx'
import DialogFooter from '@components/overlay/dialog/components/dialog-footer/DialogFooter.tsx'
import DialogTitle from '@components/overlay/dialog/components/dialog-title/DialogTitle.tsx'
import DialogTrigger from '@components/overlay/dialog/components/dialog-trigger/DialogTrigger.tsx'
import PanelContent from '@components/overlay/panel/components/panel-content/PanelContent.tsx'
import PanelHeader from '@components/overlay/panel/components/panel-header/PanelHeader.tsx'
import type {
    PanelCompound,
    PanelProps,
} from '@components/overlay/panel/types'

const Panel = memo<PanelProps>((props) => {
    const titleId = useId()
    const [hasTitle, setHasTitle] = useState(false)
    const contextValue = useMemo(
        () => ({ titleId, hasTitle, setHasTitle }),
        [hasTitle, titleId],
    )

    return (
        <PanelContext.Provider value={contextValue}>
            <BaseDialog.Root {...props} />
        </PanelContext.Provider>
    )
}) as unknown as PanelCompound

Panel.displayName = 'Panel'
Panel.Trigger = DialogTrigger
Panel.Content = PanelContent
Panel.Header = PanelHeader
Panel.Body = DialogBody
Panel.Footer = DialogFooter
Panel.Title = DialogTitle
Panel.Description = DialogDescription
Panel.Close = DialogClose

export { Panel }
