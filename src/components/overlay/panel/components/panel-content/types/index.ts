import type { Dialog } from '@base-ui/react/dialog'

import type { PanelPosition } from '@components/overlay/panel/types'

/** Props for `Panel.Content`. */
export type PanelContentProps = Readonly<Dialog.Popup.Props & {
  /** CSS width of the panel. @default '33.333vw' */
  width?: string;
  /** Side the panel attaches to. @default 'right' */
  position?: PanelPosition;
  /**
   * Accessible name used when neither `aria-label` nor `aria-labelledby` is
   * provided. Override this for i18n. @default 'Panel'
   */
  defaultAriaLabel?: string;
}>
