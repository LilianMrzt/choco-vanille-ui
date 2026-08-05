import type { FC } from 'react'

import type CommandContent from '@components/overlay/command/components/command-content/CommandContent.tsx'
import type CommandEmpty from '@components/overlay/command/components/command-empty/CommandEmpty.tsx'
import type CommandGroup from '@components/overlay/command/components/command-group/CommandGroup.tsx'
import type CommandInput from '@components/overlay/command/components/command-input/CommandInput.tsx'
import type CommandItem from '@components/overlay/command/components/command-item/CommandItem.tsx'
import type CommandList from '@components/overlay/command/components/command-list/CommandList.tsx'
import type CommandSeparator from '@components/overlay/command/components/command-separator/CommandSeparator.tsx'
import type CommandTrigger from '@components/overlay/command/components/command-trigger/CommandTrigger.tsx'
import type { CommandProps } from '@components/overlay/command/types/Command.props.ts'

export type CommandCompound = FC<CommandProps> & {
    Trigger: typeof CommandTrigger
    Content: typeof CommandContent
    Input: typeof CommandInput
    List: typeof CommandList
    Group: typeof CommandGroup
    Item: typeof CommandItem
    Empty: typeof CommandEmpty
    Separator: typeof CommandSeparator
}
