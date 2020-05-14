/* eslint-disable max-statements */
const pauseTime = 100
const saveTime = 200
module.exports = {
  'Create and Delete a Key' (browser) {
    browser.url('http://localhost:8080')
    browser.pause(pauseTime)
    browser.waitForElementPresent('button[id=header-open-drawer]')
    browser.click('button[id=header-open-drawer]')
    browser.pause(pauseTime)
    browser.waitForElementPresent('div[id=listitem-keys]')
    browser.click('div[id=listitem-keys]')
    browser.pause(pauseTime)
    browser.waitForElementPresent('button[id=drawer-close-drawer]')
    browser.click('button[id=drawer-close-drawer]')
    browser.pause(pauseTime)
    browser.waitForElementPresent('button[id=modal-button-create]')
    browser.click('button[id=modal-button-create]')
    browser.pause(pauseTime)
    browser.waitForElementPresent('input[id=modal-input-id]')
    browser.setValue(
      'input[id=modal-input-id]',
      '1'
    )
    browser.setValue(
      'input[id=modal-input-key]',
      'some_new_key'
    )
    browser.setValue(
      'input[id=modal-input-display-name]',
      'Some New Key'
    )
    browser.click('button[id=modal-button-save]')
    browser.pause(saveTime)
    browser.expect.element('#root').text.to.contain('Some New Key')
    browser.expect.element('#root').text.to.contain('some_new_key')
    browser.click('button[id=modal-button-delete-row-0]')
    browser.pause(pauseTime)
    browser.waitForElementPresent('div[id=delete-modal]')
    browser.expect.element('#delete-modal').text.to.contain('{"force":"True","_id":1}')
    browser.click('button[id=modal-button-delete]')
    browser.pause(saveTime)
    browser.expect.element('#root').text.to.not.contain('Some New Key')
    browser.expect.element('#root').text.to.not.contain('some_new_key')
    browser.end()
  }
}
