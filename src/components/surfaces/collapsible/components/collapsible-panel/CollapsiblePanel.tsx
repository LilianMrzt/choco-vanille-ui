import { memo, type FC } from 'react'

import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import { COLLAPSIBLE_PANEL_STYLES } from '@components/surfaces/collapsible/components/collapsible-panel/styles/CollapsiblePanel.css.ts'
import type { CollapsiblePanelProps } from '@components/surfaces/collapsible/components/collapsible-panel/types/CollapsiblePanel.props.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { cn } from '@utils/cn.ts'

/**
 * Animated content panel slot for `Collapsible` backed by Base UI
 * Collapsible.Panel. Content is kept in the DOM by default (`keepMounted`).
 * Accepts a `padding` token applied as `paddingBottom`.
 */
const CollapsiblePanel: FC<CollapsiblePanelProps> = memo(({
    className,
    padding = 12,
    keepMounted = true,
    children,
    ...props
}) => (
    <BaseCollapsible.Panel
        keepMounted={keepMounted}
        className={cn(COLLAPSIBLE_PANEL_STYLES.root, className)}
        style={{ paddingBottom: vars.space[padding] }}
        {...props}
    >
        <div className={COLLAPSIBLE_PANEL_STYLES.inner}>{children}</div>
    </BaseCollapsible.Panel>
))

CollapsiblePanel.displayName = 'Collapsible.Panel'

export default CollapsiblePanel
