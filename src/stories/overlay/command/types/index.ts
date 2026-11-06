import type { ComponentProps } from 'react'
import type { Command, CommandSize } from '@components/overlay/command'

export type CommandPlaygroundArgs = ComponentProps<typeof Command> & {
  size?: CommandSize;
  inputPlaceholder?: string;
  inputClearAriaLabel?: string;
  showGroup1?: boolean;
  showGroup2?: boolean;
  showIcons?: boolean;
  showShortcuts?: boolean;
};
