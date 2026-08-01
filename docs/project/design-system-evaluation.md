# Évaluation globale du Design System

## Périmètre et méthode

Cet audit porte sur la surface publique de `@choco-vanille/ui` : exports, types,
props, variants, tailles, callbacks, conventions controlled/uncontrolled,
composition et accessibilité observable.

Les composants publics recensés par `docs/audit/library-map.json` ont servi
d'inventaire. Les décisions reposent sur le code source et les types publics ;
les stories, tests, hooks et helpers n'ont été consultés que pour confirmer un
comportement public précis.

La règle appliquée est conservatrice : une différence entre deux familles de
composants n'est pas une incohérence tant que les concepts exposés ne sont pas
équivalents.

## Forces

- L'architecture publique est lisible : un point d'entrée unique
  (`src/index.ts:1-17`), des barrels par catégorie
  (`src/components/index.ts:1-10`) et un barrel par composant.
- Les composants composés utilisent majoritairement un namespace prévisible :
  `Dialog.Content`, `Select.Item`, `Table.Row`, `Toast.Close`, etc.
- Les wrappers Base UI conservent les types de leurs primitives. Les APIs
  `value/defaultValue/onValueChange`, `checked/defaultChecked/onCheckedChange`
  et `open/defaultOpen/onOpenChange` restent ainsi disponibles sans
  redéclaration partielle.
- Les composants natifs conservent les conventions DOM. `TextFieldProps`
  étend les attributs d'un `input` et réserve uniquement `size`
  (`src/components/forms/text-field/types/TextField.props.ts:6-27`).
- Les familles de contrôles partagent correctement leurs recettes et leurs
  échelles : Button/IconButton, TextField/TextArea et
  Progress/CircularProgress ont chacun une source commune.
- Les tokens sémantiques et les échelles décoratives sont distincts. Les
  contrôles d'action restent sur les intentions sémantiques, tandis que Badge,
  Avatar et Progress peuvent utiliser la palette étendue.
- L'accessibilité est souvent garantie par le type ou par le composant :
  `IconButton` et `ToggleIconButton` exigent un `aria-label`, `Icon` décide
  automatiquement s'il est décoratif
  (`src/components/foundation/icon/Icon.tsx:20-55`) et `Dialog.Content`
  garantit un nom de repli localisable
  (`src/components/overlay/dialog/components/dialog-content/DialogContent.tsx:15-33`).
- Les champs relient correctement labels, erreurs et textes d'aide ; les
  composants composés s'appuient sur les primitives Base UI pour les
  interactions clavier et les attributs ARIA.

## Faiblesses

- Quelques contrats publics promettent davantage que le comportement réel :
  `Checkbox` et `Switch` déclarent les détails d'événement Base UI, mais
  remplacent ces détails par un objet synthétique
  (`Checkbox.tsx:27-29`, `Switch.tsx:28-30`).
- Des bases de props publiques importent leurs types depuis des recettes
  `*.css.ts` (règle `public-vanilla-extract-type` dans
  `docs/audit/audit-findings.json`). La Consumer API dépend donc de Vanilla
  Extract au lieu de définir son propre vocabulaire.
- Certaines props publiques sont insuffisamment contraintes :
  `AvatarProps` accepte toute clé et toute valeur
  (`Avatar.props.ts:47-48`), et trois contrôles textuels permettent un rendu
  vide ou uniquement décoratif.
- Plusieurs détails d'accessibilité restent à la charge du consommateur alors
  que le composant pourrait les garantir : nom des progressbars et orientation
  ARIA du séparateur vertical.
- Le barrel de thème annonce des primitives, thèmes et helpers « utiles pour
  les projets consommateurs » (`src/theme/index.ts:9-20`), mais le package
  n'expose que `vars`, `ThemeVars` et `ThemeColor`
  (`src/index.ts:1-2`). Le package ne déclare aucun sous-chemin `./theme`
  (`package.json:31-37`).

## Incohérences systémiques

### Vocabulaire des variantes de remplissage

Le même axe visuel est nommé différemment :

- Button/IconButton : `contained` et `outlined`
  (`buttonVariants.const.ts:1-5`) ;
- Badge : `contained` et `outlined`
  (`badgeVariants.const.ts:1-6`).

La recette `contained.ts` de Badge applique la couleur d'intention en fond et sa
couleur foreground (`contained.ts:10-15`). La recette `outlined.ts` décrit une
surface sans remplissage bordée pour `outlined`, même si l'intensité du token
diffère.

La convention dominante et déjà exemplaire est `contained | outlined | ghost`.
La correction minimale porte donc uniquement sur Badge.

### Callbacks de primitives

La convention observée est :

- élément HTML natif : callback DOM natif, par exemple `onChange(event)` ;
- primitive Base UI : callback de la primitive, avec tous ses arguments ;
- wrapper de commodité : callback simplifié seulement si son type public le
  déclare explicitement.

`Checkbox` et `Switch` rompent cette convention en conservant le type Base UI
mais pas sa valeur d'événement réelle.

### Controlled / uncontrolled

La convention générale est complète et cohérente :

- valeur : `value`, `defaultValue`, `onValueChange` ;
- ouverture : `open`, `defaultOpen`, `onOpenChange` ;
- booléen : `checked`, `defaultChecked`, `onCheckedChange`.

`Tooltip` est le seul overlay contrôlable de cette famille sans
`defaultOpen` (`Tooltip.props.ts:26-29`), alors que son hook possède déjà un
état interne (`useTooltip.hook.ts:11-28`).

### Exports composés

La règle dominante est : valeur du composant racine exportée à plat,
sous-composants accessibles par namespace, types de props exportés
individuellement.

- `Drawer.Section` est public dans `DrawerCompound`
  (`drawer/types/index.ts:12-20`), mais `DrawerSectionProps` manque dans le
  barrel public (`drawer/index.ts:10-15`).
- Callout et Toast exportent simultanément leurs sous-composants à plat et par
  namespace (`callout/index.ts:7`, `toast/index.ts:10`), contrairement aux
  autres composants composés.
- `DropdownMenuPortal` reste une exception acceptable : son export à plat est
  explicitement documenté comme échappatoire Base UI avancée
  (`dropdown-menu/index.ts:3-6`).

### TypeScript public

- Une prop publique ne doit jamais importer un `RecipeVariants`, sélectionner
  une de ses propriétés ou dépendre d'un fichier `*.css.ts`. Les unions de
  variants, tailles, couleurs et tokens appartiennent à `types/` ou dérivent
  de constantes publiques ; la recette consomme ensuite ce vocabulaire.
- Cette règle s'applique aussi à Box, Flex et Grid : leurs contraintes de
  tokens restent publiques, mais leur définition devient indépendante de
  Vanilla Extract.
- `AvatarProps.[key: string]: unknown` désactive en revanche réellement le
  contrôle des propriétés excédentaires.
- `AutocompleteCompound` remplace le root générique de Base UI par
  `Props<any>` (`Autocomplete.types.ts:8`), alors que
  `typeof BaseAutocomplete.Root` permet de conserver les surcharges et
  l'inférence des valeurs.

## Problèmes Consumer API

Les problèmes à corriger sont limités aux surfaces suivantes :

| Surface | Effet consommateur | Décision |
| --- | --- | --- |
| Types publics liés à Vanilla Extract | La Consumer API dépend de l'implémentation CSS | Découpler |
| Badge variants | Deux vocabulaires pour le même axe visuel | Standardiser |
| Checkbox/Switch callbacks | Détails d'événement déclarés mais faux | Corriger |
| Tooltip state | Mode uncontrolled initial incomplet | Standardiser |
| Avatar props | Les fautes de props passent le type-check | Corriger |
| Autocomplete compound | Perte de l'inférence générique | Corriger |
| ToggleButton, ToggleButtonGroup.Item, Tabs.Trigger | Contrôle sans nom accessible autorisé | Corriger |
| Drawer types | Type d'un slot public inaccessible | Corriger |
| Callout/Toast exports | Deux chemins d'import pour les mêmes slots | Standardiser |
| Theme exports | Barrel avancé inaccessible depuis le package | Standardiser |

Les différences suivantes sont conservées :

- `error` sur Callout/Toast et `destructive` sur les couleurs d'action : le
  premier décrit un état de message, le second une intention d'action ;
- palette sémantique des actions et palette étendue des composants
  décoratifs ;
- tailles propres à chaque famille, dont `Progress` en `sm` par défaut ;
- `onChange` DOM des champs natifs, callbacks simplifiés des wrappers Field et
  callbacks complets des primitives ;
- API `selected/onSelect` de Calendar, héritée de react-day-picker ;
- `ReactElement` unique pour le trigger Tooltip, nécessaire à la délégation de
  ref ;
- exports publics `*_STYLES`, convention d'extension déjà généralisée, à
  condition qu'ils ne servent jamais de base aux types de props.

## Accessibilité observable

### Garanties solides

- `Icon` masque les icônes décoratives et applique `role="img"` lorsqu'un
  `aria-label` est fourni.
- Les contrôles dédiés aux icônes seules exigent un `aria-label`.
- `Button` exige un `label` (`Button.props.ts:12-17`).
- `Dialog.Content` garantit un nom accessible.
- `TextField`, `TextArea`, `SelectField` et `HelperText` relient états
  invalides, descriptions et live regions.
- `Toast.Close` reçoit un libellé par défaut dans l'API de commodité.

### Écarts démontrés

- `ToggleButton`, `ToggleButtonGroup.Item` et `Tabs.Trigger` rendent leur
  `label` optionnel tout en masquant leurs icônes décoratives. Un contrôle sans
  nom accessible est donc accepté par TypeScript.
- `Progress` et `CircularProgress` émettent toujours
  `role="progressbar"`, mais leur `label` est optionnel
  (`Progress.props.ts:22-23`) et devient directement `aria-label`
  (`Progress.tsx:67-75`, `CircularProgress.tsx:53-60`).
- `Separator` n'émet pas `aria-orientation`, alors que le rôle `separator` a
  une orientation horizontale implicite (`Separator.tsx:18-23`).
- `Callout` transmet littéralement `role="none"` tandis que Toast traduit la
  même valeur publique en absence de rôle (`Callout.tsx:33-39`,
  `Toast.tsx:40-45`).

Le rôle `status` d'`AvatarStatus` est conservé : le statut de présence peut
évoluer dynamiquement et le code garantit déjà son nom accessible. Aucun défaut
observable n'est démontré pour ce cas.

## Composants exemplaires

### Icon

`Icon` centralise la distinction décoratif/sémantique, empêche le consommateur
de contredire `role` ou `aria-hidden`, et conserve les attributs Iconify utiles.

**DECISION = Conserver.** Reproduire ce pattern pour les primitives visuelles
qui peuvent être décoratives ou porteuses d'information.

### Button et IconButton

La famille partage recettes, couleurs et tailles. `Button` impose un texte,
`IconButton` impose un nom accessible ; les deux usages sont donc non ambigus.

**DECISION = Conserver.** Reproduire la séparation composant textuel /
composant icône-seul.

### TextField et TextArea

Les deux composants conservent les attributs HTML natifs, réservent seulement
la prop `size`, partagent la même structure visuelle et relient correctement
label, aide et erreur.

**DECISION = Conserver.** Reproduire ce pattern pour tout contrôle HTML natif.

### Dialog

Le root conserve l'API Base UI, la composition est namespace-first et le
contenu garantit un nom accessible localisable.

**DECISION = Conserver.** Reproduire le triptyque root contrôlable, slots
composés et garde d'accessibilité.

### SelectField et AutocompleteField

Ces wrappers offrent une API de champ cohérente (`label`, `helperText`,
`error`, `size`, `value/defaultValue`) sans retirer l'API composée avancée.

**DECISION = Conserver.** Reproduire ce modèle à deux niveaux lorsqu'une
primitive complète a besoin d'un raccourci orienté formulaire.

## Composants problématiques

Intervention requise :

- Badge ;
- Checkbox ;
- Switch ;
- Tooltip ;
- Avatar ;
- Autocomplete ;
- ToggleButton ;
- ToggleButtonGroup.Item ;
- Tabs.Trigger ;
- Progress ;
- CircularProgress ;
- Separator ;
- Callout ;
- Toast ;
- Drawer ;
- API publique du thème.
- tous les composants dont les props publiques dépendent d'un `*.css.ts`,
  actuellement recensés dans `audit-summary.md`.

Tous les autres composants publics et tous les slots non cités ci-dessus :

**DECISION = Conserver.**

Cela inclut notamment AvatarGroup, Calendar, DatePicker, RadioGroup, Select,
SelectField, AutocompleteField, Form, Fieldset, Legend, Accordion, Card,
Collapsible, Link, DropdownMenu, Popover, HoverCard, Dialog et ThemeProvider.
Le comportement des composants concernés uniquement par le découplage
Vanilla Extract reste à conserver.

## Synthèse générale

La librairie est cohérente dans son architecture, ses familles visuelles, sa
composition et son usage des primitives Web/Base UI. Les écarts retenus ne
justifient aucune réécriture : ils se concentrent sur un vocabulaire de
variants, deux callbacks incorrects, quelques garanties de types et
d'accessibilité, trois barrels et l'exposition du thème avancé.

La cible n'est pas une API uniformisée artificiellement. Elle conserve les
différences de domaine et standardise uniquement les concepts réellement
équivalents.
