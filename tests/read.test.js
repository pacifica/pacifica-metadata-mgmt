module.exports = {
  'Load Main Page Projects': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('button[id=header-open-drawer]')
      .click('button[id=header-open-drawer]')
      .waitForElementVisible('div[id=listitem-projects]')
      .click('div[id=listitem-projects')
      .pause(1000)
      .assert.containsText('#root', '1234a')
      .end()
  },
  'Load Main Page Relationships': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('button[id=header-open-drawer]')
      .click('button[id=header-open-drawer]')
      .waitForElementVisible('div[id=listitem-relationships]')
      .click('div[id=listitem-relationships')
      .pause(1000)
      .assert.containsText('#root', 'authorized_releaser')
      .end()
  },
  'Load Main Page Files': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('button[id=header-open-drawer]')
      .click('button[id=header-open-drawer]')
      .waitForElementVisible('div[id=listitem-files]')
      .click('div[id=listitem-files')
      .pause(1000)
      .assert.containsText('#root', 'foo.txt')
      .end()
  }
}
