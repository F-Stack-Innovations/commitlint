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
