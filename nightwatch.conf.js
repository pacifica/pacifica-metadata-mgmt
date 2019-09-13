require('@babel/register')()
const fs = require('fs')
module.exports = ((settings) => {
  const seleniumServerFileName =
     // eslint-disable-next-line no-sync
     fs.readdirSync('node_modules/selenium-standalone/.selenium/selenium-server/')
  settings.selenium.server_path += seleniumServerFileName
  return settings
})(require('./nightwatch.json'))
