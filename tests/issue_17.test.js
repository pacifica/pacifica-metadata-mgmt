module.exports = {
    'Create a User Group entry': function (browser) {
        // Open up the browser to the website
        browser.url('http://localhost:8080')
        browser.pause(100)
        // Wait for the open drawer icon to show up
        browser.waitForElementPresent('button[id=header-open-drawer]')
        // Open the drawer
        browser.click('button[id=header-open-drawer]')
        browser.pause(100)
        // Wait for Project User to show up in the drawer
        browser.waitForElementPresent('div[id=listitem-project-user]')
        // Click on the Project User text
        browser.click('div[id=listitem-project-user]')
        browser.pause(100)
        // Wait for the close drawer icon to show up
        browser.waitForElementPresent('button[id=drawer-close-drawer]')
        // Close the drawer
        browser.click('button[id=drawer-close-drawer]')
        browser.pause(100)
        // Wait for the Create icon to show up
        browser.waitForElementPresent('button[id=modal-button-create]')
        // Click on the Create icon to show the window
        browser.click('button[id=modal-button-create]')
        browser.pause(100)
        // Wait for the window to render the input Project ID
        browser.waitForElementPresent('input[id=modal-input-project]')
        // Enter a valid Project ID
        browser.setValue('input[id=modal-input-project]', '1235')
        // Wait for the window to render the input User ID
        browser.waitForElementPresent('input[id=modal-input-user]')
        // Enter a valid User ID
        browser.setValue('input[id=modal-input-user]', '11')
        // Wait for the window to render the input Relationship UUID
        browser.waitForElementPresent('input[id=modal-input-relationship]')
        // Enter a valid Relationship UUID (hard coded uuid of test relationship 2)
        browser.setValue('input[id=modal-input-relationship]', '69fb126a-a97a-4709-b9ce-58b3f84bdcb7')
        // Save the Project User entry
        browser.click('button[id=modal-button-save]')
        browser.pause(200)
        // Verify the Project User entry is in the table
        browser.expect.element('#root').text.to.contain('1235')
        browser.expect.element('#root').text.to.contain('11')
        browser.expect.element('#root').text.to.contain('69fb126a-a97a-4709-b9ce-58b3f84bdcb7')
        // Delete the entry we just put in
        browser.click('button[id=modal-button-delete-row-2]')
        browser.pause(100)
        // Wait for the confirm window to show up
        browser.waitForElementPresent('div[id=react-confirm-alert]')
        // Confirm we are deleting the right element
        browser.expect.element('#react-confirm-alert').text.to.contain('{"force":"True",')
        // Click on the 'Yes' button
        browser.click('div#react-confirm-alert button') // This should be the yes button
        browser.end()
    }
}
