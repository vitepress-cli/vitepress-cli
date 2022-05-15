const mapActions = {
  create: {
    alias: 'c',
    description: 'create a new project',
    examples: ['vitepress-cli create <project name>']
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: ['lee-cli config set <k> <v>', 'lee-cli config get <k>']
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
}

module.exports = {
  mapActions
}
