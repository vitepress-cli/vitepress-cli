const { program } = require('commander')
const { version } = require('../utils/constants')
const { mapActions } = require('../utils/common')

Reflect.ownKeys(mapActions).forEach((action) => {
  program
    .command(action)
    .alias(mapActions[action].alias)
    .description(mapActions[action].description)
    .action(() => {
      if (action === '*') {
        // cannot find command output this tip
        console.log(mapActions[action].description)
      } else {
        require('./create.js')(...process.argv.slice(3))
      }
    })
})

program.version(version).parse(process.argv)
