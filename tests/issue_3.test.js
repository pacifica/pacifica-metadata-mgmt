/* eslint-disable max-statements */
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
    // Wait for User Group to show up in the drawer
    browser.waitForElementPresent('div[id=listitem-user-group]')
    // Click on the User Group text
    browser.click('div[id=listitem-user-group]')
    browser.pause(pauseTime)
    // Wait for the close drawer icon to show up
    browser.waitForElementPresent('button[id=drawer-close-drawer]')
    // Close the drawer
    browser.click('button[id=drawer-close-drawer]')
    browser.pause(pauseTime)
    // Wait for the Create icon to show up
    browser.waitForElementPresent('button[id=modal-button-create]')
    // Click on the Create icon to show the window
    browser.click('button[id=modal-button-create]')
    browser.pause(pauseTime)
    // Wait for the window to render the input User ID
    browser.waitForElementPresent('input[id=modal-input-user]')
    // Enter a valid User ID
    browser.setValue('input[id=modal-input-user]', '10')
    // Wait for the window to render the input Group ID
    browser.waitForElementPresent('input[id=modal-input-group]')
    // Enter a valid Group ID
    browser.setValue('input[id=modal-input-group]', '1000')
    // Save the User Group entry
    browser.click('button[id=modal-button-save]')
    browser.pause(saveTime)
    // Verify the User Group entry is in the table
    browser.expect.element('div.rt-tr-group:nth-child(2)').text.to.contain('10')
    browser.expect.element('div.rt-tr-group:nth-child(2)').text.to.contain('1000')
    // Delete the entry we just put in
    browser.click('button[id=modal-button-delete-row-1]')
    browser.pause(pauseTime)
    // Wait for the confirm window to show up
    browser.waitForElementPresent('div[id=delete-modal]')
    // Confirm we are deleting the right element
    browser.expect.element('#delete-modal').text.to.contain('{"force":"True","user":10,"group":1000}')
    // Click on the 'Yes' button
    browser.click('button[id=modal-button-delete]')
    browser.pause(saveTime)
    browser.end()
  }
}
