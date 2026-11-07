import { style } from '@vanilla-extract/css'
import { vars } from '@theme/styles/contract/contract.css.ts'

const root = style({ width: '100%' })

const input = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.space[8],
    textAlign: 'start',
    cursor: 'pointer',
    selectors: {
        '&:focus-visible': {
            outline: `2px solid ${vars.color.focusRing}`,
            outlineOffset: '2px',
        },
    },
})

const segment = style({ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })

const calendar = style({ selectors: { '&&': { border: 'none' } } })

const requiredDescription = style({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    border: 0,
})

/** Public date-picker styling hooks. */
export const DATE_PICKER_STYLES = { root, input, segment, calendar, requiredDescription }
