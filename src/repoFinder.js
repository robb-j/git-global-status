const { promisify } = require('util')
const { join } = require('path')

const ini = require('ini')

const readFile = promisify(require('fs').readFile)
const exec = promisify(require('child_process').exec)
const glob = promisify(require('glob'))

// TODO: Optimize for non-npm repo types
const ignoredDirectories = ['node_modules', 'vendor', 'dist']

/** Find any repo with unstaged changes (uses git status -s) */
async function findUnstagedRepos(rootDir = process.cwd()) {
  // Construct options with directories to ignore
  // NOTE - glob already ignores `.directories`
  const options = {
    cwd: rootDir,
    ignore: ignoredDirectories.map(s => `**/${s}/**`)
  }

  // Find files which match our glob
  const data = await glob('**/.git/config', options)

  // Process all matching git repos (ran in parallel)
  const unstagedRepos = []
  await Promise.all(
    data.map(async file => {
      const path = file.replace('.git/config', '')
      
      // Skip if the current directory is a git repo
      if (!path) return

      // Use git to see if there are changes
      const { stdout } = await exec(
        `git -C ${join(options.cwd, path)} status -s`
      )
      
      // Skip this repo if it has no changes
      if (stdout.length === 0) return

      // Load the git config
      const config = ini.parse(await readFile(join(options.cwd, file), 'utf8'))

      // Return the repo with its remote if it has one
      const remote = config['remote "origin"']
      unstagedRepos.push({ path, remote: remote ? remote.url : null })
    })
  )
  
  return unstagedRepos
}

module.exports = { findUnstagedRepos }
