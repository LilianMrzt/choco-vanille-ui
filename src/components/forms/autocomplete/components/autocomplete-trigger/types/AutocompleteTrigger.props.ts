import type { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import type { DataAttributes } from '@/types/DataAttributes.ts'

/** Props for the styled autocomplete trigger button. */
export type AutocompleteTriggerProps = BaseAutocomplete.Trigger.Props & DataAttributes
