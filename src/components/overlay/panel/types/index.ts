import type { FC } from 'react'

import type DialogBody from '@components/overlay/dialog/components/dialog-body/DialogBody.tsx'
import type DialogClose from '@components/overlay/dialog/components/dialog-close/DialogClose.tsx'
import type DialogDescription from '@components/overlay/dialog/components/dialog-description/DialogDescription.tsx'
import type DialogFooter from '@components/overlay/dialog/components/dialog-footer/DialogFooter.tsx'
import type PanelContent from '@components/overlay/panel/components/panel-content/PanelContent.tsx'
import type PanelHeader from '@components/overlay/panel/components/panel-header/PanelHeader.tsx'
import type DialogTitle from '@components/overlay/dialog/components/dialog-title/DialogTitle.tsx'
import type DialogTrigger from '@components/overlay/dialog/components/dialog-trigger/DialogTrigger.tsx'
import type { PanelProps } from '@components/overlay/panel/types/Panel.props.ts'

export type PanelCompound = FC<PanelProps> & {
  Trigger: typeof DialogTrigger;
  Content: typeof PanelContent;
  Header: typeof PanelHeader;
  Body: typeof DialogBody;
  Footer: typeof DialogFooter;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
  Close: typeof DialogClose;
};

export type { PanelProps } from '@components/overlay/panel/types/Panel.props.ts'
export type {
    PanelPosition,
} from '@components/overlay/panel/types/Panel.types.ts'
