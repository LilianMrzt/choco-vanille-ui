# Audit ciblé des composants

Seuls les composants nécessitant une intervention sont détaillés. Pour tous
les composants absents de ce document :

**DECISION = Conserver.**

# TypesPublicsVanillaExtract

## Observations

- Le rapport généré recense les props publiques dont la base est importée
  depuis un fichier `styles/*.css.ts` sous la règle
  `public-vanilla-extract-type`
  (`docs/audit/audit-findings.json`).
- Les formes observées sont des intersections complètes
  (`ButtonProps & ButtonRecipeVariants`), des sélections
  (`Pick<TextFieldInputRecipeVariants, 'size'>`) et des accès par propriété
  (`BoxRecipeVariants['padding']`).
- Ces formes donnent aujourd'hui les bonnes unions, mais la direction de
  dépendance est inversée : la Consumer API dépend de la recette Vanilla
  Extract.
- Un changement de moteur de styles ou de structure de recette peut donc
  modifier les déclarations publiques sans changement fonctionnel du
  composant.

## Conclusions

La librairie n'est pas autosuffisante au niveau de ses types publics. Les
vocabulaire de variants, tailles, couleurs et tokens doivent appartenir au
Design System ; Vanilla Extract doit les consommer et non les définir.

## Décision

**DECISION = Corriger systématiquement.**

## API cible

```ts
// constants/componentSizes.const.ts
export const COMPONENT_SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
} as const

// types/Component.types.ts
export type ComponentSize =
  (typeof COMPONENT_SIZES)[keyof typeof COMPONENT_SIZES]

// types/Component.props.ts
export type ComponentProps = {
  size?: ComponentSize
}

// styles/Component.css.ts
// La recette consomme COMPONENT_SIZES ; aucun type public ne l'importe.
```

Les types de tokens Box/Flex/Grid restent contraints, mais sont définis hors
des recettes.

## Tâches d'implémentation

1. Pour chaque constat `public-vanilla-extract-type`, identifier les axes
   publics réellement exposés.
2. Déplacer leurs valeurs canoniques dans `constants/` et leurs unions dans
   `types/`.
3. Faire consommer ces constantes/types par les recettes.
4. Retirer tout import `*.css.ts`, `RecipeVariants` ou type Vanilla Extract des
   fichiers publics `*.props.ts` et `*.types.ts`.
5. Ne pas modifier les valeurs acceptées, défauts ou styles pendant ce
   découplage.
6. Vérifier la déclaration générée et exécuter
   `audit:design-system:check`.

# Badge

## Observations

- Badge expose `solid`, `subtle`, `outline` et `outlinedSubtle`
  (`src/components/data-display/badge/constants/badgeVariants.const.ts:1-6`).
- Button et IconButton exposent `contained`, `outlined` et `ghost`
  (`src/components/actions/_shared/buttons/constants/buttonVariants.const.ts:1-5`).
- Les recettes `solid` et `contained` utilisent le même modèle observable :
  couleur d'intention en fond et foreground associé
  (`badge/styles/variants/contained.ts:10-15`,
  `actions/_shared/buttons/styles/variants/contained.ts:11-15`).
- `outline` et `outlined` désignent tous deux la variante bordée sans
  remplissage. Le choix de tokens de bordure reste propre à chaque famille.
- `outlinedSubtle` emploie déjà le préfixe `outlined`.

## Conclusions

Le consommateur doit mémoriser deux vocabulaires pour le même axe visuel. Les
actions représentent la convention majoritaire ; renommer uniquement deux
valeurs de Badge est le changement minimal.

## Décision

**DECISION = Standardiser.**

## API cible

```ts
type BadgeVariant =
  | 'contained'
  | 'subtle'
  | 'outlined'
  | 'outlinedSubtle'
```

Les styles produits ne changent pas.

## Tâches d'implémentation

1. Renommer `solid` en `contained` et `outline` en `outlined` dans
   `BADGE_VARIANTS`.
2. Renommer les clés de recette, fichiers et symboles associés sans modifier
   les déclarations CSS.
3. Mettre à jour les références de compilation, stories et tests concernés.
4. Vérifier que `BadgeVariant` n'expose plus l'ancien vocabulaire.

# Checkbox

## Observations

- `CheckboxProps` hérite du callback Base UI
  `onCheckedChange(checked, eventDetails)`.
- Le wrapper ne reçoit que `checked` et appelle le consommateur avec
  `{ reason: 'none' } as never`
  (`src/components/forms/checkbox/Checkbox.tsx:27-29`).
- `DropdownMenu.CheckboxItem` et RadioGroup transmettent leurs arguments Base
  UI réels ; le comportement de Checkbox est donc une exception.

## Conclusions

Le type public annonce des détails d'événement que le runtime falsifie. Un
consommateur ne peut pas distinguer une interaction clavier, pointeur ou
programmatique.

## Décision

**DECISION = Corriger.**

## API cible

La signature publique ne change pas. Le callback reçoit exactement les
arguments fournis par `BaseCheckbox.Root`.

```ts
onCheckedChange?: BaseCheckbox.Root.Props['onCheckedChange']
```

## Tâches d'implémentation

1. Faire accepter au handler les deux arguments Base UI.
2. Transmettre `checked` et `eventDetails` sans reconstruction ni cast.
3. Ajouter un test vérifiant la raison d'un changement réel.

# Switch

## Observations

- `SwitchProps` hérite du callback Base UI
  `onCheckedChange(checked, eventDetails)`.
- Le wrapper remplace les détails réels par
  `{ reason: 'none' } as never`
  (`src/components/forms/switch/Switch.tsx:28-30`).
- La documentation du composant présente explicitement les modes contrôlé et
  non contrôlé (`Switch.tsx:11-20`).

## Conclusions

La surface TypeScript est correcte, mais le comportement observable ne
respecte pas le contrat.

## Décision

**DECISION = Corriger.**

## API cible

La signature publique ne change pas. `Switch` transmet le callback Base UI
sans modifier ses arguments.

## Tâches d'implémentation

1. Accepter les deux arguments du callback `BaseSwitch.Root`.
2. Supprimer l'objet synthétique et le cast `as never`.
3. Tester la transmission des détails d'événement.

# Tooltip

## Observations

- Tooltip expose `open` et `onOpenChange`, mais pas `defaultOpen`
  (`src/components/overlay/tooltip/types/Tooltip.props.ts:26-29`).
- Le composant possède déjà un état interne initialisé à `false`
  (`src/components/overlay/tooltip/hooks/use-tooltip/useTooltip.hook.ts:11-12`).
- Dialog, Drawer, Popover, HoverCard, DropdownMenu et Collapsible exposent le
  triplet `open/defaultOpen/onOpenChange`, directement ou par héritage Base
  UI.

## Conclusions

Le mode uncontrolled existe, mais son état initial n'est pas configurable.
Tooltip est l'exception à une convention publique stable.

## Décision

**DECISION = Standardiser.**

## API cible

```ts
type TooltipProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  // props existantes
}
```

`defaultOpen` n'est lu qu'à l'initialisation de l'état uncontrolled.

## Tâches d'implémentation

1. Ajouter `defaultOpen?: boolean` à `TooltipProps` et `UseTooltipOptions`.
2. Transmettre la prop au hook.
3. Initialiser `internalOpen` avec `defaultOpen`.
4. Conserver la priorité de `open` en mode contrôlé et la fermeture forcée
   lorsque `disabled` vaut `true`.

# Avatar

## Observations

- `AvatarProps` se termine par `[key: string]: unknown`
  (`src/components/data-display/avatar/types/Avatar.props.ts:47-48`).
- Cette signature accepte toute faute de frappe et toute valeur, par exemple
  `onClik` ou une prop arbitraire.
- Le commentaire annonce seulement la transmission d'attributs HTML natifs.

## Conclusions

La signature est plus large que le comportement documenté et neutralise le
contrôle des propriétés excédentaires pour un composant public.

## Décision

**DECISION = Corriger.**

## API cible

`AvatarProps` doit partir des attributs du véritable élément racine, puis
réserver les clés remplacées par l'API du composant.

```ts
type AvatarProps =
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'color'> & {
    ref?: React.Ref<HTMLSpanElement>
    // props Avatar existantes
  }
```

## Tâches d'implémentation

1. Remplacer l'index signature par `React.HTMLAttributes<HTMLSpanElement>`.
2. Omettre explicitement les clés dont la sémantique est redéfinie.
3. Vérifier que les attributs `data-*`, ARIA et événements HTML restent
   acceptés.
4. Ajouter un cas de type négatif pour une prop inconnue.

# Autocomplete

## Observations

- Le root Base UI est générique et fournit des surcharges pour les listes
  plates, groupées et les valeurs objet.
- `AutocompleteCompound` réduit ce root à
  `FC<BaseAutocomplete.Root.Props<any>>`
  (`src/components/forms/autocomplete/types/Autocomplete.types.ts:8`).
- L'implémentation se présente comme l'exposition de l'API Base UI complète
  (`src/components/forms/autocomplete/Autocomplete.tsx:29-38`).

## Conclusions

`any` supprime l'inférence des items et de `onItemHighlighted`, alors que le
type exact du root Base UI est déjà disponible. Restreindre à `string`
réduirait inutilement l'API avancée.

## Décision

**DECISION = Corriger.**

## API cible

```ts
type AutocompleteRoot = typeof BaseAutocomplete.Root

export type AutocompleteCompound = AutocompleteRoot & {
  // slots existants
}
```

## Tâches d'implémentation

1. Remplacer `FC<BaseAutocomplete.Root.Props<any>>` par
   `typeof BaseAutocomplete.Root`.
2. Conserver les surcharges génériques lors du cast du composant composé.
3. Vérifier l'inférence avec une liste de chaînes et une liste d'objets.

# ToggleButton

## Observations

- `label` est optionnel et `children` est interdit
  (`src/components/actions/toggle-button/types/ToggleButton.props.ts:7-20`).
- Les icônes rendues par `Icon` sont décoratives en l'absence d'`aria-label`.
- `<ToggleButton startIcon="…" />` est donc valide en TypeScript mais peut
  produire un bouton sans nom accessible.
- `ToggleIconButton` existe précisément pour l'usage icône-seul et exige un
  `aria-label`.

## Conclusions

Deux composants couvrent le même usage, mais seul le composant dédié garantit
le contrat d'accessibilité. Le composant textuel doit suivre Button.

## Décision

**DECISION = Corriger.**

## API cible

```ts
type ToggleButtonProps = {
  label: string
  startIcon?: string
  endIcon?: string
  // props existantes
}
```

Pour un contrôle icône-seul, utiliser `ToggleIconButton`.

## Tâches d'implémentation

1. Rendre `label` obligatoire.
2. Mettre à jour les usages icône-seul vers `ToggleIconButton`.
3. Ajouter un cas de type négatif sans `label`.

# ToggleButtonGroup.Item

## Observations

- `label` est optionnel et `children` est interdit
  (`ToggleButtonGroupItem.props.ts:7-20`).
- `ToggleButtonGroup.IconItem` est déjà le composant dédié à l'usage
  icône-seul et impose un `aria-label`.

## Conclusions

`Item` doit représenter l'item textuel, `IconItem` l'item icône-seul. La
distinction existe déjà mais n'est pas imposée par le type.

## Décision

**DECISION = Corriger.**

## API cible

```ts
type ToggleButtonGroupItemProps = {
  label: string
  // props existantes
}
```

## Tâches d'implémentation

1. Rendre `label` obligatoire sur `ToggleButtonGroup.Item`.
2. Migrer les usages sans texte vers `ToggleButtonGroup.IconItem`.
3. Vérifier que `IconItem` conserve son `aria-label` obligatoire.

# Tabs.Trigger

## Observations

- `children` et `render` sont omis ; le contenu possible est donc limité à
  `label`, `startIcon` et `endIcon`
  (`src/components/navigation/tabs/components/tabs-trigger/types/TabsTrigger.props.ts:4-15`).
- `label` reste optionnel et les icônes sont décoratives.
- Le composant peut ainsi rendre un onglet vide ou icône-seul sans nom
  accessible (`TabsTrigger.tsx:17-49`).

## Conclusions

Tabs n'a pas de composant `IconTrigger` dédié. L'API doit garantir soit un
texte visible, soit un nom ARIA avec une icône visible.

## Décision

**DECISION = Corriger.**

## API cible

```ts
type TabsTriggerContent =
  | {
      label: string
      'aria-label'?: string
      startIcon?: string
      endIcon?: string
    }
  | (
      {
        label?: never
        'aria-label': string
      } & (
        | { startIcon: string; endIcon?: string }
        | { startIcon?: string; endIcon: string }
      )
    )
```

Cette union complète les props Base UI existantes.

## Tâches d'implémentation

1. Introduire l'union de contenu accessible dans `TabsTriggerProps`.
2. Conserver le rendu actuel.
3. Ajouter des cas de type valides pour texte et icône-seule nommée.
4. Ajouter des cas invalides pour trigger vide et icône-seule non nommée.

# Progress

## Observations

- `Progress` émet toujours `role="progressbar"`
  (`src/components/feedback/progress/Progress.tsx:67-75`).
- `label` est optionnel (`Progress.props.ts:22-23`) et fournit directement
  `aria-label`.
- Sans `label`, le rôle n'a ni `aria-label` ni `aria-labelledby`.
- `quantityLabel` décrit la valeur, pas ce que la progression représente.

## Conclusions

Le composant doit garantir un nom accessible sans forcer un label visuel. Un
libellé générique codé en dur ne serait pas localisable.

## Décision

**DECISION = Corriger.**

## API cible

```ts
type ProgressAccessibleName =
  | { label: string }
  | { 'aria-label': string }
  | { 'aria-labelledby': string }

type ProgressBaseProps =
  ProgressVisualProps &
  ProgressAccessibleName
```

`aria-label` et `aria-labelledby` ciblent l'élément `progressbar`, pas le
wrapper.

## Tâches d'implémentation

1. Réserver `aria-label` et `aria-labelledby` dans les props héritées de Box.
2. Ajouter l'union de nom accessible.
3. Transmettre les attributs de nom au nœud `role="progressbar"`.
4. Tester les trois modes de nommage.

# CircularProgress

## Observations

- `CircularProgress` réutilise `ProgressBaseProps`.
- Son `<svg role="progressbar">` reçoit uniquement `aria-label={label}`
  (`src/components/feedback/progress/CircularProgress.tsx:53-60`).
- Il présente donc la même absence possible de nom que Progress.

## Conclusions

Les deux représentations d'une même famille doivent partager le même contrat
d'accessibilité.

## Décision

**DECISION = Corriger.**

## API cible

Même union `ProgressAccessibleName` que Progress. Les attributs nomment le
`svg[role="progressbar"]`.

## Tâches d'implémentation

1. Réutiliser le type commun de nom accessible.
2. Transmettre `aria-label` et `aria-labelledby` au SVG.
3. Exécuter les mêmes cas d'accessibilité que pour Progress.

# Separator

## Observations

- Separator expose `orientation` avec `horizontal` par défaut
  (`src/components/layout/separator/types/Separator.props.ts:4-9`).
- Le rendu applique `role="separator"` mais n'émet pas `aria-orientation`
  (`src/components/layout/separator/Separator.tsx:18-23`).
- L'orientation ARIA implicite du rôle est horizontale ; le rendu vertical est
  donc annoncé comme horizontal.

## Conclusions

La prop visuelle et la sémantique observable peuvent diverger. Le composant
possède déjà toute l'information nécessaire.

## Décision

**DECISION = Corriger.**

## API cible

`orientation` pilote simultanément la recette et `aria-orientation`.

```tsx
<Box
  role="separator"
  aria-orientation={orientation}
/>
```

## Tâches d'implémentation

1. Omettre `aria-orientation` des props héritées pour éviter deux sources de
   vérité.
2. Émettre `aria-orientation={orientation}`.
3. Vérifier les rendus horizontal et vertical.

# Callout

## Observations

- `CalloutRole` expose `alert | status | none`
  (`src/components/feedback/callout/types/Callout.types.ts:4-5`).
- La documentation décrit `none` comme la désactivation de la live region
  (`Callout.props.ts:11-16`).
- Callout transmet littéralement `role="none"`
  (`src/components/feedback/callout/Callout.tsx:33-39`).
- Toast traduit la même valeur publique en absence d'attribut `role`
  (`src/components/feedback/toast/Toast.tsx:40-45`).
- Callout expose aussi `Callout.Icon`, `.Title` et `.Description` à plat via
  `export *` (`callout/index.ts:7`).

## Conclusions

Le sentinel public `none` doit produire le même résultat observable dans les
deux composants de feedback. Les slots composés doivent suivre la convention
namespace-first.

## Décision

**DECISION = Standardiser.**

## API cible

- `role="none"` signifie « ne pas émettre de rôle de live region ».
- Valeurs de slots : `Callout.Icon`, `Callout.Title`,
  `Callout.Description`.
- Types de props et `CALLOUT_ICON_STYLES` restent exportés à plat.

## Tâches d'implémentation

1. Convertir `none` en `undefined` avant le rendu du rôle.
2. Remplacer l'export star des composants par des exports explicites de types
   et de styles.
3. Ne plus exporter les valeurs `CalloutIcon`, `CalloutTitle` et
   `CalloutDescription` à plat.

# Toast

## Observations

- Toast applique déjà la convention cible pour `role="none"`
  (`src/components/feedback/toast/Toast.tsx:40-45`).
- Ses cinq slots sont accessibles par namespace
  (`Toast.Icon`, `.Title`, `.Description`, `.Actions`, `.Close`).
- Le barrel les réexporte également comme valeurs à plat
  (`src/components/feedback/toast/index.ts:10`).

## Conclusions

Le comportement accessible est exemplaire et doit être conservé. Seule la
double surface d'exports diffère de la convention dominante des composants
composés.

## Décision

**DECISION = Standardiser les exports ; conserver le comportement.**

## API cible

- Valeurs de slots uniquement sous `Toast.*`.
- `ToastIconProps`, `ToastTitleProps`, `ToastDescriptionProps`,
  `ToastActionsProps`, `ToastCloseProps` et `TOAST_ICON_STYLES` restent des
  exports nommés.

## Tâches d'implémentation

1. Remplacer l'export star par des exports explicites de types et de styles.
2. Supprimer les valeurs de slots exportées à plat.
3. Vérifier la déclaration générée du package.

# Drawer

## Observations

- `Drawer.Section` est un slot du type composé
  (`src/components/overlay/drawer/types/index.ts:12-20`).
- `DrawerSectionProps` est défini et exporté par le barrel interne
  (`drawer/types/index.ts:28-34`).
- Le barrel public expose les types des autres slots, mais omet
  `DrawerSectionProps` (`drawer/index.ts:10-15`).

## Conclusions

Un consommateur peut utiliser `Drawer.Section`, mais pas nommer directement
son type de props comme pour les autres slots.

## Décision

**DECISION = Corriger.**

## API cible

```ts
export type { DrawerSectionProps } from './components/blocs/drawer-section/...'
```

## Tâches d'implémentation

1. Ajouter `DrawerSectionProps` au barrel public de Drawer.
2. Vérifier sa présence dans `dist/index.d.ts`.

# APITheme

## Observations

- `src/theme/index.ts` exporte explicitement `palette`, `lightTheme`,
  `darkTheme`, `Theme`, `lightColors`, `darkColors`, `LightColors`,
  `overrideColors` et `setColorToken` comme API utile aux consommateurs
  (`src/theme/index.ts:9-20`).
- Le point d'entrée du package ne réexporte que `vars`, `ThemeVars` et
  `ThemeColor` (`src/index.ts:1-2`).
- Le package ne fournit aucun sous-chemin `./theme`
  (`package.json:31-37`).
- `overrideColors` appelle `assignVars` avec toutes les références de
  `vars.color` comme valeurs de repli
  (`src/theme/override.ts:9-18`). Les tokens non remplacés deviennent des
  auto-références CSS au lieu de continuer à hériter.

## Conclusions

Le barrel de thème et le package ne décrivent pas la même surface. Exposer le
barrel tel quel rendrait en outre un helper partiel incorrect accessible aux
consommateurs.

## Décision

**DECISION = Corriger puis standardiser.**

## API cible

Le point d'entrée principal réexporte les symboles déjà déclarés par
`src/theme/index.ts` :

```ts
export {
  vars,
  palette,
  lightTheme,
  darkTheme,
  lightColors,
  darkColors,
  overrideColors,
  setColorToken,
} from '@theme'

export type {
  ThemeVars,
  ThemeColor,
  Theme,
  LightColors,
} from '@theme'
```

`overrideColors(selector, partialColors)` ne déclare que les variables
présentes dans `partialColors`.

## Tâches d'implémentation

1. Corriger `overrideColors` pour transformer uniquement les entrées reçues en
   paires `[vars.color[token], value]`.
2. Ne jamais remplir les tokens absents avec leur propre référence CSS.
3. Réexporter à la racine tous les symboles déjà exposés par le barrel thème.
4. Conserver les types ThemeProvider actuellement disponibles via le barrel
   des composants.
5. Vérifier les déclarations générées et un override partiel à deux tokens.
