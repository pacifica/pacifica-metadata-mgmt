/* eslint-disable max-statements, max-len */
const pauseTime = 200
const saveTime = 300
module.exports = {
  'Update an existing User entry' (browser) {
    // Open up the browser to the website
    browser.url('http://localhost:8080')
    browser.pause(pauseTime)
    // Wait for the open drawer icon to show up
    browser.waitForElementPresent('button[id=header-open-drawer]')
    // Open the drawer
    browser.click('button[id=header-open-drawer]')
    browser.pause(pauseTime)
    // Wait for Users to show up in the drawer
    browser.waitForElementPresent('div[id=listitem-users]')
    browser.getLocationInView('div[id=listitem-users]')
    // Click on the Users text
    browser.click('div[id=listitem-users]')
    browser.pause(pauseTime)
    // Wait for the close drawer icon to show up
    browser.waitForElementPresent('button[id=drawer-close-drawer]')
    // Close the drawer
    browser.click('button[id=drawer-close-drawer]')
    browser.pause(pauseTime)
    // Wait for the `edit button` to show up
    browser.waitForElementPresent('button[id=modal-button-edit-row-0]')
    browser.click('button[id=modal-button-edit-row-0]')
    browser.pause(pauseTime)
    // Wait for the `middle initial` input to show up
    browser.waitForElementPresent('input[id=modal-input-middle-initial]')
    browser.setValue('input[id=modal-input-middle-initial]', 'something_that_does_not_exist')
    browser.pause(pauseTime)
    browser.click('button[id=modal-button-save]')
    browser.pause(saveTime)
    // Verify the member_of relationship is in the table
    browser.expect.element('#root').text.to.contain('something_that_does_not_exist')
    browser.pause(saveTime)
    browser.end()
  }
}
