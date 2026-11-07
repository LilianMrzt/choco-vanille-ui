import type { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import type { FC } from 'react'

import type CheckboxRoot from '@components/forms/checkbox/components/checkbox-root/CheckboxRoot.tsx'
import type CheckboxIndicator from '@components/forms/checkbox/components/checkbox-indicator/CheckboxIndicator.tsx'

/** Props for the interactive checkbox and its hidden form input. */
export type CheckboxRootProps = Readonly<BaseCheckbox.Root.Props>

/** Props for the checked or indeterminate indicator. */
export type CheckboxIndicatorProps = Readonly<BaseCheckbox.Indicator.Props>

/** Convenience checkbox with optional label and supporting text. */
export type CheckboxProps = Readonly<CheckboxRootProps & {
    /** Visible text associated with the checkbox. */
    label?: string
    /** Supporting text, replaced by an error when present. */
    helperText?: string
    /** Error message associated with the checkbox. */
    error?: string
}>

/** Convenience checkbox and its independently composable slots. */
export type CheckboxCompound = FC<CheckboxProps> & Readonly<{
    Root: typeof CheckboxRoot
    Indicator: typeof CheckboxIndicator
}>
