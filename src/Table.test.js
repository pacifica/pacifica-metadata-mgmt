import React from 'react'
import ReactDOM from 'react-dom'
import DynamicTable from './Table'

import { chalk } from 'chalk'

process.on(
  'unhandledRejection',
  function handleWarning (reason, promise) {
    console.log(chalk.red.bold('[PROCESS] Unhandled Promise Rejection'))
    console.log(chalk.red.bold('- - - - - - - - - - - - - - - - - - -'))
    console.log(reason)
    console.log(chalk.red.bold('- -'))
    throw reason
  }
)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DynamicTable />, div)
  ReactDOM.unmountComponentAtNode(div)
})
