import * as React from 'react';

import type { TypographyProps } from './types/Typography.props.ts';
import { useTypography } from './hooks/useTypography.hook.ts';

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as, variant, fontSize, fontWeight, ellipsis, className, ...props }, ref) => {
    const { element: Element, resolvedClassName } = useTypography({
      as,
      variant,
      fontSize,
      fontWeight,
      ellipsis,
      className,
    });

    return (
      <Element
        ref={ref}
        className={resolvedClassName}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';
