# Architecture de la librairie

Ce fichier définit les responsabilités, les dépendances et l'API distribuée.
L'anatomie et les contrats React relèvent des
[conventions des composants](components.md).

## Organisation

Les composants publics vivent dans
`src/components/<category>/<component-name>/`, classés par responsabilité.

| Catégorie | Responsabilité |
| --- | --- |
| `actions` | Actions et contrôles de bascule |
| `data-display` | Présentation de données et de contenus |
| `feedback` | Retours d'état, progression et notifications |
| `forms` | Saisie, sélection et édition de valeurs |
| `foundation` | Primitives de base : icônes et typographie |
| `layout` | Mise en page et structure visuelle |
| `navigation` | Navigation, repérage et parcours par étapes |
| `overlay` | Surfaces superposées et contenus contextuels |
| `surfaces` | Conteneurs de contenu et sections dépliables |

- Conserver ce classement pour les primitives et les compositions publiques.
  Ne pas introduire de branches `design-system` et `custom` sans besoin explicite.
- Le contrat, les tokens et les utilitaires de thème vivent dans `src/theme/`.
  Le provider et ses hooks associés vivent actuellement dans
  `src/components/theme-provider/`. Conserver cette frontière tant que leur
  migration n'est pas demandée et préserver leurs exports publics.
- Créer une catégorie avec son premier composant. Un squelette explicitement
  demandé peut réserver des catégories avec des `index.ts` vides, pas des `.gitkeep`.
- Garder les stories séparées des implémentations, selon les
  [conventions Storybook](tests-storybook.md#storybook).
- Garder la configuration Storybook dans `.storybook/` et exclure les stories
  des déclarations et du package distribué.

## Responsabilités et indépendance

- Garder les composants indépendants du métier, du routeur, du réseau,
  du stockage et du système de traduction des applications.
  Recevoir les données, contenus et actions par leur contrat React.
- Séparer les primitives visuelles, la coordination React et les utilitaires
  purs. Un utilitaire pur ne dépend ni de React ni du DOM.
- Un provider sert une configuration ou un état réellement partagé ;
  ne pas imposer de provider global sans nécessité.
- Ne pas accéder au DOM ou au stockage à l'import du module ni durant
  un rendu serveur. Préserver l'hydratation et nettoyer les effets.
  Une synchronisation avec le document ou le stockage, comme celle du thème,
  doit rester explicite dans le contrat du provider concerné.
- Ne pas installer de listener ni modifier le document à l'import.
  `src/theme/index.ts` importe actuellement le contrat global et
  `globalStyles.css.ts`. Ne pas étendre ces effets à d'autres composants.
  Leur suppression ou isolation exige une migration explicite de l'intégration
  consommateur ; ne pas présenter l'existant comme dépourvu de reset global.

## Imports et API publique

- Le point d'entrée `src/index.ts` expose uniquement les symboles destinés
  aux consommateurs. Les composants passent par `src/components/index.ts`,
  les barrels de catégorie et le barrel individuel de leur composant.
- Réserver les réexportations aux fichiers `index.ts`. Le barrel individuel
  transforme l'export par défaut du composant en export nommé.
  Exposer explicitement les types avec `export type`.
- Les modules de types peuvent importer des types partagés sans les réexporter.
  Ne pas rendre les détails privés publics pour faciliter un test ou une story.
- Importer les fichiers privés d'une unité directement, jamais via son propre
  barrel. Éviter les cycles et les imports du point d'entrée racine depuis
  les implémentations.
- Utiliser les alias configurés (`@components`, `@theme`, `@constants`,
  `@utils`, `@hooks`, `@resources`, `@stories`, `@tests`, `@scripts`, selon
  l'outil). `@/` est également configuré ; `@src` ne l'est pas.
  ESLint interdit actuellement les imports relatifs dans les sources hors
  exceptions Storybook ; employer les alias pour les fichiers privés aussi.
- Les tests et stories utilisent leurs alias dédiés pour les aides internes.
  Ne pas supposer l'existence d'un barrel `@stories` ou `@utils` :
  seuls leurs sous-chemins sont déclarés dans TypeScript.
- Garder les alias nécessaires cohérents entre `tsconfig.json`,
  `vite.config.ts`, `vitest.config.ts` et `.storybook/main.ts`.
  Il n'existe pas de configuration partagée `config/vite.ts`.
- Les déclarations distribuées ne doivent pas dépendre des alias privés.
  Les consommateurs utilisent uniquement les exports déclarés du package,
  jamais des chemins d'implémentation.
- Traiter les props, types, comportements et possibilités de personnalisation
  documentés comme des contrats publics ; ne pas renommer un symbole public
  simplement pour refléter l'organisation interne.

## Dépendances et distribution

- Garder React et ses sous-modules externes au bundle. Respecter les versions
  React annoncées dans les peer dependencies, actuellement React 19.
  Ne pas embarquer une seconde copie de React.
- Base UI est la référence pour les interactions complexes. Il est déjà
  installé ; ses règles d'intégration relèvent des conventions des composants.
  Ne pas ajouter de bibliothèque concurrente pour une interaction couverte.
  Ne pas remplacer implicitement les intégrations spécialisées existantes.
- Utiliser Vanilla Extract et les addons effectivement adoptés pour les styles,
  selon les [conventions de styles](styles.md).
  Ne pas ajouter de moteur concurrent ou de framework applicatif par anticipation.
- Toute dépendance runtime doit être déclarée et son externalisation cohérente
  avec le build. Déclarer en peer dependency ce qui doit être partagé avec
  l'application et vérifier sa compatibilité réelle.
- Préserver les sorties ESM et CommonJS actuelles, les déclarations correspondant
  à l'API JavaScript, les chemins des exports et la liste des fichiers publiés.
  Ne distribuer ni tests, ni stories, ni configuration locale.
- Préserver les imports CSS par module et la règle `sideEffects` des styles.
  Le sous-chemin `@choco-vanille/ui/styles.css` est une intégration publique
  existante, générée par le build ; ne pas le supprimer implicitement.
  Ne pas agréger les composants dans un objet de catalogue public ni imposer
  l'import du CSS agrégé depuis le barrel racine.
- Un import sélectif doit permettre d'exclure les composants inutilisés
  et leurs styles dans un build consommateur réel.
- Distribuer les styles et ressources sans alias privé ni compilation des sources
  par l'application. Documenter les éventuelles étapes d'intégration nécessaires.
- Ne pas ajouter de format de sortie, sous-chemin public ou automatisation
  de publication sans besoin explicite.
