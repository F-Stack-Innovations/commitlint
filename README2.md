## 🚀 Guide d'utilisation de CommitLint avec Husky

Bienvenue dans ce guide complet qui vous expliquera en détail comment utiliser CommitLint en combinaison avec Husky pour améliorer la cohérence et la qualité de vos messages de commit. Si vous êtes un développeur full stack de troisième année, cet article vous fournira une compréhension approfondie de ces outils et de leur utilisation.

### 📋 Sommaire

1. [Introduction à CommitLint et Husky](#introduction)
2. [Installation](#installation)
3. [Création d'un hook Husky](#hook-creation)
4. [Configuration de CommitLint](#commitlint-configuration)
5. [Convention des messages de commit](#commit-convention)
6. [Personnalisation des Règles de CommitLint](#override-convention)
7. [Exemples de commit NON VALIDE](#commit-examples-not-valide)
8. [Exemples de commit VALIDE](#commit-examples-valide)

---

### <a name="introduction">📌 - 1. Introduction à CommitLint et Husky</a>

🔗 **CommitLint** est un outil qui permet d'établir et d'appliquer des règles aux messages de commit. Son objectif est de garantir la cohérence et la lisibilité des messages au sein d'une équipe de développement. Il évite les messages de commit désorganisés et mal structurés.

🔗 **Husky**, d'autre part, est un gestionnaire de hooks Git. Il facilite l'exécution de scripts automatisés avant certaines actions Git, telles que les commits. En combinant Husky avec CommitLint, vous pouvez automatiser la vérification de vos messages de commit avant qu'ils ne soient enregistrés dans le dépôt.

### <a name="installation">📌 - 2. Installation</a>

Pour mettre en place CommitLint avec Husky, suivez ces étapes :

1. **Initialisation du Projet** : Si votre projet n'a pas encore de dépôt Git, initialisez-en un avec la commande suivante. Assurez-vous également d'avoir un fichier `package.json` existant.

   ```sh
   git init
   npm init -y
   ```

2. **Installation de Husky et CommitLint** : Installez Husky et CommitLint, ainsi que leurs dépendances, en exécutant les commandes suivantes.

   ```sh
   npx husky-init && npm install
   npm install --save-dev @commitlint/{config-conventional,cli}
   ```

A lors de l'installation de husky, un nouveau dossier **.husky** apparaitra à la racine du projet.
celui-ci comporte un un fichier **pre-commit**.

> Le hook pre-commit est exécuté avant que Git ne finalise le processus de commit.
> Cela signifie qu'il s'exécute avant que le commit ne soit enregistré dans le dépôt.
> Il est souvent utilisé pour effectuer des vérifications et des validations sur les fichiers qui sont en cours de commit, afin de garantir que le commit respecte certaines normes ou règles.

Dans le contexte de l'utilisation de CommitLint avec Husky, le pre-commit hook est configuré pour exécuter CommitLint et vérifier que le message de commit respecte les conventions définies. Si le message de commit ne respecte pas ces conventions, le commit est empêché et une erreur est renvoyée.

par défaut le fichier est constitué ainsi:

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test
```

La problématique étant qu'à ce stade nous n'avons pas forcément de **tests unitaires** disponible.
Ainsi donc nous allons le modifier pour une meilleur utilisation.

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

echo ""
echo "-------------------------------------------------------------"
echo " PRE-COMMIT"
echo "-------------------------------------------------------------"
echo ""
```

### <a name="hook-creation">📌 - 3. Création d'un hook Husky</a>

Créer un hook avec Husky vous permet d'exécuter des scripts avant les commits. Voici comment le configurer :

1. **Création du Hook pour les Messages de Commit** : Utilisez la commande suivante pour créer un hook Husky qui exécute CommitLint avant chaque commit.

```sh
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

Cette fois-ci, nous avons un nouveau script **commit-msg** disponible dans le répertoire **.husky**.

> Le hook commit-msg est spécifiquement conçu pour être exécuté après que l'utilisateur ait entré le message de commit, mais avant que le commit ne soit finalisé.
> Il permet de vérifier et de valider le message de commit lui-même, en s'assurant qu'il suit un format ou une convention spécifique.
> Dans le contexte de CommitLint, le commit-msg hook est configuré pour exécuter CommitLint sur le message de commit qui a été saisi.
> Si le message ne respecte pas les conventions de CommitLint, le commit est bloqué et une erreur est renvoyée, empêchant ainsi l'enregistrement du commit.

En résumé, le pre-commit hook est utilisé pour vérifier les fichiers et les modifications en cours de commit, tandis que le commit-msg hook est utilisé pour valider le message de commit lui-même. Ensemble, ils permettent d'automatiser la vérification de la qualité et de la cohérence des commits au sein d'un projet Git.

par défaut le fichier est constitué comme ceci:

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

2. **Personnalisation du Hook** : Modifiez le fichier `.husky/commit-msg` pour y ajouter des informations utiles et améliorer la lisibilité.

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo ""
echo "-------------------------------------------------------------"
echo " COMMIT-MSG"
echo "-------------------------------------------------------------"
echo ""
npx --no -- commitlint --edit ${1}
```

### <a name="commitlint-configuration">📌 - 4. Configuration de CommitLint</a>

Configurez CommitLint en définissant les règles spécifiques que vous souhaitez appliquer.
Voici un exemple de configuration utilisé par la communauté sans une quelconque modification:

```sh
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

Un fichier j'avaiscript est ainsi créé à la racine du projet portant le nom de **commitlint.config.js**.
Il sera modifié prochainement.

Dans tout les cas n'importe quel commit exécuté maintenant devra respecter les règles qui auront été imposé par les géants du web.
Voici des exemples de messages de commit conformes aux règles définies :

**Messages VALIDES (OK) :**

```sh
# Exemple 1 (Ajout d'une nouvelle fonctionnalité) :
git commit -m "feat(ui): Ajoute un bouton de connexion"
```

```sh
# Exemple 2 (Correction d'un bug) :
git commit -m "fix(backend): Corrige l'erreur de validation dans le formulaire"
```

**Messages NON VALIDES (PAS OK) :**

```sh
# Exemple 1 (Ajout d'une nouvelle fonctionnalité) :
git commit -m "nouveau carrousel"
```

### <a name="commit-convention">📌 - 5. Convention de messages de commit</a>

La configuration de CommitLint peut inclure différents niveaux d'erreur. Voici un tableau comparatif expliquant ces niveaux :

| Niveau          | Description                                 | Utilisation                                           |
| --------------- | ------------------------------------------- | ----------------------------------------------------- |
| `0` (désactivé) | Désactive la règle, aucune vérification     | Peu recommandé, sauf besoins spécifiques              |
| `1` (avert.)    | Avertissement, la règle est enfreinte       | Utile pour introduire progressivement les règles      |
| `2` (erreur)    | Erreur, la règle enfreinte bloque le commit | Recommandé pour assurer la conformité aux conventions |

Lors de la configuration, il est conseillé d'utiliser le niveau `2` (**erreur** || **error**) pour les règles essentielles qui assurent la structure et le format des messages de commit.
Le niveau `1` (**avertissement** || **warning**) peut être utilisé pour des cas spécifiques, comme lors de l'adoption de nouvelles conventions dans un projet existant.

> Assurez-vous de choisir le niveau d'erreur approprié en fonction de vos besoins et de la rigueur que vous souhaitez appliquer à vos messages de commit.

La configuration de CommitLint peut inclure différents types de commit, chacun ayant un objectif spécifique. Voici une explication des types de commit les plus couramment utilisés :

| Type de Commit | Description                                                                                        | Exemple                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `feat`         | Ajout d'une nouvelle fonctionnalité, d'une amélioration majeure ou d'une nouvelle fonction.        | `feat(ui): Ajoute un bouton de connexion`                               |
| `fix`          | Correction d'un bug, d'une erreur ou d'un comportement indésirable.                                | `fix(backend): Corrige l'erreur de validation`                          |
| `docs`         | Mise à jour de la documentation, ajout d'informations manquantes ou amélioration des explications. | `docs(ui): Met à jour le guide d'utilisation`                           |
| `style`        | Modifications de style : espaces, indentation, virgules, etc.                                      | `style(frontend): Réorganise les fichiers CSS`                          |
| `refactor`     | Refonte ou restructuration du code sans ajout de fonctionnalité ni correction de bug.              | `refactor(backend): Réorganise la gestion des utilisateurs`             |
| `test`         | Ajout ou modification de tests unitaires ou d'intégration.                                         | `test(backend): Ajoute des tests pour les fonctions d'authentification` |
| `chore`        | Tâches de maintenance, mises à jour de dépendances, ajustements du processus de build, etc.        | `chore: Met à jour les packages npm`                                    |

De plus, les scopes sont utilisés pour indiquer la portée ou la zone du code affectée par le commit. Voici quelques exemples de scopes courants :

| Scope      | Description                                                              | Exemple                                           |
| ---------- | ------------------------------------------------------------------------ | ------------------------------------------------- |
| `core`     | Changements fondamentaux, modifications au cœur de l'application.        | `core`: Réécriture de la gestion des utilisateurs |
| `ui`       | Modifications de l'interface utilisateur, ajouts ou changements visuels. | `ui`: Réorganise le panneau de connexion          |
| `backend`  | Modifications dans la partie backend, gestion des API, des données, etc. | `backend`: Optimise les requêtes SQL              |
| `frontend` | Changements dans la partie frontend, composants, interactions, etc.      | `frontend`: Ajoute des animations aux boutons     |

L'utilisation de ces types de commit et de scopes aide à mieux comprendre les changements apportés au code et facilite la navigation dans l'historique des commits.

### <a name="override-convention">📌 - 6. Personnalisation des Règles de CommitLint</a>

Dans cette section, nous allons explorer la personnalisation des règles de CommitLint.
La configuration présentée ci-dessous détaille les règles personnalisées appliquées à CommitLint, ce qui permet de maintenir la cohérence et la qualité des messages de commit.
Chaque règle sera expliquée en détail.

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],

  // Ecrasement des règles selon une demande particulière.
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore"],
    ],
    "scope-enum": [2, "always", ["core", "ui", "backend", "frontend"]],
    "subject-case": [2, "always", "sentence-case"],
    "body-max-line-length": [2, "always", 100],
    "body-leading-blank": [2, "always"],
    "scope-empty": [2, "never"],
    "scope-case": [2, "always", "lower-case"],
    "header-max-length": [2, "always", 50],
    "header-full-stop": [2, "never", "."],
    "body-case": [2, "always", "sentence-case"],
    "my-custom-rule": [2, "always", "my-custom-pattern"],
  },
};
```

#### Description de la Personnalisation des Règles

| Règle                  | Description                                                                                | Exemple                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| `type-enum`            | Types de commit autorisés.                                                                 | ["feat", "fix", "docs", "style", "refactor", "test", "chore"] |
| `scope-enum`           | Portées autorisées.                                                                        | ["core", "ui", "backend", "frontend"]                         |
| `subject-case`         | Casse de la description du commit.                                                         | "Ajoute une nouvelle fonctionnalité"                          |
| `body-max-line-length` | Longueur maximale des lignes du corps.                                                     | 100 caractères                                                |
| `body-leading-blank`   | Ligne vide requise après le type de commit.                                                | Oui                                                           |
| `scope-empty`          | Interdiction d'un scope vide.                                                              | Non                                                           |
| `scope-case`           | Casse du scope en minuscules.                                                              | "core"                                                        |
| `header-max-length`    | Longueur maximale du titre du commit.                                                      | 50 caractères                                                 |
| `header-full-stop`     | Interdiction d'un point final dans le titre.                                               | Non                                                           |
| `body-case`            | Casse de la première lettre de la description du corps.                                    | "Corrige un bug dans l'interface utilisateur"                 |
| `my-custom-rule`       | Exemple de règle personnalisée. Remplacez "my-custom-pattern" par le motif de votre choix. | "my-custom-pattern"                                           |

Cette configuration détaille comment chaque règle personnalisée influence la validation des messages de commit.
En adaptant ces règles à vos besoins spécifiques, vous pouvez maintenir la cohérence et la qualité des messages de commit au sein de votre projet.
Assurez-vous que vos messages de commit respectent ces règles pour une gestion efficace de votre code et une meilleure collaboration au sein de votre équipe de développement.

### <a name="commit-examples-not-valide">📌 - 7. Exemples de commit NON VALIDE</a>

```sh
# Exemple 1 (Ajout d'une nouvelle fonctionnalité) : - SANS (SCOPE) ET SANS les ":"
git commit -m "feat Ajoute un bouton de connexion" -m "J'ai inclut un bouton de connexion fonctionnel qui permet de rediriger l'utilisateur vers la page de connexion".
```

```sh
# Exemple 2 (Correction d'un bug) : - SANS MESSAGE DANS LE BODY (2ème -m)
git commit -m "fix(frontend): Fixe le type de bouton"
```

### <a name="commit-examples-valide">📌 - 8. Exemples de commit VALIDE</a>

```sh
# Exemple 1 (Ajout d'une nouvelle fonctionnalité) :
git commit -m "feat(ui): Ajoute un bouton de connexion" -m "J'ai inclut un bouton de connexion fonctionnel qui permet de rediriger l'utilisateur vers la page de connexion".
```

```sh
# Exemple 2 (Correction d'un bug) :
git commit -m "fix(frontend): Fixe le type de bouton" -m "J'ai modifié le type de bouton qui était simplement un button sans valeur."
```
