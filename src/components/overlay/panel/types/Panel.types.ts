import { PANEL_POSITIONS } from '@components/overlay/panel/constants'

export type PanelPosition =
  (typeof PANEL_POSITIONS)[keyof typeof PANEL_POSITIONS];
