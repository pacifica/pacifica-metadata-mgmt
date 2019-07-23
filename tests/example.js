module.exports = {
    'Demo test Main Load' : function (browser) {
          browser
            .url('http://localhost:8080')
            .waitForElementVisible('body')
            .click('button[id=header-open-drawer]')
            .waitForElementVisible('div[id=listitem-projects]')
            .click('div[id=listitem-projects')
            .pause(1000)
            .assert.containsText('#main', '1234a')
            .end();
        }
};
