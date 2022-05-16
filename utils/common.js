const ora = require('ora')

const loadingByOra = async (fn, message, ...args) => {
  const spinner = ora(message)
  spinner.start()
  let result = await fn(...args)
  spinner.succeed()
  return result
}

const mapActions = {
  create: {
    alias: 'c',
    description: 'create a new project',
    examples: ['vitepress-cli create <project name>']
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
}

module.exports = {
  mapActions,
  loadingByOra
}
