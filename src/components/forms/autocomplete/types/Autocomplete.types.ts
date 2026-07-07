import type { FC } from 'react'
import type { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import type { AutocompleteInputProps } from '@components/forms/autocomplete/components/autocomplete-input/types/AutocompleteInput.props.ts'
import type { AutocompleteTriggerProps } from '@components/forms/autocomplete/components/autocomplete-trigger/types/AutocompleteTrigger.props.ts'
import type { AutocompleteContentProps } from '@components/forms/autocomplete/components/autocomplete-content/types/AutocompleteContent.props.ts'

type AutocompleteRoot = FC<BaseAutocomplete.Root.Props<any>>

export type AutocompleteCompound = AutocompleteRoot & {
    Input: FC<AutocompleteInputProps>
    Trigger: FC<AutocompleteTriggerProps>
    Content: FC<AutocompleteContentProps>
    InputGroup: FC<BaseAutocomplete.InputGroup.Props>
    Icon: FC<BaseAutocomplete.Icon.Props>
    Clear: FC<BaseAutocomplete.Clear.Props>
    Portal: FC<BaseAutocomplete.Portal.Props>
    Backdrop: FC<BaseAutocomplete.Backdrop.Props>
    Positioner: FC<BaseAutocomplete.Positioner.Props>
    Popup: FC<BaseAutocomplete.Popup.Props>
    Arrow: FC<BaseAutocomplete.Arrow.Props>
    List: FC<BaseAutocomplete.List.Props>
    Group: FC<BaseAutocomplete.Group.Props>
    GroupLabel: FC<BaseAutocomplete.GroupLabel.Props>
    Item: FC<BaseAutocomplete.Item.Props>
    Empty: FC<BaseAutocomplete.Empty.Props>
    Separator: FC<BaseAutocomplete.Separator.Props>
    Status: FC<BaseAutocomplete.Status.Props>
    Collection: FC<BaseAutocomplete.Collection.Props>
}
