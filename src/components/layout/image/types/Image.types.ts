/** Object-fit values supported by the Image component. */
export type ImageObjectFit =
  | 'contain'
  | 'cover'
  | 'fill'
  | 'none'
  | 'scale-down';

/** Object-position values supported by the Image component. */
export type ImageObjectPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

/** Spacing tokens supported by the Image component's recipe. */
export type ImageSpace =
  | 'none'
  | 'px'
  | 'xxs'
  | 'xs'
  | 'xs2'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';

/** Margin tokens supported by the Image component's recipe. */
export type ImageMargin = 'auto' | ImageSpace;
