const inquirer = require('inquirer')
const fetch = require('node-fetch')
const chalk = require('chalk')
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
        const repos = data
          .map((item) => item.name)
          .filter((name) => name !== 'vitepress-cli')
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
  if (fs.existsSync(projectName)) {
    console.log(
      chalk.rgb(
        166,
        27,
        41
      )(
        `
        ${projectName} already exists, please rename the project name or delete the existed directory.
        `
      )
    )
    return
  }

  const repos = await loadingByOra(fetchRepoList, {
    loading: 'loading template...',
    done: 'Template loaded'
  })
  if (repos !== null) {
    const { repo } = await inquirer.prompt([
      {
        type: 'list',
        name: 'repo',
        message: 'select a template to create your project',
        choices: repos
      }
    ])
    await createDir(projectName)
    const downloaded = await loadingByOra(
      downloadRepo,
      {
        loading: 'downloading template...',
        done: 'Template download complete'
      },
      repo,
      projectName
    )
    if (downloaded !== null) {
      succeedLog(projectName)
    }
  }
}

/**
 * log information when download complete
 */
function succeedLog(projectName) {
  console.log(
    chalk.rgb(
      93,
      190,
      138
    )('----------------------------------------------------------------')
  )
  console.log(
    chalk.rgb(
      92,
      179,
      204
    )(
      `
      cd ${projectName}

      yarn or npm install

      yarn docs:dev or npm run docs:dev
      `
    )
  )
  console.log(
    chalk.rgb(
      93,
      190,
      138
    )('----------------------------------------------------------------')
  )
}
