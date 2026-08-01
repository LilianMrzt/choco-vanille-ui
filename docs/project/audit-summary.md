# Design system dataset

Generated at 2026-08-01T13:01:15.912Z.

## Composants

- Publics : 101
- Internes : 48
- Racines : 52
- Composés : 49

## Index de faits

- Props personnalisées : 86
- Variantes : 36

## Encapsulation d'API

- Fuites d'implémentation signalées : 2
- Bases de props couplées à des styles Vanilla Extract : 19
- Signaux architecturaux : 2

### Fuites d'implémentation

Types techniques exposés dans des props publiques :

- `Flex.inline` : RecipeVariants detected
- `Grid.columns` : RecipeVariants detected

### Bases Vanilla Extract exposées aux consommateurs

- `Box` : `BoxProps` inclut `BoxRecipeVariants` depuis `@components/layout/box/styles/Box.css.ts`
- `Button` : `ButtonProps` inclut `ButtonRecipeVariants` depuis `@components/actions/button/styles/Button.css.ts`
- `Flex` : `FlexProps` inclut `FlexRecipeVariants` depuis `@components/layout/flex/styles/Flex.css.ts`
- `Grid` : `GridProps` inclut `GridRecipeVariants` depuis `@components/layout/grid/styles/Grid.css.ts`
- `Icon` : `IconProps` inclut `IconRecipeVariants` depuis `@components/foundation/icon/styles/Icon.css.ts`
- `IconButton` : `IconButtonProps` inclut `IconButtonRecipeVariants` depuis `@components/actions/icon-button/styles/IconButton.css.ts`
- `Image` : `ImageProps` inclut `ImageRecipeVariants` depuis `@components/layout/image/styles/Image.css.ts`
- `Separator` : `SeparatorProps` inclut `SeparatorRecipeVariants` depuis `@components/layout/separator/styles/Separator.css.ts`
- `Skeleton` : `SkeletonProps` inclut `SkeletonRecipeVariants` depuis `@components/feedback/skeleton/styles/Skeleton.css.ts`
- `Table` : `TableProps` inclut `TableRecipeVariants` depuis `@components/data-display/table/styles/Table.css.ts`
- `TableCell` : `TableCellProps` inclut `TableCellRecipeVariants` depuis `@components/data-display/table/components/table-cell/styles/TableCell.css.ts`
- `TableHead` : `TableHeadProps` inclut `TableHeadRecipeVariants` depuis `@components/data-display/table/components/table-head/styles/TableHead.css.ts`
- `TableRow` : `TableRowProps` inclut `TableRowRecipeVariants` depuis `@components/data-display/table/components/table-row/styles/TableRow.css.ts`
- `TextArea` : `TextAreaProps` inclut `TextAreaRecipeVariants` depuis `@components/forms/text-area/styles/TextArea.css.ts`
- `TextField` : `TextFieldProps` inclut `TextFieldInputRecipeVariants` depuis `@components/forms/text-field/styles/TextField.css.ts`
- `Toast` : `ToastProps` inclut `ToastRecipeVariants` depuis `@components/feedback/toast/styles/Toast.css.ts`
- `ToggleButton` : `ToggleButtonProps` inclut `ToggleButtonRecipeVariants` depuis `@components/actions/toggle-button/styles/ToggleButton.css.ts`
- `ToggleIconButton` : `ToggleIconButtonProps` inclut `ToggleIconButtonRecipeVariants` depuis `@components/actions/toggle-icon-button/styles/ToggleIconButton.css.ts`
- `Typography` : `TypographyProps` inclut `TypographyRecipeVariants` depuis `@components/foundation/typography/styles/Typography.css.ts`

### Signaux architecturaux

Ces rapprochements suggèrent des noms à harmoniser ; ils ne constituent pas des erreurs.

- Variantes similaires : `contained` et `solid` (confiance : 95 %)
- Variantes similaires : `outline` et `outlined` (confiance : 98 %)

