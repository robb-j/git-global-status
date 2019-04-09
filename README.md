# Git global status

Quickly find out which repos you forgot to commit to.

```bash
# Install globally
npm i -g git-global-status

# Run in the current directory
git-global-status

# Run in a specific directory
git-global-status --path /User/rob/Sites
```

## Future work

- Add an option to fetch repos first
  - `.option('-f --fetch', 'Specify whether to fetch repos', false)`
  - `git fetch && git status -sb`
    - `## master...origin/master [ahead 1, behind 1]`
- Add more project dependant ignores (e.g. `ruby`)

---

> This project was set up by [puggle](https://npm.im/puggle)
