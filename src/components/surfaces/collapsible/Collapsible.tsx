import { memo, type FC } from 'react'

import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import CollapsiblePanel from '@components/surfaces/collapsible/components/collapsible-panel/CollapsiblePanel.tsx'
import CollapsibleTrigger from '@components/surfaces/collapsible/components/collapsible-trigger/CollapsibleTrigger.tsx'
import { COLLAPSIBLE_STYLES } from '@components/surfaces/collapsible/Collapsible.css.ts'
import type { CollapsibleProps } from '@components/surfaces/collapsible/types'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'

/**
 * Collapsible panel/trigger compound backed by Base UI Collapsible. Expands
 * and collapses its panel with animated height. Defaults to `width: 100%`.
 *
 * Compose `Collapsible.Trigger` and `Collapsible.Panel` inside the root.
 * The default is closed; use `open` and `onOpenChange` for controlled state
 * or `defaultOpen` for uncontrolled state. A string className styles the outer
 * wrapper; a state-dependent className styles the root. Other native props and
 * the ref are forwarded to the root element.
 * @param props - Root options and forwarded attributes.
 * @param props.className - Wrapper class or state-dependent root class.
 * @param props.width - Outer width; defaults to 100%.
 * @returns The collapsible composition.
 * @example
 * ```tsx
 * <Collapsible defaultOpen>
 *   <Collapsible.Trigger label="Details" />
 *   <Collapsible.Panel>Content</Collapsible.Panel>
 * </Collapsible>
 * ```
 */
const CollapsibleRoot: FC<CollapsibleProps> = memo(({ className, width, ...props }) => (
    <Flex
        flexDirection={'column'}
        alignItems={'stretch'}
        width={width ?? '100%'}
        gap={0}
        className={typeof className === 'function' ? undefined : className}
    >
        <BaseCollapsible.Root
            className={typeof className === 'function'
                ? (state) => cn(COLLAPSIBLE_STYLES.root, className(state))
                : COLLAPSIBLE_STYLES.root}
            {...props}
        />
    </Flex>
))

CollapsibleRoot.displayName = 'Collapsible'

/**
 * Collapsible root with Trigger and Panel composition slots.
 * @example
 * <Collapsible><Collapsible.Trigger label="Details" /><Collapsible.Panel>Content</Collapsible.Panel></Collapsible>
 */
const Collapsible = Object.assign(CollapsibleRoot, {
    Trigger: CollapsibleTrigger,
    Panel: CollapsiblePanel,
})

export default Collapsible
