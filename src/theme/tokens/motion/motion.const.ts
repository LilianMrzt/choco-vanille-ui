/*
 * Motion tokens — durations and easing curves for consistent, tasteful
 * animations across the kit. Theme-agnostic.
 */

export const DURATION = {
    instant: '0ms',
    fast: '100ms',
    normal: '150ms',
    moderate: '200ms',
    slow: '300ms',
    slower: '500ms',
} as const

export const EASING = {
    /* Standard material-like ease for most UI transitions. */
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    /* Decelerate — entering elements. */
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    /* Accelerate — exiting elements. */
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    /* A subtle spring-like overshoot for playful interactions. */
    emphasized: 'cubic-bezier(0.2, 0, 0, 1.2)',
    linear: 'linear',
} as const
