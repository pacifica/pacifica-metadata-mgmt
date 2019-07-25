let Axios = require('axios')

let dataColumns = {
  'analytical_tools': 'name',
  'atool_project': 'project',
  "atool_transaction": "transaction",
  "citation_contributor": "author",
  "citation_doi": "doi",
  "citation_keyword": "keyword",
  "citation_project": "project",
  "citation_transaction": "citation",
  "citations": "article_title",
  "contributors": "first_name",
  "data_sources": "display_name",
  "dataset_file": "dataset",
  "dataset_project_user": "project",
  "datasets": "display_name",
  "doi_author_mapping": "doi",
  "doi_authors": "first_name",
  "doi_entries": "status",
  "doi_info": "doi",
  "doi_transaction": "doi",
  "file_key_value": "file",
  "files": "name",
  "groups": "name",
  "institution_user": "user",
  "institutions": "name",
  "instrument_data_source": "instrument",
  "instrument_group": "group",
  "instrument_key_value": "instrument",
  "instrument_user": "instrument",
  "instruments": "display_name",
  "journals": "name",
  "keys": "key",
  "keywords": "keyword",
  "project_group": "project",
  "project_instrument": "project",
  "project_user": "project",
  "projects": "title",
  "relationships": "display_name",
  "trans_key_value": "key",
  "transaction_user": "transaction",
  "transactions": "_id",
  "transsap": "analytical_tool",
  "transsip": "instrument",
  "user_group": "user",
  "users": "first_name",
  "values": "value"
}

function getDataExamples() {
  let dataExamples = {}
  let objParams = {
    params: {
      recursion_depth: 0,
      recursion_limit: 1,
      page_number: 1,
      items_per_page: 1
    }
  }
  Object.keys(dataColumns).map(async (key) => {
    let objInResp = await Axios.get(`http://localhost:8121/${key}`, objParams)
    dataExamples[key] = objInResp.data[0]
  })
  return dataExamples
}

let dataExamples = getDataExamples()

module.exports = {
  'Load All The Pages': function (browser) {
    let objList = Object.keys(dataColumns)
    browser.url('http://localhost:8080')
    browser.waitForElementPresent('button[id=header-open-drawer]')
    browser.click('button[id=header-open-drawer]')
    for (let i = 0; i < objList.length; i++) {
      let obj = dataExamples[objList[i]]
      browser.pause(200)
      browser.waitForElementPresent(`div[id=listitem-${objList[i].replace('_', '-')}]`)
      browser.click(`div[id=listitem-${objList[i].replace('_', '-')}`)
      browser.pause(200)
      browser.assert.containsText('#root', obj[dataColumns[objList[i]]])
    }
    browser.waitForElementPresent('button[id=drawer-close-drawer]')
    browser.click('button[id=drawer-close-drawer]')
    browser.end()
  }
}
