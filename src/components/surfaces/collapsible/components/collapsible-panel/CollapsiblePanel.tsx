import { memo, type FC } from 'react'

import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import { COLLAPSIBLE_PANEL_STYLES } from '@components/surfaces/collapsible/components/collapsible-panel/CollapsiblePanel.css.ts'
import type { CollapsiblePanelProps } from '@components/surfaces/collapsible/components/collapsible-panel/types'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { cn } from '@utils/cn.ts'

/**
 * Animated content panel slot for `Collapsible` backed by Base UI
 * Collapsible.Panel. Content is kept in the DOM by default (`keepMounted`).
 * Accepts a `padding` token applied as `paddingBottom`. Attributes and ref
 * are forwarded to the panel. Consumer styles override the padding.
 * @param props - Panel options and forwarded attributes.
 * @param props.className - Additional class or state-dependent class function.
 * @param props.padding - Bottom spacing token; defaults to 12.
 * @param props.keepMounted - Keep closed content mounted; defaults to true.
 * @param props.children - Panel content.
 * @param props.style - Inline style or state-dependent style function.
 * @returns The collapsible panel.
 * @example
 * <Collapsible.Panel>Details</Collapsible.Panel>
 */
const CollapsiblePanel: FC<CollapsiblePanelProps> = memo(({
    className,
    padding = 12,
    keepMounted = true,
    children,
    style,
    ...props
}) => (
    <BaseCollapsible.Panel
        keepMounted={keepMounted}
        className={typeof className === 'function'
            ? (state) => cn(COLLAPSIBLE_PANEL_STYLES.root, className(state))
            : cn(COLLAPSIBLE_PANEL_STYLES.root, className)}
        style={typeof style === 'function'
            ? (state) => ({ paddingBottom: vars.space[padding], ...style(state) })
            : { paddingBottom: vars.space[padding], ...style }}
        {...props}
    >
        <div className={COLLAPSIBLE_PANEL_STYLES.inner}>{children}</div>
    </BaseCollapsible.Panel>
))

CollapsiblePanel.displayName = 'Collapsible.Panel'

export default CollapsiblePanel
