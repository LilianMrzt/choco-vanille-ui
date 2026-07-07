import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import { COLLAPSIBLE_PANEL_STYLES } from '@components/surfaces/collapsible/components/collapsible-panel/styles/CollapsiblePanel.css.ts'
import type { CollapsiblePanelProps } from '@components/surfaces/collapsible/components/collapsible-panel/types/CollapsiblePanel.props.ts'
import { vars } from '@theme/contract.css.ts'
import { cn } from '@utils/cn.ts'

const CollapsiblePanel = ({
    className,
    padding = 'md',
    keepMounted = true,
    children,
    ...props
}: CollapsiblePanelProps) => (
    <BaseCollapsible.Panel
        keepMounted={keepMounted}
        className={cn(COLLAPSIBLE_PANEL_STYLES.root, className)}
        style={{ paddingBottom: vars.space[padding] }}
        {...props}
    >
        <div className={COLLAPSIBLE_PANEL_STYLES.inner}>{children}</div>
    </BaseCollapsible.Panel>
)

CollapsiblePanel.displayName = 'Collapsible.Panel'

export default CollapsiblePanel
