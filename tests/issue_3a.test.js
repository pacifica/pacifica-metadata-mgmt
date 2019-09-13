/* eslint-disable max-statements */
const pauseTime = 100
const saveTime = 200
module.exports = {
  // eslint-disable-next-line max-lines-per-function
  'Create a User Group entry' (browser) {
    // Open up the browser to the website
    browser.url('http://localhost:8080')
    browser.pause(pauseTime)
    // Wait for the open drawer icon to show up
    browser.waitForElementPresent('button[id=header-open-drawer]')
    // Open the drawer
    browser.click('button[id=header-open-drawer]')
    browser.pause(pauseTime)
    // Wait for Project Instrument to show up in the drawer
    browser.waitForElementPresent('div[id=listitem-project-instrument]')
    // Click on the Project Instrument text
    browser.click('div[id=listitem-project-instrument]')
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
    // Wait for the window to render the input Project ID
    browser.waitForElementPresent('input[id=modal-input-project]')
    // Enter a valid Project ID
    browser.setValue('input[id=modal-input-project]', '1235')
    // Wait for the window to render the input Instrument ID
    browser.waitForElementPresent('input[id=modal-input-instrument]')
    // Enter a valid Instrument ID
    browser.setValue('input[id=modal-input-instrument]', '104')
    // Wait for the window to render the input Relationship UUID
    browser.waitForElementPresent('input[id=modal-input-relationship]')
    // Enter a valid Relationship UUID (hard coded uuid of test relationship 2)
    browser.setValue('input[id=modal-input-relationship]', '69fb126a-a97a-4709-b9ce-58b3f84bdcb7')
    // Save the Project Instrument entry
    browser.click('button[id=modal-button-save]')
    browser.pause(pauseTime)
    // Verify the Project Instrument entry is in the table
    browser.expect.element('#root').text.to.contain('1235')
    browser.expect.element('#root').text.to.contain('104')
    browser.expect.element('#root').text.to.contain('69fb126a-a97a-4709-b9ce-58b3f84bdcb7')
    // Delete the entry we just put in
    browser.click('button[id=modal-button-delete-row-2]')
    browser.pause(pauseTime)
    // Wait for the confirm window to show up
    browser.waitForElementPresent('div[id=delete-modal]')
    // Confirm we are deleting the right element
    browser.expect.element('#delete-modal').text.to.contain('{"force":"True",')
    // Click on the 'Yes' button
    browser.click('button[id=modal-button-delete]')
    browser.pause(saveTime)
    browser.end()
  }
}
