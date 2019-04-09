# Git global status

Quickly find out which repos you forgot to commit to.

## Cli usage

```bash
# Install globally
npm i -g git-global-status

# Run in the current directory
git-global-status

# Run in a specific directory
git-global-status --path /User/rob/Sites
```

## Api usage

```js
const { findUnstagedRepos } = require('./repoFinder')

;(async () => {
  //
  // Fetch repos which have unstaged changes
  // 
  const repos = await findUnstagedRepos('/your/custom/path')
  
  // 
  // Repos is an array of { path: string, remote: string | null }
  // 
  console.log(repos)
})()
```

## Future work

- Add an option to fetch repos first
  - `.option('-f --fetch', 'Specify whether to fetch repos', false)`
  - `git fetch && git status -sb`
    - `## master...origin/master [ahead 1, behind 1]`
- Add more project dependant ignores (e.g. `ruby`)

---

> This project was set up by [puggle](https://npm.im/puggle)
