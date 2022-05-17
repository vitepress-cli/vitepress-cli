const ora = require('ora')

const loadingByOra = async (fn, message, ...args) => {
  const spinner = ora(message.loading)
  spinner.start()
  let result = null
  try {
    result = await fn(...args)
    spinner.succeed(message.done)
  } catch (error) {
    spinner.fail(
      'failed to create, can new Issure to https://github.com/vitepress-cli/vitepress-cli'
    )
  }
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
