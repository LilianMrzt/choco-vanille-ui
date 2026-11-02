# Contribution à Choco Vanille v2

Ce dépôt contient `@choco-vanille/ui`, une librairie de composants React,
pas une application.

## Conventions et méthode

Pour toute contribution à la librairie, utiliser le skill `choco-vanille`.
Il contient les conventions détaillées et les procédures de création,
migration, revue et vérification.

Si l'outil ne permet pas de charger le skill, lire directement son
[point d'entrée](../.agents/skills/choco-vanille-design-system/SKILL.md),
puis les références qu'il indique pour le périmètre concerné.
Ces références constituent l'unique emplacement des conventions détaillées ;
ne pas en maintenir une seconde copie dans les instructions ou l'agent.

## Règles essentielles

- Préserver les changements locaux et limiter l'intervention à la demande.
- Suivre la cible v2 sans migrer implicitement tout le code v1.
- Examiner et réutiliser l'existant avant d'ajouter une abstraction.
- Utiliser pnpm et les outils configurés ; ne pas affaiblir le typage,
  les règles de qualité ou les vérifications pour contourner une erreur.
- Ne jamais committer de secret ni de configuration locale sensible.
- Livrer ensemble les contrats, comportements, tests, exemples et documentation
  affectés. Signaler les ruptures, blocages et vérifications non exécutées.
