module.exports = {
    'Create and Delete a Key': function (browser) {
        browser.url('http://localhost:8080')
        browser.waitForElementPresent('button[id=header-open-drawer]')
        browser.click('button[id=header-open-drawer]')
        browser.waitForElementPresent('div[id=listitem-keys]')
        browser.click('div[id=listitem-keys]')
        browser.waitForElementPresent('button[id=drawer-close-drawer]')
        browser.click('button[id=drawer-close-drawer]')
        browser.waitForElementPresent('button[id=modal-button-create]')
        browser.click('button[id=modal-button-create]')
        browser.waitForElementPresent('input[id=modal-input-key]')
        browser.setValue('input[id=modal-input-key]', 'some_new_key')
        browser.setValue('input[id=modal-input-display-name]', 'Some New Key')
        browser.click('button[id=modal-button-save]')
        browser.click('button[id=modal-button-close]')
        browser.waitForElementPresent('button[id=modal-delete-row-0]')
        browser.assert.containsText('#root', 'Some New Key')
        browser.assert.containsText('#root', 'some_new_key')
        browser.click('button[id=modal-delete-row-0]')
        browser.waitForElementPresent('div[id=react-confirm-alert]')
        browser.assert.containsText('#react-confirm-alert', '{"force":"True","_id":1}')
        browser.click('div#react-confirm-alert button') // This should be the yes button
        browser.assert.not.containsText('#root', 'Some New Key')
        browser.assert.not.containsText('#root', 'some_new_key')
        browser.end()
    }
}