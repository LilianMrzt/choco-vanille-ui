# Conception : couleurs de theme structurees par objets

**Statut : contrat de migration v2 implemente.**

Ce document decrit le nouveau contrat et les correspondances de migration.
Les conventions maintenues du theme vivent dans la reference `styles.md` du skill.

## Objectif et perimetre

Remplacer les cles concatenees (`primaryHover`, `primarySubtleForeground`)
par des objets explicites (`primary.hover`, `primary.subtleForeground`).
La structure doit etre identique dans les valeurs des themes et dans `vars`.
Sous `color`, chaque groupe est un seul objet dont toutes les proprietes sont
des couleurs. Aucun groupe ne contient de sous-objet : `surface.elevated`,
par exemple, est une valeur, pas un objet contenant `main`.

Conserver les 140 feuilles de couleur actuelles, leurs valeurs, leurs couples
de contraste et leurs usages visuels. Ajouter la feuille `border`
demandee dans chacune des 13 familles et trois niveaux de bordures grises,
soit 156 feuilles au total.
Ne pas ajouter d'autres couleurs ou etats, ni recalculer les nuances.

La palette primitive `palette`, les palettes de texte enrichi `editorColors`
(deja imbriquees), les autres categories de tokens et les intentions publiques
des composants ne changent pas.

## 1. Structure cible

### Accents : un contrat commun pour les 13 familles

Les 13 familles gardent leurs noms : `primary`, `secondary`, `neutral`,
`success`, `warning`, `info`, `danger`, `accentPurple`, `accentPink`,
`accentOrange`, `accentTeal`, `accentCyan`, `accentIndigo`.

Le terme **accent** couvre ici toutes ces familles, pas seulement celles
dont le nom commence par `accent` :

| Role | Familles |
| --- | --- |
| Accents principaux et neutre | `primary`, `secondary`, `neutral` |
| Accents de statut | `success`, `info`, `warning`, `danger` |
| Accents de couleur | `accentPurple`, `accentPink`, `accentOrange`, `accentTeal`, `accentCyan`, `accentIndigo` |

Toutes partagent strictement la meme structure, dans les deux themes :
`main`, `hover`, `pressed`, `foreground`, `subtle`, `subtleHover`,
`subtlePressed`, `subtleForeground`, `border`, `subtleBorder`.
Definir un type commun `ThemeColorAccent` dans `tokens\colors\types\index.ts`
et l'utiliser pour verifier les 13 familles, sans variantes de structure
selon leur role. Ce contrat est readonly et ses dix valeurs sont des `string`.
Les valeurs litterales des themes restent preservees via `satisfies`.
Le groupe `text`, les surfaces et les bordures grises ne sont pas des accents
et gardent leurs propres proprietes.

Chaque famille contient exactement dix feuilles, toutes au meme niveau :

```ts
primary: {
    main: palette.brand[600],
    hover: palette.brand[700],
    pressed: palette.brand[800],
    foreground: palette.neutral[0],
    subtle: palette.brand[50],
    subtleHover: palette.brand[100],
    subtlePressed: palette.brand[200],
    subtleForeground: palette.brand[800],
    border: palette.brand[600],
    subtleBorder: palette.brand[600],
},
```

`main` est la valeur au repos, `hover` au survol et `pressed` a la pression
ou a l'etat actif selon le composant. `foreground` est la couleur du texte
ou de l'icone associee au traitement ; ce n'est pas un alias du texte global.

Tous les tokens d'etat `active` deviennent `pressed`, y compris dans `link` :
`primaryActive` devient `primary.pressed`, `primarySubtleActive` devient
`primary.subtlePressed` et `linkActive` devient `link.pressed`.
Les valeurs restent identiques. Ce renommage concerne les tokens et leurs
references, pas les selecteurs CSS `:active`, les attributs `data-active`,
les props ou les etats selectionnes des composants.

`subtle` est une valeur de couleur, pas un objet. Ses etats et son foreground
restent directement dans la famille : `primary.subtleHover`,
`primary.subtlePressed` et `primary.subtleForeground`.
Ne pas ajouter de niveau `solid` ou de sous-objet `subtle`.

`border` designe la bordure du traitement standard ; `subtleBorder` celle du
traitement discret. Pour initialiser ce nouveau token sans inventer de nuance,
reprendre pour `border` la valeur du `subtleBorder` existant de chaque famille,
dans chaque theme, comme dans l'exemple ci-dessus. Ce sont deux roles distincts,
meme si leurs valeurs initiales sont identiques ; pas de derivation automatique
lors des overrides. Les styles existants gardent leurs associations de tokens :
l'ajout de `border` ne declenche pas un remplacement general des bordures.

Tous les accents restent directement sous `color` : `color.primary.main`,
`color.success.main`, `color.accentPurple.main`. Leur classification ne cree
aucun conteneur `accents`, `status` ou `accent` supplementaire.

### Surfaces et tokens transversaux

Regrouper aussi les ensembles existants qui partagent une responsabilite :

```ts
{
    currentColor: 'currentColor',
    transparent: 'transparent',
    background: palette.neutral[50],
    text: {
        primary: palette.neutral[950],
        secondary: palette.neutral[600],
        tertiary: palette.neutral[550],
    },
    surface: {
        main: palette.neutral[0],
        foreground: palette.neutral[950],
        elevated: palette.neutral[0],
        elevatedForeground: palette.neutral[950],
        muted: palette.neutral[100],
        mutedForeground: palette.neutral[550],
    },
    overlay: 'rgb(0 0 0 / 0.5)',
    link: {
        main: palette.brand[600],
        hover: palette.brand[700],
        pressed: palette.brand[800],
    },
    border: {
        subtle: palette.neutral[200],
        muted: palette.neutral[300],
        main: palette.neutral[450],
        strong: palette.neutral[500],
        stronger: palette.neutral[600],
    },
    focusRing: palette.brand[600],
    highlight: {
        main: palette.amber[200],
        foreground: palette.amber[900],
    },
    skeleton: {
        base: palette.neutral[200],
        highlight: palette.neutral[300],
    },
}
```

Cet extrait montre les 26 feuilles transversales du theme clair ; les
13 familles interactives s'ajoutent a cet objet, sans autre regroupement.
Les tokens isoles restent des chaines : pas d'objet `{ main }` artificiel
pour `background`, `overlay` ou `focusRing`.
La meme regle s'applique a tous les objets de couleurs semantiques :
un groupe, puis ses valeurs directes. Les groupes transversaux n'inventent
pas d'etats `hover` ou `pressed` lorsqu'ils n'en possedent pas.

### Hierarchie du texte

Le groupe `text` exprime explicitement les trois niveaux de texte :
`text.primary`, `text.secondary`, `text.tertiary`. Il remplace respectivement
`foreground`, `foregroundMuted`, `foregroundSubtle`, sans modifier les valeurs.
Dans le theme sombre, ces niveaux conservent respectivement
`palette.neutral[100]`, `[300]` et `[400]`.

Les proprietes `foreground` des familles, surfaces et highlights restent
nommees ainsi : elles designent le contenu associe a un fond, pas un niveau
de hierarchie du texte. Il n'y a pas de groupe global `foreground` en parallele.

### Bordures grises

Le groupe global `border` offre cinq intensites, de la plus discrete a la plus
marquee. Il reste distinct des bordures colorees `primary.border`, etc.
Les valeurs suivantes sont proposees pour les nouveaux niveaux ; `main` et
`strong` conservent exactement les valeurs existantes :

| Token | Theme clair | Theme sombre | Usage |
| --- | --- | --- | --- |
| `border.subtle` | `palette.neutral[200]` | `palette.neutral[700]` | Separateurs decoratifs tres discrets |
| `border.muted` | `palette.neutral[300]` | `palette.neutral[600]` | Delimitation legere de surfaces |
| `border.main` | `palette.neutral[450]` | `palette.neutral[500]` | Bordure standard existante |
| `border.strong` | `palette.neutral[500]` | `palette.neutral[400]` | Bordure renforcee existante |
| `border.stronger` | `palette.neutral[600]` | `palette.neutral[300]` | Delimitation fortement marquee |

Les niveaux discrets ne garantissent pas 3:1 et ne doivent pas etre l'unique
indice permettant d'identifier un controle ou son etat. Pour une bordure
fonctionnelle, verifier 3:1 sur la surface reelle et choisir un niveau suffisant.
Ne pas remplacer automatiquement les bordures existantes par les nouveaux
niveaux, ni remplacer le focus colore par une bordure grise.

## 2. Contrats TypeScript

Tous les types restent dans `src\theme\tokens\colors\types\index.ts`.
Les modules de valeurs ne declarent pas de types ; seuls les barrels
`index.ts` reexportent les contrats publics.

| Type | Cible |
| --- | --- |
| `LightColors` | Structure et valeurs litterales du theme clair |
| `ThemeColors` | Tokens isoles `string` ou groupes de valeurs `string`, readonly |
| `ThemeColorOverrides` | Tokens et groupes optionnels, proprietes de chaque groupe optionnelles, le tout readonly |
| `ThemeColor` | Union des tokens isoles et des chemins `groupe.propriete`, sans profondeur supplementaire |
| `ThemeColorValue` | Alias de `ThemeColor`, mots-cles inclus |
| `ThemeColorIntent` | Noms des 13 familles interactives, sans chemin de feuille |
| `ThemeColorAccent` | Contrat readonly commun aux dix proprietes de chaque accent, toutes de type `string` |

`keyof LightColors` ne suffit plus pour `ThemeColor` et le mapped type
superficiel actuel ne suffit plus pour `ThemeColors`. Deriver les chemins
et la transformation des feuilles du schema reel, sans seconde liste manuelle
de 156 entrees ni dependance supplementaire. Limiter les types utilitaires
au besoin de cet arbre de couleurs ; ne pas construire un framework de tokens.
La profondeur etant bornee, ne pas introduire de types recursifs generiques
pour accepter une imbrication arbitraire.

Verifier `darkColors` avec `satisfies ThemeColors`, tout en conservant ses
valeurs litterales. Un theme complet exige toutes les feuilles ; les
overrides du provider, eux, n'exigent que les feuilles surchargees.

## 3. API de consommation

### Styles et valeurs brutes

```ts
import { lightTheme, vars } from '@choco-vanille/ui'

const primaryValue = lightTheme.color.primary.main
const primaryReference = vars.color.primary.main
const subtleTextReference = vars.color.primary.subtleForeground
```

Les styles internes continuent d'importer le contrat directement pour eviter
les cycles. Les exemples consommateurs utilisent l'entree publique.

Les acces dynamiques deviennent des acces d'objets :
`vars.color[COLOR_INTENT_TOKENS[color]].hover`, et non une concatenation
comme `vars.color[\`${COLOR_INTENT_TOKENS[color]}Hover\`]`.

### Props de couleur des primitives

Box, Typography et Icon acceptent directement des valeurs CSS, notamment
n'importe quelle reference de variable CSS, sans resolution de nom de token :

```tsx
<Box backgroundColor={vars.color.surface.main} color={vars.color.text.primary} />
<Typography color={vars.color.primary.main}>Information</Typography>
<Icon color="var(--app-icon-color)" />
```

Ni `"primary"` ni `"primary.main"` ne sont resolus par ces primitives.
Les couleurs litterales, `currentColor` et `transparent` restent des valeurs
CSS possibles. Les props explicites sont appliquees inline ; `style` du
consommateur prime. Une couleur omise ne cree aucune declaration inline.
Ne pas passer de prop couleur lorsqu'un etat CSS doit controler la propriete.
Les props heritees de Box suivent ce contrat.

Les API independantes qui restent basees sur les tokens (Link, Separator,
la couleur SvgImage et le fond Drawer) utilisent les chemins de feuilles,
par exemple `color="primary.main"`. `createColorVariants` parcourt les
feuilles de `vars.color` et produit une variante par chemin. Le meme
parcours interne sert aux overrides et aux references documentees.

### Intentions des composants

Les contrats independants restent inchanges, notamment
`Button color="destructive"` et `Badge color="purple"`.
`COLOR_INTENT_TOKENS` continue de traduire ces intentions en `danger` ou
`accentPurple` ; seules les lectures des feuilles changent ensuite.
Ne pas transformer les intentions en chemins de tokens.

### Overrides du provider

```tsx
<ThemeProvider
    tokens={{
        primary: {
            main: '#0f766e',
            hover: '#115e59',
            subtleForeground: '#134e4a',
        },
        surface: {
            elevated: '#ffffff',
        },
    }}
/>
```

Une surcharge partielle ne remplace jamais une branche complete : seules
les feuilles fournies deviennent des declarations CSS inline ; les autres
restent heritees du theme. Aucun calcul automatique de foreground ou d'etat.
Les overrides suivent la meme profondeur bornee : un objet de proprietes
directes par groupe, jamais de sous-objet supplementaire.

Les deux chemins actuels du provider (`useThemeTokenStyles` pour le sous-arbre,
`useThemeDocumentScope` pour le document) doivent consommer la meme conversion
feuille vers variable. Ignorer les valeurs optionnelles `undefined`, ne jamais
serialiser un objet en `[object Object]`. Conserver restauration au nettoyage,
mise a jour des overrides, isolation des portees et fonctionnement SSR.
Les entrees invalides a l'execution doivent suivre la politique d'erreur du
depot, pas etre remplacees silencieusement par une couleur de secours.

## 4. Variables CSS et rupture d'API

Conserver la generation existante de noms par `path.join('-')`.
Vanilla Extract sait representer des contrats imbriques ; il n'est pas
necessaire de maintenir un second contrat plat ou une table d'alias legacy.

| Actuel | Objet cible | Variable CSS cible |
| --- | --- | --- |
| `primary` | `primary.main` | `--color-primary-main` |
| `primaryHover` | `primary.hover` | `--color-primary-hover` |
| `primaryActive` | `primary.pressed` | `--color-primary-pressed` |
| `primaryForeground` | `primary.foreground` | `--color-primary-foreground` |
| `primarySubtle` | `primary.subtle` | `--color-primary-subtle` |
| `primarySubtleHover` | `primary.subtleHover` | `--color-primary-subtleHover` |
| `primarySubtleActive` | `primary.subtlePressed` | `--color-primary-subtlePressed` |
| `primarySubtleForeground` | `primary.subtleForeground` | `--color-primary-subtleForeground` |
| `primarySubtleBorder` | `primary.subtleBorder` | `--color-primary-subtleBorder` |
| Nouveau token | `primary.border` | `--color-primary-border` |
| `foreground` | `text.primary` | `--color-text-primary` |
| `foregroundMuted` | `text.secondary` | `--color-text-secondary` |
| `foregroundSubtle` | `text.tertiary` | `--color-text-tertiary` |
| `surface` | `surface.main` | `--color-surface-main` |
| `surfaceElevated` | `surface.elevated` | `--color-surface-elevated` |
| `surfaceElevatedForeground` | `surface.elevatedForeground` | `--color-surface-elevatedForeground` |
| `surfaceMuted` | `surface.muted` | `--color-surface-muted` |
| `surfaceMutedForeground` | `surface.mutedForeground` | `--color-surface-mutedForeground` |
| `linkActive` | `link.pressed` | `--color-link-pressed` |
| `borderStrong` | `border.strong` | `--color-border-strong` |
| Nouveau token | `border.subtle` | `--color-border-subtle` |
| Nouveau token | `border.muted` | `--color-border-muted` |
| Nouveau token | `border.stronger` | `--color-border-stronger` |
| `highlightForeground` | `highlight.foreground` | `--color-highlight-foreground` |
| `skeletonBase` | `skeleton.base` | `--color-skeleton-base` |
| `focusRing` | `focusRing` | `--color-focusRing` (inchangee) |

Pour chaque famille, appliquer les neuf correspondances :
la racine vers `.main`, `Hover` vers `.hover`, `Active` vers `.pressed`,
`Foreground` vers `.foreground`, puis `Subtle` vers `.subtle`,
`SubtleHover` vers `.subtleHover`, `SubtleActive` vers `.subtlePressed`,
`SubtleForeground` vers `.subtleForeground` et `SubtleBorder` vers `.subtleBorder`.
Ajouter la dixieme feuille `.border` selon la regle d'initialisation de la section 1.
Les regroupements transversaux suivent exactement la structure de la section 1.

Il s'agit d'une rupture des valeurs JS, des types, des props basees sur les
tokens, des overrides du provider et des noms CSS concernes.
Pas d'alias conservant simultanement les anciens noms. Les variables dont le
chemin ne change pas et les variables `--editorColors-*` restent identiques.

## 5. Migration prevue

1. Caracteriser les 140 feuilles actuelles et leurs valeurs clair/sombre ;
   etablir une correspondance exhaustive ancien token vers nouveau chemin,
   puis ajouter les 13 feuilles `.border` des familles et les trois niveaux
   de bordures grises avec leurs valeurs initiales explicites.
2. Restructurer les deux objets de couleurs et adapter les types dans
   `types\index.ts`, sans modifier les valeurs de palette ni `editorColors`.
3. Adapter ensemble le parcours des feuilles, les props CSS libres des primitives
   et les variantes des autres API basees sur les tokens,
   et la conversion des overrides des deux portees du provider.
4. Migrer les styles, les intentions dynamiques, les props, les valeurs par
   defaut, les constantes de controles et les tests de tous les consommateurs.
5. Adapter les stories Colors et CSS Variables, les tableaux et snippets
   generes, les integrations CSS Modules/Tailwind/MUI/styled-components/
   Vanilla Extract, la documentation publique et les exemples du provider.
6. Faire evoluer la reference de conventions `styles.md` : elle impose
   actuellement un contrat plat. La remplacer au moment de l'implementation,
   pas avant ; le present document n'est pas une seconde convention permanente.
7. Verifier la distribution publique, puis publier la correspondance de
   migration consommateur avec la rupture clairement annoncee.

Ne pas profiter de cette intervention pour migrer l'anatomie de tous les
composants, renommer les intentions ou modifier les couleurs editoriales.

## 6. Preuves attendues

| Surface | Critere |
| --- | --- |
| Schema | Exactement 156 feuilles dans chaque theme et dans `vars.color`, memes chemins ; dix feuilles directes par famille interactive, trois niveaux `text`, cinq niveaux `border`, aucun objet dans un groupe |
| Valeurs | Les 140 feuilles migrees conservent leurs valeurs ; les 13 nouvelles feuilles `.border` reprennent initialement le `subtleBorder` de leur famille et de leur mode ; les trois nouvelles bordures grises suivent le tableau propose |
| Types | Tokens isoles et chemins `groupe.propriete` acceptes ; branches seules, chemins plus profonds, anciens noms concaténés et overrides avec sous-objets rejetes |
| Primitives | References CSS internes/externes et couleurs libres acceptees, priorite de `style`, aucune valeur inline ajoutee si la prop est omise |
| Variantes | Pour les API restant basees sur les tokens : une variante par feuille, valeur CSS toujours une chaine, mots-cles inclus |
| Intentions | Mappings conserves pour les familles, foregrounds et etats solid/subtle |
| Overrides | Surcharge partielle des proprietes directes d'un groupe, mise a jour, retrait, restauration et portees document/sous-arbre |
| CSS | Noms conformes aux chemins, absence des anciens alias renommes et de `[object Object]`, scopes clair/sombre/systeme conserves |
| Accessibilite | Contrastes existants maintenus : foregrounds 4.5:1 et bordures/focus fonctionnels pertinents 3:1 ; intensites grises ordonnees sur les surfaces supportees, niveaux decoratifs documentes sans garantie abusive de contraste |
| Documentation | Tous les chemins et extraits copies correspondent au contrat publie |
| Distribution | Types consommes depuis le package construit, ESM/CJS et CSS fonctionnels sans alias prive |

Lors de l'implementation : tests theme/provider et composants affectes,
typecheck, lint, audit du design system, build de librairie et build Storybook
avec les scripts pnpm existants. Completer par une revue visuelle ciblee des
themes et des etats ; un build Storybook ne remplace pas cette revue.

## 7. Choix proposes et alternatives ecartees

Les choix de cette migration sont explicites : `main` pour le repos, dix feuilles directement dans chaque famille
(dont `subtle`, `subtleHover`, `border` et `subtleBorder`), groupes transversaux
avec uniquement des valeurs directes (dont `surface.elevatedForeground`),
hierarchie `text.primary/secondary/tertiary`, cinq intensites de bordures grises,
valeurs CSS libres pour les primitives, chemins pointes pour les autres API
basees sur les tokens et overrides sous forme d'objets.

Conserver un contrat plat derriere des objets de facade laisserait deux
vocabulaires concurrents. Garder les anciennes chaines dans les props
necessiterait une traduction durable sans benefice pour la cible v2.
Imbriquer seulement `primary` laisserait les autres groupes incoherents.
Ajouter `contrastText`, des etats `disabled` ou des couleurs derivees serait
une evolution fonctionnelle distincte, hors de cette migration.
