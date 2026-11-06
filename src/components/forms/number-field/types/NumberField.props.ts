import type { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import type * as React from 'react'
import type { RefAttributes } from 'react'

import type { NumberFieldSize } from '@components/forms/number-field/types/NumberField.types.ts'
import type { TypographySize } from '@components/foundation/typography/types'

type NumberFieldRootProps = Pick<
  BaseNumberField.Root.Props,
  | 'allowOutOfRange'
  | 'allowWheelScrub'
  | 'defaultValue'
  | 'format'
  | 'largeStep'
  | 'locale'
  | 'max'
  | 'min'
  | 'onValueChange'
  | 'onValueCommitted'
  | 'readOnly'
  | 'smallStep'
  | 'snapOnStep'
  | 'step'
  | 'value'
>;

export type NumberFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'defaultValue'
  | 'disabled'
  | 'form'
  | 'id'
  | 'max'
  | 'min'
  | 'name'
  | 'readOnly'
  | 'required'
  | 'size'
  | 'step'
  | 'type'
  | 'value'
> &
  RefAttributes<HTMLInputElement> &
  NumberFieldRootProps & {
    /** Input size. @default 'md' */
    size?: NumberFieldSize;
    /** Font size applied to the label and input text. @default 'md' */
    fontSize?: TypographySize;
    /** Text label rendered above the input, linked to the number input. */
    label?: string;
    /** Helper text rendered below the input. Hidden when `error` is provided. */
    helperText?: string;
    /** Error message rendered below the input and exposed through `aria-invalid`. */
    error?: string;
    /** CSS width of the outer wrapper. Defaults to `100%`. */
    width?: React.CSSProperties['width'];
    /** Identifies the input when the field is submitted. */
    name?: string;
    /** Identifies the form that owns the field. */
    form?: string;
    /** Whether the field is disabled. */
    disabled?: boolean;
    /** Whether the field is required. */
    required?: boolean;
    /** Whether the field is read-only. */
    readOnly?: boolean;
    /** HTML id linked to the visible label. */
    id?: string;
  };
