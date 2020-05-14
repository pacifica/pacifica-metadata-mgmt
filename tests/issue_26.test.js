/* eslint-disable max-statements, max-len */
const pauseTime = 100
const saveTime = 500
module.exports = {
  'Search Project in Project Instrument' (browser) {
    const runtimeBrowser = browser.capabilities.browserName.toUpperCase()
    // Open up the browser to the website
    browser.url('http://localhost:8080')
    browser.pause(pauseTime)
    // Wait for the open drawer icon to show up
    browser.waitForElementPresent('button[id=header-open-drawer]')
    // Open the drawer
    browser.click('button[id=header-open-drawer]')
    browser.pause(pauseTime)
    // Wait for Relationships to show up in the drawer
    browser.waitForElementPresent('div[id=listitem-project-instrument]')
    // Click on the Relationships text
    browser.getLocationInView('div[id=listitem-project-instrument]')
    browser.click('div[id=listitem-project-instrument]')
    browser.pause(pauseTime)
    // Wait for the close drawer icon to show up
    browser.waitForElementPresent('button[id=drawer-close-drawer]')
    // Close the drawer
    browser.click('button[id=drawer-close-drawer]')
    browser.pause(pauseTime)
    // Verify the project 1236 is in the table
    browser.expect.element('#root').text.to.contain('1236')
    // Wait for the `project` filter field to show up
    browser.waitForElementPresent('#root > div > main > div:nth-child(2) > div.ReactTable > div.rt-table > div.rt-thead.-filters > div > div:nth-child(6) > input[type=text]')
    // Enter a short string in the filter field for `project`
    browser.pause(pauseTime)
    browser.sendKeys(
      '#root > div > main > div:nth-child(2) > div.ReactTable > div.rt-table > div.rt-thead.-filters > div > div:nth-child(6) > input[type=text]',
      '1234'
    )
    browser.pause(saveTime)
    // Verify the project 1234a is in the table
    browser.expect.element('#root').text.to.contain('1234a')
    // Verify the project 1236 is not in the table
    if (runtimeBrowser === 'CHROME') {
      browser.expect.element('#root').text.to.not.contain('1236')
    }
    browser.pause(saveTime)
    browser.end()
  }
}
