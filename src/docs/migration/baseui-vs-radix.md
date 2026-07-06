# État de l'art — Radix UI vs Base UI

> Contexte : shadcn/ui migre progressivement de Radix UI vers Base UI. Ce document évalue
> si `@aurora-ds` devrait faire de même, et quel serait le coût d'une telle migration
> compte tenu de notre implémentation actuelle (Vanilla Extract + composants "compound"
> qui wrappent directement les primitives Radix).
>
> **Note de contexte importante** : l'API de `@aurora-ds` n'est pas encore publiée
> (aucun consommateur externe). On peut donc renommer, casser ou restructurer l'API
> publique librement — pas besoin de wrapper/alias de compatibilité, ni de dépréciation
> progressive. De plus, la couverture de tests unitaires est déjà large (68 fichiers de
> tests sur les composants), ce qui réduit fortement le risque de régression silencieuse
> lors de la migration : un remplacement de primitive qui casse un comportement (focus,
> clavier, `data-state`, etc.) sera en général détecté immédiatement par la suite Vitest
> existante plutôt qu'en production.

## 1. Pourquoi Base UI serait un meilleur choix aujourd'hui

Base UI est développé conjointement par l'équipe **shadcn/ui**, **Material UI (MUI)** et
l'ancienne équipe **Radix** (Radix a arrêté le développement actif de `@radix-ui/react-*`
au profit de Base UI). C'est un facteur déterminant : Radix UI n'a plus reçu de nouvelle
fonctionnalité majeure depuis fin 2024, les mainteneurs ayant rejoint le projet Base UI.

| Critère | Radix UI | Base UI |
|---|---|---|
| Statut / maintenance | Mode maintenance, quasi plus de nouvelles features | Développement actif, sorti en v1.0 stable (2025) |
| Gouvernance | WorkOS (ex-Modulz) | Effort commun MUI + shadcn/ui + ex-équipe Radix |
| Packaging | 1 package npm par primitive (`@radix-ui/react-dialog`, `-select`, …) | 1 seul package `@base-ui-components/react`, tree-shakable |
| API de composition | `asChild` (clone du seul enfant direct, fragile avec les forwardRef/HOC) | prop `render` (function-as-child ou élément), plus flexible, supporte le merge de refs/props sur des enfants plus profonds |
| Style / attributs d'état | `data-state`, `data-disabled`, etc. | Mêmes conventions `data-*`, généralement compatibles telles quelles |
| Accessibilité | Bonne | Bonne, revue avec retours d'expérience Radix + APG le plus récent |
| Animations sortie (unmount) | Nécessite `forceMount` + libs externes (framer motion) | Support natif des transitions CSS/JS à la fermeture (`keepMounted`, hooks de transition) |
| Nombre de composants | ~25 primitives | 35+ (inclut Toast, Combobox, Autocomplete, NumberField, Drawer, OTPField… absents ou plus pauvres côté Radix) |
| React 19 | Support tardif / correctifs récents | Conçu avec React 19 en tête (refs as props, etc.) |
| Bundle | Multiples petits packages, dépendances Radix internes dupliquées (`@radix-ui/react-primitive`, `-context`, `-id`…) | Package unique, moins de duplication de code interne |
| Communauté / écosystème | Historique, très utilisé (shadcn/ui v1) | Nouveau mais adopté par shadcn/ui (nouvelles versions), MUI, croissance rapide |

**Conclusion étape 1** : Base UI est bien le successeur naturel de Radix (mêmes auteurs,
mêmes concepts `data-state`/portails/anchoring), avec plus de composants, une seule
dépendance, et une meilleure histoire de composition (`render` vs `asChild`). Radix
n'est pas mort mais n'évoluera plus significativement. Pour une **librairie encore jeune**
comme la nôtre, partir (ou basculer tôt) sur Base UI évite une dette technique de migration
plus coûteuse dans 1-2 ans, quand le nombre de composants aura grandi.

## 2. Différences d'API qui impactent directement notre code

Notre kit encapsule chaque primitive Radix dans un composant "compound" (`Dialog.Trigger`,
`Select.Item`, etc.) et s'appuie beaucoup sur le pattern **`asChild`** pour laisser le
consommateur fournir son propre élément (souvent notre `Button`). Deux points de friction :

1. **`asChild` → `render`** : Base UI remplace `asChild` par une prop `render` acceptant soit
   un élément (`render={<Button />}`), soit une fonction `(props, state) => ReactElement`.
   Fonctionnellement équivalent mais la signature change dans **tous** les composants
   trigger/close/anchor de notre lib (`DialogTrigger`, `DialogClose`, `PopoverTrigger`,
   `PopoverAnchor`, `HoverCardTrigger`, `DropdownMenuTrigger`, `DropdownMenuSubTrigger`…).
   Nos types `*.props.ts` qui étendent les props Radix (`ComponentPropsWithoutRef<typeof RadixX.Trigger>`)
   devront être adaptés.
2. **Namespacing des imports** : Radix expose `import * as RadixX from '@radix-ui/react-x'`
   (un package par composant). Base UI expose des namespaces depuis un seul package :
   `import { Dialog } from '@base-ui-components/react/dialog'`. Mécanique de renommage
   simple mais à faire partout (~140 fichiers touchent `@radix-ui` aujourd'hui).
3. **Value/checked state** : sur `Select`, `RadioGroup`, `Checkbox`, `Switch`, `Tabs`, les
   noms de props sont très proches (`value`/`onValueChange`, `checked`/`onCheckedChange`)
   mais pas garantis identiques à 100 % (ex: `Select` de Base UI gère nativement les
   objects/valeurs complexes et le multi-select, API légèrement différente pour
   `Select.Value`/`Select.Icon`). Il faut vérifier composant par composant.
4. **CSS/attributs de style** : nos fichiers `*.css.ts` (Vanilla Extract) ciblent des
   sélecteurs comme `&[data-state="open"]`, `&[data-disabled]`, `&[data-highlighted]`.
   Base UI conserve globalement les mêmes attributs `data-*`, donc la majorité des styles
   sont réutilisables tels quels ; à vérifier au cas par cas (ex: `data-highlighted` existe
   pour Menu/Select des deux côtés, mais certains attributs Base UI sont plus précis,
   comme `data-starting-style`/`data-ending-style` pour les transitions, qu'on pourrait
   exploiter pour remplacer nos animations Vanilla Extract actuelles).

## 3. Inventaire des composants à remplacer

Package Radix utilisés aujourd'hui (`package.json`) → équivalent Base UI, et estimation
de l'effort **en gardant le style et l'implémentation compound actuels**.

| Radix package | Nos composants impactés | Équivalent Base UI | Difficulté | Notes |
|---|---|---|---|---|
| `@radix-ui/react-dialog` | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogBody`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose` | `Dialog` (`@base-ui-components/react/dialog`) | 🟡 Moyen | API quasi 1:1 (`Root/Trigger/Portal/Backdrop→Overlay/Popup→Content/Title/Description/Close`). Renommage `Overlay`→`Backdrop`, `Content`→`Popup`. `asChild`→`render` sur Trigger/Close. |
| `@radix-ui/react-select` | `Select` + 11 sous-composants (`Trigger`, `Content`, `Viewport`, `Item`, `ItemText`, `ItemIndicator`, `Group`, `Label`, `Separator`, `Icon`, `Portal`) | `Select` | 🔴 Élevé | Plus gros composant du kit (11 fichiers). API Base UI restructurée (pas de `Viewport` séparé, `Positioner`+`Popup`, gestion native du placeholder). Nécessite ré-écriture significative du wrapper, tests, stories. |
| `@radix-ui/react-dropdown-menu` | `DropdownMenu` + ~13 sous-composants (trigger, content, item, checkbox item, radio item/group, sub-menu, label, separator, shortcut) | `Menu` (Base UI n'a pas de "DropdownMenu" dédié, `Menu` couvre le cas) | 🔴 Élevé | Plus gros composant après Select. Sous-menus (`Sub`, `SubTrigger`, `SubContent`) existent mais nommage/props différents (`Menu.SubmenuRoot`, `Menu.SubmenuTrigger`). Beaucoup de fichiers à toucher (~15). |
| `@radix-ui/react-popover` | `Popover`, `PopoverTrigger`, `PopoverAnchor`, `PopoverContent` | `Popover` | 🟢 Faible | Petit composant (4 fichiers), API très proche. Bon candidat pour un premier essai/POC. |
| `@radix-ui/react-hover-card` | `HoverCard`, `HoverCardTrigger`, `HoverCardContent` | `PreviewCard` (renommé, pas de `HoverCard` dans Base UI) | 🟢 Faible | Renommage conceptuel (`HoverCard`→`PreviewCard`). API publique non figée : on peut renommer directement notre composant en `PreviewCard` sans se soucier de compatibilité. API proche sinon. |
| `@radix-ui/react-tooltip` | `Tooltip`, `TooltipProvider` | `Tooltip` | 🟢 Faible | ✅ Migré. API quasi identique (`Root/Trigger/Portal/Positioner/Popup/Arrow`, `Provider` conservé). |
| `@radix-ui/react-tabs` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | `Tabs` | 🟢 Faible | ✅ Migré. API quasi identique. |
| `@radix-ui/react-checkbox` | `Checkbox` | `Checkbox` | 🟢 Faible | API proche, attention au changement de comportement "unchecked state" natif (breaking change signalé dans le changelog Base UI) à valider avec nos tests. |
| `@radix-ui/react-switch` | `Switch` | `Switch` | 🟢 Faible | API quasi identique. Même remarque que `Checkbox` sur l'état "unchecked". |
| `@radix-ui/react-radio-group` | `RadioGroup`, `RadioItem` | `RadioGroup` | 🟢 Faible | API très proche (`Root`/`Item`/`Indicator`). |
| `@radix-ui/react-label` | `TextFieldLabel`, `TextAreaLabel`, `Legend`/`Fieldset` (usage indirect) | `Field`/`Fieldset` (Base UI a un composant `Field` complet avec `Label`, `Description`, `Error`, `Validity`) | 🟡 Moyen | Base UI n'a pas de package `Label` isolé équivalent — il est intégré dans `Field`. Cela peut être une opportunité (validation native) mais impose de revoir notre couche `forms/_shared` (`HelperText`, `Fieldset`, `Legend`) plutôt qu'un simple remplacement 1:1. |
| `@radix-ui/react-slot` | Non importé directement (le pattern `asChild` est géré en interne par chaque primitive Radix) | Remplacé par la prop `render` sur chaque composant Base UI | 🟢 Faible | Rien à migrer explicitement ; disparaît naturellement avec la bascule `asChild`→`render`. |

Composants **hors Radix**, non concernés par la migration : `Button`, `IconButton`,
`Badge`, `Card`, `Callout`, `Skeleton`, `Toast` (custom, pas Radix), `Table`, `Typography`,
`Icon`, `Box`/`Flex`/`Grid`, `TextField`/`TextArea` (utilisent seulement `Label` en Radix,
cf. ligne `react-label` ci-dessus), `Calendar`/`DatePicker` (basés sur `react-day-picker`,
indépendant de Radix).

## 4. Effort global estimé

Grâce à la couverture de tests existante (Vitest + Testing Library sur chaque
sous-composant), le "risque de régression" ci-dessous est à lire comme un risque
**détecté rapidement par la CI**, pas un risque de bug silencieux en production. Il reste
indicatif de la quantité de tests à adapter/réécrire (changements d'attributs `data-*`,
de rôles ARIA, de comportement clavier), pas d'un danger réel pour la stabilité.

| Composant | Fichiers touchés (approx.) | Difficulté | Risque de régression (avant tests) | Filet de sécurité tests existants |
|---|---|---|---|---|
| Popover | 4 | 🟢 Faible | Faible | 3 fichiers de tests |
| Tooltip | 2 | 🟢 Faible | Faible | 1 fichier de tests |
| Tabs | 4 | 🟢 Faible | Faible | 1 fichier de tests |
| Checkbox | 2 | 🟢 Faible | Faible (vérifier état "unchecked") | 1 fichier de tests |
| Switch | 2 | 🟢 Faible | Faible (idem) | 1 fichier de tests |
| RadioGroup | 3 | 🟢 Faible | Faible | 2 fichiers de tests |
| HoverCard → PreviewCard | 3 | 🟢 Faible | Faible (renommage libre, API non publiée) | 3 fichiers de tests |
| Label / Field (TextField, TextArea, Fieldset, Legend) | ~8 | 🟡 Moyen | Moyen (refonte de la couche forms partagée) | ~7 fichiers de tests |
| Dialog | 9 | 🟡 Moyen | Faible/Moyen (portails, focus trap, animations) | 1 fichier de tests (à étoffer avant migration) |
| DropdownMenu | ~15 | 🔴 Élevé | Moyen (sous-menus, raccourcis clavier, checkbox/radio items) | ~13 fichiers de tests |
| Select | ~13 | 🔴 Élevé | Moyen (composant le plus complexe, très utilisé) | à vérifier, composant le plus critique à tester avant/après |

En gardant les styles Vanilla Extract actuels, **la majorité des CSS reste réutilisable**
(mêmes sélecteurs `data-state`/`data-disabled`) : le coût est surtout dans les wrappers
TS/TSX (props, ref forwarding, `asChild`→`render`) et les tests/stories associés
(chaque composant a ses tests Vitest + stories Storybook à mettre à jour). La difficulté
technique (🟢/🟡/🔴) reste donc le meilleur indicateur d'effort ; le risque de régression
réel est atténué partout où la couverture de tests est bonne (quasi tous les composants),
et c'est surtout `Dialog` (1 seul fichier de test aujourd'hui) qui mériterait d'être
renforcé en tests **avant** la migration plutôt qu'après.

## 5. Recommandation

1. **Oui, migrer vers Base UI**, tant que la librairie est encore jeune : le coût ne fera
   qu'augmenter avec le nombre de composants et de consommateurs externes. L'absence d'API
   publiée aujourd'hui rend le moment idéal : aucun consommateur à préserver, aucune
   dépréciation à gérer.
2. **Approche incrémentale, package par package**, en s'appuyant sur la CI (Vitest) comme
   filet de sécurité à chaque étape plutôt que sur une compatibilité API à maintenir :
   - Étape 1 (POC, faible risque) : `Popover`, `Tooltip`, `Tabs`, `RadioGroup`, `Checkbox`,
     `Switch`. Valide l'approche de migration et les conventions internes (types, `render`).
   - Étape 2 : `HoverCard` → `PreviewCard` (renommage direct, sans alias), `Dialog` (en
     renforçant ses tests avant migration).
   - Étape 3 : revoir la couche `Label`/`Field` partagée (`forms/_shared`), impacte
     `TextField`, `TextArea`, `Fieldset`, `Legend`.
   - Étape 4 (plus gros chantier) : `Select`, `DropdownMenu`.
3. Remplacer directement `@radix-ui/*` par `@base-ui-components/react` composant par
   composant (pas besoin de faire cohabiter les deux longtemps ni de garder une couche de
   compatibilité), et lancer `yarn test` après chaque étape pour valider avant de passer à
   la suivante.
4. Profiter du renommage libre pour clarifier certains noms internes en même temps que la
   migration technique (ex : `HoverCard` → `PreviewCard`), sans contrainte de rétro-
   compatibilité puisque rien n'est encore publié.
