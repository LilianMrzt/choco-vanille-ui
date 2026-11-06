# Instructions de contribution

## Portée

Ce dépôt contient `@choco-vanille/ui`, une librairie de composants React,
pas une application. Ces instructions définissent le cadre de contribution
pour sa v2. Les références thématiques du skill les complètent sans les dupliquer.

| Intervention | Référence |
| --- | --- |
| Modifier l'organisation, les imports, l'API publique ou le packaging | [Architecture de la librairie](architecture.md) |
| Créer ou décomposer un composant, hook ou utilitaire ; documenter son contrat et ses interactions | [Conventions des composants](components.md) |
| Concevoir des styles ou une API de personnalisation visuelle | [Styles](styles.md) |
| Créer ou modifier une story et ses contrôles | [Stories Storybook](tests-storybook.md#storybook) |
| Écrire des tests et choisir les vérifications à exécuter | [Tests](tests-storybook.md#tests) |
| Améliorer la qualité du code et des exemples Storybook | [Qualité du code](quality.md) |

Lire les consignes des domaines concernés avant de modifier leur code.
Chaque règle possède une référence responsable dans ce skill autonome.
Modifier cette référence lorsqu'une convention évolue ; ne pas maintenir
de copie parallèle dans les instructions d'entrée ou dans l'agent.
L'accès aux fichiers `AGENTS.md` et aux consignes du dépôt ne nécessite aucune
autorisation préalable ; les consulter directement avant toute contribution.
Les configurations exécutables font foi pour les options des outils.
Ne pas les affaiblir pour contourner une erreur ; signaler les contradictions
avec le contrat attendu avant de le modifier.

## Méthode de travail

- Examiner le code et rechercher les composants, types, hooks et utilitaires
  existants avant d'en créer.
- Fournir la solution la plus simple qui couvre entièrement le besoin.
  Prévoir des frontières adaptées à l'architecture cible, sans créer de
  fonctionnalité, d'abstraction, de dépendance ou de dossier par anticipation.
- Avancer de façon incrémentale. Ne pas ajouter de démonstration, catalogue,
  infrastructure de tests ou automatisation de publication sans besoin explicite.
- Limiter les modifications à la demande et préserver les changements locaux.
  Ne pas corriger des problèmes indépendants.
- Les conventions v2 sont la cible des créations et migrations demandées.
  Le code v1 renseigne le comportement et les impacts à traiter, mais ne
  remplace pas ces conventions. Ne pas migrer tout le dépôt implicitement.
- Adapter ensemble les exports, types, comportements, tests, exemples et
  documentation lorsqu'un contrat évolue. Signaler toute rupture de l'API
  publique ; ne pas maintenir une compatibilité obsolète sans exigence explicite.
- Supprimer le code, les imports et les ressources rendus inutiles. Après les
  modifications ou déplacements, supprimer les dossiers devenus vides dans le
  périmètre concerné, après avoir vérifié aussi leurs éventuels fichiers cachés.
- Utiliser pnpm et conserver son lockfile à jour. Réutiliser les outils et
  dépendances existants avant d'en ajouter ; justifier tout ajout.
- Traiter explicitement les erreurs. Ne pas masquer une panne par une valeur
  vide, un succès apparent ou une capture trop large.
- Ne jamais committer de secret ni de configuration locale sensible.
- Garder les instructions génériques. Réserver les commandes et procédures
  opérationnelles à la documentation du projet.

## Documentation

- Conserver un README de librairie professionnel, centré sur son objectif,
  l'installation, les prérequis, l'utilisation, la compatibilité et les
  éventuelles étapes d'intégration des styles.
- Modifier le README seulement lorsque ces informations deviennent inexactes
  ou incomplètes, ou sur demande explicite. Une refactorisation interne ne
  justifie pas à elle seule sa modification.
- Documenter les conventions dans les consignes thématiques responsables,
  pas dans le README. Ne pas en faire un journal d'évolutions.
- Utiliser l'API publique dans les exemples destinés aux consommateurs ;
  ne pas exposer des chemins d'implémentation privés.

## TypeScript et style de code

### Typage

- Conserver le mode strict. Ne pas introduire de `any`, de double assertion ou
  d'assertion qui masque une donnée non vérifiée. Ne pas recopier une signature
  générique de dépendance pour contourner son typage ; préserver son inférence.
- Vérifier les accès indexés potentiellement absents et distinguer propriété
  absente et valeur `undefined`. Les options supplémentaires telles que
  `exactOptionalPropertyTypes` et `noUncheckedIndexedAccess` ne sont pas
  activées actuellement ; ne pas prétendre qu'elles le sont.
- Utiliser `type` et `import type`. Réserver `interface` aux augmentations
  de modules dans les fichiers de déclaration.
- Déclarer explicitement le retour des fonctions exportées et des fonctions
  internes non triviales ; les annotations de composants suivent les
  consignes de création.
- Déclarer les props et objets de résultat avec `Readonly`.
- Modéliser les états par des unions explicites, discriminées si nécessaire.
  Ne déclarer que les états réellement produits.

### Nommage et écriture

| Élément | Convention |
| --- | --- |
| Composant, contexte React et type | `PascalCase` |
| Fonction, hook et variable | `camelCase` |
| Constante exportée | `SCREAMING_SNAKE_CASE`, sauf contrat public nommé autrement |
| Dossier | `kebab-case` |

- Utiliser des noms explicites, sans abréviation obscure ni nom fourre-tout.
  Nommer les fonctions par un verbe et leur objet ; préfixer les booléens
  par `is`, `has`, `can` ou `should`, sans négation.
- Respecter les configurations applicables sans reformater des fichiers
  indépendants. Actuellement, ESLint impose quatre espaces et l'absence de
  points-virgules dans les sources, tandis que Prettier configure deux espaces
  et des points-virgules. Signaler ce conflit lors d'un travail de formatage ;
  son harmonisation nécessite une modification explicite des configurations.
- Déclarer les fonctions avec `const` et une fonction fléchée, y compris
  les composants, hooks, utilitaires et callbacks.
- Utiliser des comparaisons strictes, les propriétés raccourcies et des
  accolades pour les blocs.
- Séparer les étapes logiques par une ligne vide et supprimer les imports
  inutilisés. Ne pas utiliser d'alias non configuré.
- En JSX multiligne, placer une prop par ligne et privilégier un ordre
  alphabétique lorsque l'ordre ne change pas le comportement des spreads.
- Ne pas livrer de journal de débogage ni de point d'arrêt.

## Critères de livraison

- Le comportement demandé est complet, y compris ses états d'échec et ses
  conséquences sur les consommateurs de l'API.
- Les vérifications pertinentes passent sans affaiblissement du typage,
  des règles de qualité ni des seuils configurés.
- La documentation et les exemples reflètent le comportement livré.
- Toute vérification non exécutée, limite restante ou dépendance bloquante
  est indiquée explicitement.
