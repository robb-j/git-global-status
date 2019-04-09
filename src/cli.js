#!/usr/bin/env node

// 
// cli entrypoint
// - This file is executed when you use the cli
// 

const program = require('commander')
const chalk = require('chalk')

const { findUnstagedRepos } = require('./repoFinder')

// Setup our cli program
program
  .version(process.env.npm_package_version)
  .description('Find git repos which have unstaged changes')
  .option('-p --path [path]', 'Specify the path to recursively look into [cwd]')
  .parse(process.argv)

;(async () => {
  try {
    //
    // Fetch repos using the cli's options
    // 
    const repos = await findUnstagedRepos(program.path)
    
    // 
    // Do nothing if there were no unstaged repos
    // 
    if (repos.length === 0) return console.log(`No unstaged changes found`)
    
    //
    // Log repos and their optional remote
    // 
    console.log('Found unstaged changes:')
    
    for (const { path, remote } of repos) {
      if (remote) {
        console.log(`${chalk.red(path)} ~ ${chalk.cyan(remote)}`)
      } else {
        console.log(chalk.red(path))
      }
    }
  } catch (error) {
    console.log(chalk.red('𐄂'), error.message)
  }
})()
