import type {
    STATUS_BADGE_POSITIONS,
    STATUS_BADGE_SIZES,
} from '@components/data-display/status-badge/constants'

/** Corner positions supported by the StatusBadge component. */
export type StatusBadgePosition =
  (typeof STATUS_BADGE_POSITIONS)[keyof typeof STATUS_BADGE_POSITIONS];

/** Size variants for the StatusBadge component. Defaults to `md`. */
export type StatusBadgeSize =
  (typeof STATUS_BADGE_SIZES)[keyof typeof STATUS_BADGE_SIZES];
