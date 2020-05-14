/* eslint-disable max-statements, max-len */
const pauseTime = 100
const saveTime = 200
module.exports = {
  'Create a User Group entry' (browser) {
    // Open up the browser to the website
    browser.url('http://localhost:8080')
    browser.pause(pauseTime)
    // Wait for the open drawer icon to show up
    browser.waitForElementPresent('button[id=header-open-drawer]')
    // Open the drawer
    browser.click('button[id=header-open-drawer]')
    browser.pause(pauseTime)
    // Wait for Relationships to show up in the drawer
    browser.waitForElementPresent('div[id=listitem-relationships]')
    // Click on the Relationships text
    browser.click('div[id=listitem-relationships]')
    browser.pause(pauseTime)
    // Wait for the close drawer icon to show up
    browser.waitForElementPresent('button[id=drawer-close-drawer]')
    // Close the drawer
    browser.click('button[id=drawer-close-drawer]')
    browser.pause(pauseTime)
    // Wait for the `name` filter field to show up
    browser.waitForElementPresent('#root > div > main > div:nth-child(2) > div.ReactTable > div.rt-table > div.rt-thead.-filters > div > div:nth-child(6) > input[type=text]')
    // Enter a short string in the filter field for `name`
    browser.setValue(
      '#root > div > main > div:nth-child(2) > div.ReactTable > div.rt-table > div.rt-thead.-filters > div > div:nth-child(6) > input[type=text]',
      'mem'
    )
    browser.pause(saveTime)
    // Verify the member_of relationship is in the table
    browser.expect.element('#root').text.to.contain('member_of')
    browser.expect.element('#root').text.to.not.contain('custodian')
    browser.expect.element('#root').text.to.not.contain('authorized_releaser')
    browser.pause(saveTime)
    browser.end()
  }
}
