# Learn to used commitlint with husky

(source)[https://github.com/conventional-changelog/commitlint]

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
