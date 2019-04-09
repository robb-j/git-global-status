// 
// npm entrypoint
// - This file is the 'main' when you require() this package
// 

const { findUnstagedRepos } = require('./repoFinder')

module.exports = { findUnstagedRepos }
