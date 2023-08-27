## Guide d'utilisation de CommitLint avec Husky

Bienvenue dans ce guide qui vous expliquera comment utiliser CommitLint en combinaison avec Husky pour améliorer la cohérence et la qualité de vos messages de commit. Si vous êtes un développeur full stack de troisième année, cet article vous fournira une compréhension détaillée de ces outils et de leur utilisation.

### Sommaire

1. [Introduction à CommitLint et Husky](#introduction)
2. [Installation](#installation)
3. [Création d'un hook husky](#hook-creation)
4. [Configuration de CommitLint](#commitlint-configuration)
5. [Exemples de messages de commit NON VALIDE](#commit-message-examples-not-valide)
6. [Exemples de messages de commit VALIDE](#commit-message-examples-valide)
7. [Convention de messages de commit](#commit-convention)

### <a name="introduction">1. Introduction à CommitLint et Husky</a>

**CommitLint** est un outil qui permet de définir et d'appliquer des règles aux messages de commit.
Cela aide à maintenir la cohérence et la lisibilité des messages au sein d'une équipe de développement.

**Husky**, quant à lui, est un gestionnaire de hooks Git qui facilite l'exécution de scripts avant les actions Git telles que les commits.

### <a name="installation">2. Installation</a>

Pour commencer, suivez ces étapes pour installer CommitLint et Husky :

```sh
# S'assurer que le projet dispose déjà d'un dépot git auquel cas saissisez
git init

# Initialisé un fichier package.json si inexistant.
npm init -y
```

**_Si vous disposez déjà d'un projet continuez_**

```sh
# Initialisation et Installation d'husky
npx husky-init && npm install

# Installation de commitlint
npm install --save-dev @commitlint/{config-conventional,cli}
```

### <a name="hook-creation">3. Création d'un hook husky</a>

Vous pouvez créer un hook avec Husky pour exécuter des scripts avant les commits. Voici comment :

```sh
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

vous obtiendrez dans le répertoire **.husky** un nouveau fichier **commit-msg**.
Son contenu est le suivant:

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

Ainsi après chaque commit ce hook sera appelé.
On va le modifié histoire d'avoir un retour un peu plus parlant.

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo ""
echo " ------------------------------------------------------------------------------------------------ "
echo " Je suis un message provenant du hook commit-msg dans le répertoire .husky"
echo " Démarrage de commitlint"
echo " ------------------------------------------------------------------------------------------------ "
echo ""
npx --no -- commitlint --edit ${1}
```

### 4. Configuration de CommitLint<a name="commitlint-configuration"></a>

Ajoutez une configuration CommitLint avec les règles souhaitées. Voici un exemple :

```sh
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

### 5. Exemples de messages de commit<a name="commit-message-examples"></a>

Pour vous aider à comprendre les messages conformes et non conformes, voici des exemples :

**Conformes (OK) :**

- Exemple 1 (Ajout d'une nouvelle fonctionnalité) :

  ```
  feat(ui): Ajoute un bouton de connexion
  ```

- Exemple 2 (Correction d'un bug) :
  ```
  fix(backend): Corrige l'erreur de validation dans le formulaire
  ```

**Non conformes (NON OK) :**

- Exemple 1 (Type de commit incorrect) :

  ```
  error(ui): Corrige l'erreur d'affichage
  ```

- Exemple 2 (Portée incorrecte) :
  ```
  fix(database): Corrige le bug de l'interface utilisateur
  ```

### 6. Convention de messages de commit<a name="commit-convention"></a>

Voici un tableau comparatif expliquant les niveaux d'erreur à prendre en compte lors de la configuration de CommitLint dans le fichier `commitlint.config.js` :

| Niveau        | Description                                 | Utilisation                                           |
| ------------- | ------------------------------------------- | ----------------------------------------------------- |
| `0` (disable) | Désactive la règle, aucune vérification     | Peu recommandé, sauf besoins spécifiques              |
| `1` (warning) | Avertissement, la règle est enfreinte       | Utile pour introduire progressivement les règles      |
| `2` (error)   | Erreur, la règle enfreinte bloque le commit | Recommandé pour assurer la conformité aux conventions |

Lors de la configuration, utilisez le niveau `2` (error) pour les règles essentielles et le niveau `1` (warning) pour des situations spécifiques. Assurez-vous de choisir le niveau d'erreur en fonction de vos besoins.

### Conclusion

Ce guide vous a expliqué comment utiliser CommitLint avec Husky pour améliorer vos messages de commit. N'hésitez pas à personnaliser les règles pour répondre aux besoins spécifiques de votre projet. L'utilisation de ces outils contribuera à une meilleure gestion de votre code et à une collaboration plus efficace au sein de votre équipe de développement.

# Learn to used commitlint with husky

(source)[https://github.com/conventional-changelog/commitlint]
(doc officiel)[https://commitlint.js.org/#/]

## install

```sh
git init
npm init -y
npx husky-init && npm install
```

## create a hook

```sh
npx husky add .husky/commit-msg 'echo pouet'
```

content file

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

echo pouet
```

if you run the commmand we have the new line on our file

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

echo pouet
echo pouet2 # <--------------- here
```

## commitlint

install

```sh
npm install --save-dev @commitlint/{config-conventional,cli}
```

## add conventional config

```sh
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

## add hook

```sh
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

## create a special rules

Bien sûr, voici un tableau comparatif expliquant les niveaux d'erreur à prendre en compte lors de la configuration de CommitLint dans le fichier `commitlint.config.js` :

| Niveau        | Description                                                        | Utilisation                                                  |
| ------------- | ------------------------------------------------------------------ | ------------------------------------------------------------ |
| `0` (disable) | Désactive la règle, aucune vérification n'est effectuée            | Peu recommandé, sauf pour des besoins spécifiques            |
| `1` (warning) | Avertissement, la règle est enfreinte mais n'empêche pas le commit | Peut être utilisé pour introduire progressivement les règles |
| `2` (error)   | Erreur, la règle enfreinte bloque le commit                        | Recommandé pour assurer la conformité aux conventions        |

Lors de la configuration de CommitLint, vous devriez généralement utiliser le niveau `2` (error) pour les règles essentielles qui définissent la structure et le format des messages de commit. Utiliser le niveau `1` (warning) peut être utile pour des situations spécifiques, comme lors de l'introduction de nouvelles conventions dans un projet existant.

Assurez-vous de choisir le niveau d'erreur approprié en fonction de vos besoins et de la rigueur que vous souhaitez appliquer à vos messages de commit.

## exemple de contenu

Certainement, voici quelques exemples basiques de messages de commit qui correspondent aux règles configurées dans le fichier `commitlint.config.js`. Je vais vous montrer des exemples de messages de commit qui sont conformes (OK) et d'autres qui ne le sont pas (NON OK) en fonction des règles établies :

### Conformes (OK) :

**Exemple 1 - Ajout d'une nouvelle fonctionnalité (feat) :**

```
feat(ui): Ajoute un bouton de connexion
```

**Exemple 2 - Correction d'un bug (fix) :**

```
fix(backend): Corrige l'erreur de validation dans le formulaire
```

**Exemple 3 - Modifications de la documentation (docs) :**

```
docs(core): Met à jour le guide d'installation
```

### Non conformes (NON OK) :

**Exemple 1 - Type de commit incorrect :**

```
error(ui): Corrige l'erreur d'affichage
```

Commentaire : Le type de commit "error" n'est pas valide. Seuls les types configurés (feat, fix, docs, etc.) sont autorisés.

**Exemple 2 - Portée incorrecte :**

```
fix(database): Corrige le bug de l'interface utilisateur
```

Commentaire : La portée "database" n'est pas une portée autorisée. Seules les portées configurées (core, ui, backend, frontend) sont autorisées.

**Exemple 3 - Description non capitalisée :**

```
FIX(frontend): corrige le problème d'affichage
```

Commentaire : La description commence par une lettre minuscule. Elle devrait commencer par une majuscule selon la règle de casse de la description.

Ces exemples illustrent comment les messages de commit peuvent être conformes ou non conformes aux règles définies dans la configuration de CommitLint. Assurez-vous que vos messages de commit respectent ces règles pour maintenir la cohérence et la lisibilité de l'historique de vos modifications.

## Convention

```js
    /**
     * Règle pour les types de commit autorisés
     * Niveau 2 : Erreur si la règle n'est pas respectée
     * Toujours vérifiée
     */
    "type-enum": [
      2,
      "always",
      [
        "feat", // Nouvelle fonctionnalité
        "fix", // Correction de bug
        "docs", // Documentation
        "style", // Mise en forme / Style
        "refactor", // Refactorisation
        "test", // Tests
        "chore", // Tâches de maintenance
      ],
    ],

    /**
     * Règle pour les portées autorisées
     * Niveau 2 : Erreur si la règle n'est pas respectée
     * Toujours vérifiée
     */
    "scope-enum": [2, "always", ["core", "ui", "backend", "frontend"]],

    /**
     * Règle pour la casse de la description du commit
     * Niveau 2 : Erreur si la règle n'est pas respectée
     * Toujours vérifiée
     */
    "subject-case": [2, "always", "sentence-case"],

    /**
     * Règle pour la longueur maximale des lignes du corps
     * Niveau 2 : Erreur si la règle n'est pas respectée
     * Toujours vérifiée
     * Longueur maximale : 100 caractères
     */
    "body-max-line-length": [2, "always", 100],

    // Ajoutez une ligne vide après le type de commit
    "body-leading-blank": [2, "always"],

    // Règles personnalisées pour répondre à vos exigences
    "scope-empty": [2, "never"], // Interdit le scope vide
    "scope-case": [2, "always", "lower-case"], // Scope en minuscules
    "header-max-length": [2, "always", 50], // Limite la longueur du titre à 50 caractères
    "header-full-stop": [2, "never", "."], // Interdit le point final dans le titre
    "body-case": [2, "always", "sentence-case"], // Corps en sentence-case
```
