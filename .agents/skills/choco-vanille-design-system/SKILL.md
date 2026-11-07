---
name: choco-vanille
description: Creates, migrates, refactors, and reviews the v2 of @choco-vanille/ui. Use for component, theme, public API, styling, test, Storybook, and related library architecture changes.
---

# Choco Vanille v2

Accompagner l'évolution de `@choco-vanille/ui` vers la v2, une librairie React
et non une application. Le skill embarque les conventions complètes et les
procédures pour les appliquer. L'implémentation existante sert à vérifier les
faits et les impacts, pas à imposer les conventions v1.

## Mode d'emploi

Lire les références embarquées ci-dessous avant d'intervenir, puis choisir
le parcours correspondant à la demande, exécuter ses étapes et vérifier son
résultat. Les références font partie du skill et ne dépendent d'aucun fichier
d'instructions extérieur à son dossier.

## Conventions embarquées

Lire systématiquement [Contribution](references/contribution.md), puis les
références nécessaires selon le périmètre. Ne pas traiter les procédures
ci-dessous comme un substitut à leurs règles détaillées.

| Référence | Quand la lire | Couverture |
| --- | --- | --- |
| [Contribution](references/contribution.md) | Toute intervention | Périmètre v2, méthode, documentation, TypeScript, nommage et livraison |
| [Architecture](references/architecture.md) | Organisation, imports, API, dépendances ou distribution | Catégories, frontières, SSR, effets globaux, alias, barrels, ESM/CJS et CSS |
| [Composants](references/components.md) | Création ou modification TypeScript/React | Anatomie, partage, types publics, Base UI, composition, état, performance, accessibilité et JSDoc |
| [Styles](references/styles.md) | Styles, primitives visuelles, thème ou personnalisation | Props visuelles, fichiers CSS, styles partagés, animations, tokens et cascade |
| [Qualité](references/quality.md) | Code TypeScript, TSX, MDX ou extraits consommateur | Imbrication, conditions, sémantique HTML, erreurs et lisibilité |
| [Tests et Storybook](references/tests-storybook.md) | Choix des vérifications, tests, stories ou documentation interactive | Outils, couverture, contrôles, args, snippets, accessibilité et builds |

Suivre également les renvois entre ces références lorsqu'ils concernent le
changement. Les charger à la demande plutôt que toutes pour une correction
locale. Respecter les consignes applicables de l'environnement et vérifier
les faits d'outillage dans les configurations exécutables.

Ces références sont l'unique emplacement des conventions détaillées de la
librairie. Modifier la référence responsable lorsqu'une convention évolue,
sans en recopier les règles dans les instructions d'entrée ou dans l'agent.
Signaler toute contradiction avec l'outillage ou une ancienne documentation
au lieu de choisir silencieusement la règle la moins contraignante.

## Choisir un parcours

| Demande | Parcours |
| --- | --- |
| Ajouter une primitive ou une composition publique | Créer un composant |
| Refactorer une unité ou faire évoluer son API | Migrer un composant |
| Ajouter une interaction complexe ou un compound | Intégrer Base UI |
| Modifier des tokens, une recette ou la personnalisation | Faire évoluer les styles et le thème |
| Créer ou corriger des exemples interactifs | Livrer les tests et les stories |
| Modifier les exports, les formats ou les imports CSS | Vérifier la distribution |

Combiner uniquement les parcours nécessaires. Une correction de story ne
déclenche pas une migration du composant. Une migration de composant inclut
en revanche ses contrats, ses tests et ses exemples affectés.

## Utilisation dans Copilot CLI

Le skill peut être invoqué avec `/choco-vanille`, par exemple :

```text
/choco-vanille Migre Button vers les conventions v2.
```

```text
/choco-vanille Crée un composant Slider avec ses tests et ses stories.
```

```text
/choco-vanille Revois les exports et la distribution des styles de la librairie.
```

Utiliser `/skills` pour consulter les skills disponibles. Après une modification
locale, démarrer une nouvelle session si la version chargée n'est pas actualisée.

## Préparer l'intervention

1. Examiner les changements locaux et isoler le périmètre demandé.
2. Identifier l'entrée publique de l'unité, ses types, ses valeurs par défaut,
   son élément DOM principal et ses consommateurs internes.
3. Lire les styles et le comportement concernés, puis les hooks, utilitaires,
   tests et stories qui permettent de comprendre ce comportement.
4. Rechercher une primitive réutilisable et un composant voisin pertinent.
   Vérifier leurs signatures : une implémentation v1 est un exemple observable,
   pas automatiquement un modèle conforme à la cible.
5. Pour chaque changement de contrat, établir mentalement ou dans la réponse
   une correspondance « existant → cible → impact → preuve attendue ».
   Ne pas créer un fichier de suivi dans le dépôt.

Exemple : si un callback perd son second argument, relever sa signature
publique et son invocation, rétablir la transmission complète et prévoir une
assertion sur les arguments réellement reçus. Une compilation seule ne prouve
pas ce comportement.

## Créer un composant

1. Vérifier qu'aucun composant ou assemblage existant ne couvre le besoin.
   Choisir la catégorie par responsabilité, pas par dépendance technique.
2. Choisir le support du contrat :
   élément natif pour une interaction native, Base UI pour une interaction
   complexe couverte, composition de nos primitives pour une présentation.
3. Définir les props à partir de l'élément ou de la primitive réellement rendu.
   Identifier les clés redéfinies, la cible de ref, le nom accessible, les
   variantes utiles et les éventuels modes contrôlé/non contrôlé.
4. Créer uniquement les fichiers nécessaires selon cette anatomie :

```text
component-name/
  ComponentName.tsx
  ComponentName.css.ts
  index.ts
  types/index.ts
  constants/index.ts
```

Le stylesheet et les constantes sont optionnels si aucun code ne les justifie.
Ajouter `components/<slot-name>/`, `hooks/` ou `utils/` lorsqu'une responsabilité
concrète apparaît, pas pour remplir un squelette.

5. Définir le vocabulaire dans les types ou les constantes, puis le consommer
   dans les styles. Ne pas déduire le contrat public d'une recette.
6. Implémenter le rendu et documenter son usage en JSDoc anglais : valeurs
   par défaut, nom accessible, événements, ref et contraintes observables.
7. Relier le barrel individuel au barrel de catégorie, puis aux composants
   et à l'entrée publique. N'exposer que les valeurs et types consommables.
8. Livrer les tests et les stories dans le même changement.

**Résultat attendu :** un consommateur peut importer, typer, rendre et utiliser
le composant sans connaître ses fichiers privés.

## Migrer un composant

1. Inventorier props, unions, constantes publiques, style maps, slots, callbacks,
   refs, valeurs par défaut et sorties DOM. Rechercher leurs usages avant
   tout renommage ou déplacement.
2. Séparer les changements d'organisation des changements observables.
   Ajouter un test de caractérisation lorsqu'un comportement à préserver
   n'est pas couvert ; pour un bug, ajouter une régression sur la cible attendue.
3. Définir la cible avec les conventions v2. Signaler les ruptures nécessaires
   sans ajouter automatiquement des alias dépréciés ou une compatibilité v1.
4. Réorganiser l'unité et mettre à jour tous ses imports ensemble. Lorsqu'un
   type dépend des styles, extraire d'abord son vocabulaire indépendant,
   puis faire consommer ce vocabulaire aux props et à la recette.
5. Adapter simultanément les usages internes, barrels, tests et stories.
   Rechercher les anciens noms pour distinguer références oubliées et usages
   volontairement conservés hors périmètre.
6. Supprimer les anciens fichiers, imports et ressources devenus inutiles.
   Ne pas retoucher les composants voisins sans dépendance réelle.
7. Vérifier l'API publiée et pas seulement les imports directs de l'unité.

**Résultat attendu :** la cible fonctionne de bout en bout, sans ancien chemin
oublié ni divergence entre déclarations et rendu.

## Intégrer Base UI

1. Lire les exports et déclarations de la version installée pour la primitive
   visée : props, génériques, callbacks, composition, refs, états et portails.
2. Répartir explicitement les responsabilités : Base UI coordonne son
   interaction ; notre wrapper ajoute présentation et comportement propre.
   Ne pas reproduire sa gestion d'état dans un second contexte.
3. Choisir une racine transparente, un sous-ensemble public volontaire ou un
   wrapper de convenance. Préserver l'inférence et les arguments des callbacks
   plutôt que recopier approximativement les signatures.
4. Implémenter chaque slot ayant un contrat propre comme une unité typée.
   Composer la racine avec `Object.assign` ; vérifier l'inférence des slots et,
   pour une racine générique, de plusieurs types de valeurs.
5. Vérifier le contrat réel de composition des événements. Appeler le handler
   consommateur et respecter la sémantique d'annulation avant de déclencher
   une action interne ; ne pas supposer que tous les handlers se composent pareil.
6. Déterminer le conteneur du portail et la portée du thème. Vérifier le rendu
   dans un sous-arbre thémé et les conséquences d'un montage dans le document.
7. Exercer clavier, focus, fermeture, annulation et callbacks dans nos tests,
   y compris les comportements ajoutés autour de la primitive.

Si une combinaison de génériques ou de composition ne compile pas, examiner
la signature upstream et simplifier l'adaptation. Ne pas dissimuler le problème
derrière une assertion ou une signature copiée.

## Faire évoluer les styles et le thème

1. Examiner la primitive effectivement rendue et ses props visuelles. Affecter
   chaque règle soit à une prop existante, soit au stylesheet lorsque sélecteurs,
   états ou valeurs non couvertes l'exigent.
2. Relever les tokens utilisés et vérifier leur existence dans les thèmes
   fournis. Distinguer intention sémantique, clé de token et valeur CSS libre.
3. Pour chaque traitement, vérifier le couple surface/texte ou icône et les
   états repos, survol, pression, désactivation et focus applicables.
4. Garder les règles spécifiques dans l'entrée de styles du composant.
   Extraire une responsabilité partagée seulement lorsque plusieurs unités
   l'utilisent réellement.
5. Lorsqu'une prop remplace du CSS, vérifier qu'elle ne devient pas un style
   inline qui neutralise les états. Examiner la cascade extraite, pas l'ordre
   des chaînes de classes.
6. Contrôler thèmes clair/sombre, portée locale, portails, contenu long,
   conteneur étroit, zoom et réduction des animations selon le changement.
7. Supprimer les classes et variantes inutilisées, puis vérifier l'extraction
   CSS et les possibilités de surcharge du consommateur.

**Résultat attendu :** le rendu et ses états restent cohérents sans styles
globaux supplémentaires ni hypothèse sur une API de primitive inexistante.

## Livrer les tests et les stories

Commencer par les preuves nécessaires au contrat modifié :

| Contrat | Preuve ciblée |
| --- | --- |
| Props, génériques, slots et refs | Vérifications de types, dont `expectTypeOf` si pertinent |
| Attributs natifs et filtrage des props | Rendu DOM, attributs reçus et cible de ref |
| Callback et annulation | Interaction utilisateur, arguments reçus et effet annulé |
| État contrôlé/non contrôlé | Valeur initiale, interaction et mise à jour par le parent |
| Compound et overlay | Relations ARIA, clavier, focus, fermeture et restauration |
| Effet ou accès au DOM | Nettoyage, StrictMode, SSR et hydratation selon le risque |
| Styles et personnalisation | Extraction CSS et revue visuelle des états concernés |

1. Placer les tests sous `tests/` en miroir des sources. Réutiliser le setup
   existant et vérifier ses limites avant de choisir environnement ou timers.
2. Construire un Playground simple qui transmet les vrais args. Pour un
   compound, isoler les args de démonstration et les affecter aux bons slots.
3. Définir les contrôles à partir des types et défauts vérifiés. Utiliser une
   sélection finie pour les unions ; documenter les props non éditables.
4. Pour une story contrôlée, lire les args avec `useArgs`, appeler le callback
   fourni et mettre à jour les args. Vérifier les changements depuis le
   composant et depuis Controls, ainsi que la réinitialisation.
5. Comparer les variantes pour chaque couleur dans un même exemple, avec les
   tailles dans une story séparée, selon la référence Tests et Storybook.
   Adapter les extraits consommateur à toutes les instances affichées.
6. Vérifier noms accessibles, focus et cohérence visuelle dans Storybook.
   Si cette revue ne peut pas être exécutée, l'indiquer ; le build ne la remplace pas.

## Vérifier la distribution

Activer ce parcours lorsqu'un changement touche l'API publiée, le packaging
ou le chargement des styles.

1. Suivre les exports depuis `src/index.ts` jusqu'à l'unité et comparer valeurs
   JavaScript, types publiés et contrats de personnalisation.
2. Construire le package et examiner les déclarations, imports CSS, ressources
   et dépendances externes. Vérifier l'absence d'alias privés non résolus,
   de tests et de stories dans les fichiers distribués.
3. Pour un changement de bundling, réaliser un build consommateur sélectif à
   partir du package construit, avec un composant utilisé et un autre inutilisé.
   Examiner le JavaScript et le CSS produits pour prouver leur exclusion.
4. Vérifier les entrées ESM, CommonJS et CSS déclarées par le package.
   Ne pas utiliser un chemin de source privé comme substitut au test consommateur.
5. Si l'intégration publique change, adapter la documentation consommateur et
   expliciter la rupture ou l'étape d'intégration requise.

## Exécuter les vérifications

Lire les scripts de `package.json` et les configurations avant de lancer les
commandes. Depuis la racine du dépôt, les commandes actuelles sont :

| Vérification | Commande |
| --- | --- |
| Tests ciblés | `pnpm test --run <fichiers-de-test-concernés>` |
| Types | `pnpm run typecheck` |
| Lint | `pnpm run lint` |
| Audit des composants | `pnpm run audit:design-system:check` |
| Package | `pnpm run build:lib` |
| Storybook | `pnpm run build-storybook` |

Remplacer le sélecteur entre chevrons par les vrais fichiers ; ne pas l'exécuter
littéralement. Regrouper les tests affectés dans une seule invocation sans watcher.

- **Composant** : tests ciblés, types, lint, audit et build de librairie ;
  ajouter le build Storybook si ses stories changent.
- **Stories seules** : types, lint, build Storybook et revue interactive ciblée.
- **Thème ou styles** : tests affectés, types, lint et build de librairie ;
  compléter par une revue visuelle des thèmes et états concernés.
- **Distribution** : types, lint, build de librairie et contrôles consommateur
  correspondant aux formats ou au bundling modifiés.
- **Documentation ou skill seuls** : relire contenu, métadonnées et éventuels
  liens ; ni tests de composants ni build sans modification exécutable.

Classer un échec comme régression introduite, problème préexistant ou
contradiction entre outil et cible. Corriger les régressions ; rapporter les
autres avec leur preuve, sans désactiver une règle ni élargir le périmètre.

## Clore l'intervention

Relire le diff et vérifier que chaque changement de contrat possède sa preuve,
que les usages affectés ont été adaptés et qu'aucun fichier temporaire ne reste.
Résumer le résultat et les ruptures éventuelles. Mentionner explicitement les
échecs, limites et vérifications nécessaires non exécutées ; ne pas présenter
une revue visuelle ou un build consommateur comme effectué sans l'avoir réalisé.
