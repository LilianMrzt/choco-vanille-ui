import { type ComponentProps } from 'react'
import { RadioGroup } from '@/components/forms/radio-group'

export type RadioGroupPlaygroundArgs = ComponentProps<typeof RadioGroup> & {
  labelOne?: string;
  labelTwo?: string;
  labelThree?: string;
};
