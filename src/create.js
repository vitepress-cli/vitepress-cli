const inquirer = require('inquirer')
const fetch = require('node-fetch')
const fs = require('fs')
const download = require('download-git-repo')
const { loadingByOra } = require('../utils/common')

/**
 * get vitepress project templates from the 'vitepress-cli' organization
 */
const fetchRepoList = () => {
  return new Promise((resolve, reject) => {
    fetch('https://api.github.com/orgs/vitepress-cli/repos')
      .then((r) => r.json())
      .then((data) => {
        const repos = data.map((item) => item.name)
        resolve(repos)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

/**
 * download a template to local path
 * @param { string } repo github template
 * @param { string } path local path
 */
const downloadRepo = (repo, path) => {
  return new Promise((resolve, reject) => {
    download(`github:vitepress-cli/${repo}`, path, {}, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

/**
 * create a project name directory
 * @param {string} name create project name
 */
const createDir = (name) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(name, (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

module.exports = async (projectName) => {
  const repos = await loadingByOra(fetchRepoList, 'loading template...')
  const { repo } = await inquirer.prompt([
    {
      type: 'list',
      name: 'repo',
      message: 'select a template to create your project',
      choices: repos
    }
  ])
  await createDir(projectName)
  await loadingByOra(downloadRepo, 'downloading template...', repo, projectName)
}
