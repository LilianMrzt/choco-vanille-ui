# Matrice de cohérence officielle

Cette matrice est la référence publique de `@choco-vanille/ui`. Elle décrit la
cible retenue par l'audit, y compris les corrections listées dans
`design-system-component-audit.md`.

Une règle globale ne doit pas effacer une différence de domaine. La convention
porte d'abord sur la signification d'une prop, puis sur son nom.

## Variants

### Convention

`variant` décrit un axe discret propre à la famille. Deux familles partageant
le même axe visuel partagent le même vocabulaire ; deux axes différents
conservent des vocabulaires différents.

| Axe | Valeurs approuvées | Composants |
| --- | --- | --- |
| Remplissage d'action | `contained`, `outlined`, `ghost` | Button, IconButton |
| Remplissage de toggle | `outlined`, `ghost` | ToggleButton, ToggleIconButton |
| Remplissage de label | `contained`, `subtle`, `outlined`, `outlinedSubtle` | Badge |
| Intention de feedback | `info`, `success`, `warning`, `error` | Callout, Toast |
| Forme de placeholder | `circular`, `rectangular`, `rounded` | Skeleton |
| Présentation de navigation | `default`, `pills` | Tabs.List |

### Règles

- Utiliser `contained` pour un fond plein et `outlined` pour une surface
  bordée sur l'axe de remplissage.
- Ne pas renommer `error` en `destructive` sur Callout/Toast : `error` est un
  état de message ; `destructive` est une intention de couleur/action.
- Ne pas ajouter `variant` lorsqu'un composant n'a qu'une présentation.
- Ne pas utiliser `variant` pour une dimension déjà nommée précisément
  (`shape`, `orientation`, `mode`, `position`).

## Tailles

### Convention

Les tailles utilisent des clés de tokens ordonnées. Une famille partage son
échelle et son défaut ; les familles ne sont pas forcées à exposer toutes les
clés.

| Famille | Échelle | Défaut |
| --- | --- | --- |
| Bouton textuel / champ | `sm`, `md`, `lg` | `md` |
| Bouton icône | `xs`, `sm`, `md`, `lg` | `md` |
| Avatar | `sm`, `md`, `lg`, `xl` | `md` |
| Progress | `xs`, `sm`, `md`, `lg`, `xl` | `sm` |
| Drawer | `sm`, `md`, `lg`, `xl`, `2xl`, `full` | `md` |
| Icon | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | `md` |
| Typography `fontSize` | `2xs` à `6xl` | selon le variant typographique |

### Règles

- Partager les constantes et mappings au sein d'une famille.
- Documenter le défaut dans le type public.
- Conserver `Progress` en `sm` : il s'agit d'une épaisseur de piste, pas de la
  hauteur d'un champ.
- Ne pas ajouter `xs` à un contrôle textuel uniquement pour aligner les unions.

## Props communes

| Concept | Convention |
| --- | --- |
| Classe consommateur | `className?: string` sur le nœud public principal |
| Style natif | hérité du type HTML lorsque le nœud est natif |
| Ref React 19 | `ref?: React.Ref<Element>` dans les props publiques |
| Texte visible | `label` |
| Icône seule | composant dédié avec `'aria-label': string`, ou union de props imposant un nom |
| Icônes adjacentes | `startIcon` et `endIcon` |
| Icône unique | `icon` |
| Aide de champ | `helperText` |
| Erreur de champ | `error` |
| Largeur de wrapper | `width` quand le wrapper en est propriétaire |
| État désactivé | `disabled` natif ou hérité de la primitive |

### Règles

- Partir des attributs du véritable élément rendu.
- Utiliser `Omit` uniquement pour les clés dont la bibliothèque redéfinit la
  sémantique, par exemple `size`, `color` ou `children`.
- Ne pas utiliser `[key: string]: unknown`.
- Ne pas utiliser `aria-label` comme texte visuel.
- Lorsqu'un composant textuel a un équivalent icône-seul, le composant textuel
  exige `label`.

## Callbacks

| Source du composant | Nom et payload |
| --- | --- |
| Élément HTML natif | callback DOM natif, par exemple `onChange(event)` |
| Valeur Base UI | `onValueChange(value, eventDetails)` |
| Booléen Base UI | `onCheckedChange(checked, eventDetails)` |
| Toggle Base UI | `onPressedChange(pressed, eventDetails)` |
| Ouverture Base UI | `onOpenChange(open, eventDetails)` |
| Wrapper Field simplifié | `onValueChange(value)` si le type public annonce explicitement ce rétrécissement |
| Action métier sans événement public | verbe métier, par exemple `onClose()` |

### Règles

- Transmettre tous les arguments déclarés par le type public.
- Un wrapper peut réduire un callback uniquement en réduisant également son
  type public.
- Ne jamais fabriquer un détail d'événement pour satisfaire un type.
- Ne pas remplacer `onChange` natif par `onValueChange`.
- Conserver le vocabulaire de la dépendance pour un passthrough explicite,
  notamment `Calendar.selected/onSelect`.

## Controlled / Uncontrolled

| État | Contrôlé | Initial uncontrolled | Callback |
| --- | --- | --- | --- |
| Valeur | `value` | `defaultValue` | `onValueChange` ou `onChange` natif |
| Sélection booléenne | `checked` | `defaultChecked` | `onCheckedChange` |
| Toggle | `pressed` | `defaultPressed` | `onPressedChange` |
| Ouverture | `open` | `defaultOpen` | `onOpenChange` |
| Vue Calendar | `month` | `defaultMonth` | `onMonthChange` |

### Règles

- Exposer le triplet complet lorsqu'un état supporte les deux modes.
- Initialiser l'état interne depuis `default*`, jamais depuis la prop
  contrôlée.
- La prop contrôlée a priorité lorsqu'elle n'est pas `undefined`.
- Un changement appelle le callback dans les deux modes.
- Les wrappers Base UI héritent le contrat au lieu de le recopier.
- Un wrapper custom, comme Drawer ou Tooltip, reproduit explicitement le même
  contrat.

## Composition

### Convention

- Un composant multi-parties expose ses valeurs sous
  `Component.SubComponent`.
- Le type du root composé est nommé `ComponentCompound`.
- Les types des slots sont exportés à plat :
  `ComponentSubComponentProps`.
- Les wrappers de commodité restent à plat lorsqu'ils sont des composants
  autonomes : `SelectField`, `AutocompleteField`.
- Les triggers qui délèguent un élément consommateur acceptent un
  `ReactElement` unique afin de transmettre la ref.
- Les composants textuels spécialisés utilisent `label`, pas une combinaison
  libre de `children`.
- Les composants de contenu général conservent `children`.

### Exceptions approuvées

- `DropdownMenuPortal` est une échappatoire Base UI avancée exportée à plat et
  documentée comme telle.
- Les APIs tierces assumées, comme Calendar/DayPicker, peuvent conserver leur
  composition d'origine.

## TypeScript

### Nommage

| Type | Nom |
| --- | --- |
| Props | `ComponentProps` |
| Variant | `ComponentVariant` |
| Taille | `ComponentSize` |
| Couleur | `ComponentColor` |
| Composé | `ComponentCompound` |
| Contexte public | `ComponentContextValue` |

### Règles

- Conserver les génériques et surcharges des primitives avec
  `typeof Primitive.Root` lorsque le composant public les promet.
- Préférer `Pick<Primitive.Props, ...>` pour une sélection volontaire.
- Ne pas exposer `any` dans une surface publique.
- Ne pas utiliser de cast pour masquer une divergence entre type public et
  runtime.
- Ne jamais importer `RecipeVariants`, un type de recette ou un fichier
  `*.css.ts` depuis des props/types publics.
- Définir les unions publiques dans `types/` ou depuis des constantes
  `as const`, puis faire consommer ce vocabulaire par la recette.
- Appliquer cette isolation à tous les composants, y compris Box/Flex/Grid.
- Les fichiers `Component.props.ts` contiennent les props ; les unions
  publiques complémentaires vivent dans `Component.types.ts`.

## Exports

### Barrel de composant

Un barrel public exporte explicitement :

1. la valeur du composant racine ;
2. les `*_STYLES` publics ;
3. `ComponentProps` ;
4. les unions publiques ;
5. les types de props des slots.

Les valeurs de slots sont accessibles par le namespace composé, pas par un
second import à plat.

### Barrel de package

- `src/index.ts` reste le point d'entrée unique.
- Les catégories publiques passent par `src/components/index.ts`.
- Le barrel `src/theme/index.ts` est réexporté depuis le point d'entrée
  principal.
- Les helpers internes, recipes utilitaires et constantes locales ne sont pas
  réexportés.
- Un export avancé à plat doit être explicitement documenté.

## Accessibilité

| Surface | Garantie |
| --- | --- |
| Bouton textuel | texte visible obligatoire |
| Bouton icône-seul | `aria-label` obligatoire |
| Icône décorative | `aria-hidden` géré par Icon |
| Icône informative | `aria-label` et `role="img"` gérés par Icon |
| Dialog | nom accessible garanti, repli localisable |
| Champ | label relié, erreur via `aria-invalid`, aide via `aria-describedby` |
| Progressbar | `label`, `aria-label` ou `aria-labelledby` obligatoire |
| Separator | `aria-orientation` synchronisé avec `orientation` |
| Feedback | `status` par défaut, `alert` pour l'urgent, `none` signifie absence de live-region role |
| Contrôle dépliable | état et relations fournis par la primitive ou explicitement émis |

### Règles

- Une icône interne à un contrôle reste décorative ; le contrôle porte le nom.
- Un rôle nécessitant un nom ne peut pas être rendu sans source de nom.
- Une prop visuelle sémantique pilote aussi l'attribut ARIA correspondant.
- Les valeurs sentinelles publiques produisent le même DOM sur les composants
  qui les partagent.
- Les comportements hérités de Base UI sont conservés sauf défaut observé dans
  le code.

## Patterns approuvés

- Button + IconButton : séparation texte / icône-seule.
- TextField + TextArea : attributs natifs, taille réservée, aide et erreur
  intégrées.
- Select/Autocomplete composés + wrappers Field.
- Dialog : root Base UI, namespace composé, nom accessible.
- Icon : politique décorative/informative centralisée.
- Recettes et constantes partagées à l'intérieur d'une famille.
- Props de layout contraintes par les tokens Box/Flex/Grid.
- `*_STYLES` publics comme contrat d'extension.
- Palette sémantique pour les actions et étendue pour les éléments décoratifs.

## Patterns à éviter

- Deux noms pour le même axe visuel (`solid`/`contained`,
  `outline`/`outlined`).
- `label?: string` sur un contrôle qui interdit `children` sans autre garantie
  de nom accessible.
- `[key: string]: unknown` dans des props publiques.
- `Props<any>` lorsque la primitive possède un type générique réutilisable.
- Dépendance `props/types -> *.css.ts`, `RecipeVariants` ou type Vanilla
  Extract.
- Reconstruction ou falsification d'un événement déclaré.
- État uncontrolled initialisé depuis `value` ou `open`.
- Slot composé exporté simultanément comme valeur à plat sans exception
  documentée.
- Prop contrôlée sans sa prop `default*` alors qu'un état interne existe.
- Rôle ARIA dont l'état, l'orientation ou le nom diverge de la prop visuelle.
- Exposition d'un helper public avant validation de son comportement partiel.

## Matrice d'application

| Famille | Référence à reproduire | Décision générale |
| --- | --- | --- |
| Actions | Button / IconButton | Conserver, sauf labels Toggle ciblés |
| Data display | Table / Avatar composé | Conserver, sauf Badge et type Avatar |
| Feedback | Toast pour les rôles, Progress pour les styles partagés | Conserver, sauf noms progressbar et exports ciblés |
| Foundation | Icon / Typography | Conserver |
| Formulaires natifs | TextField / TextArea | Conserver |
| Formulaires headless | Select / RadioGroup | Conserver, sauf callbacks Checkbox/Switch et type Autocomplete |
| Layout | Box / Flex / Grid | Conserver les tokens, découpler leurs types des recettes |
| Surfaces | Accordion / Card / Collapsible | Conserver |
| Navigation | Link / Tabs composé | Conserver, sauf contrat de Tabs.Trigger |
| Overlays | Dialog / Popover / Drawer | Conserver, sauf Tooltip et export Drawer |
| Thème | `vars` et ThemeProvider | Conserver l'architecture, compléter les exports avancés |
