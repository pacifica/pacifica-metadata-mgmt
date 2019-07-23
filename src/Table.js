import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import EditIcon from '@material-ui/icons/Edit'

import { getData } from './PacificaAPI'
import SimpleModal from './Modal'

class DynamicTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      object: 'users',
      objList: [{ _id: 1 }],
      columns: [{ Header: 'ID', accessor: '_id' }],
      filtered: [],
      numPages: -1,
      pageNum: 0,
      pageSize: 20,
      loading: true
    }
  }

  updateData (object, state) {
    const { MDUrl } = this.props
    let pageNum = 0
    let pageSize = 20
    let filtered = []
    if (state) {
      pageNum = state.page
      pageSize = state.pageSize
      filtered = state.filtered
    }
    this.setState({ loading: true })
    return new Promise((resolve, reject) => {
      getData(MDUrl, object, filtered, pageSize, pageNum, () => {
        this.updateData(object)
      }).then(res => {
        resolve(res)
        this.setState({
          objList: res.objList,
          numPages: res.numPages,
          columns: res.columns,
          loading: false,
          pageNum: pageNum,
          pageSize: pageSize,
          object: object
        })
      }).catch(reject)
    })
  };

  componentWillReceiveProps (props) {
    if (props.object !== this.state.object) {
      this.updateData(props.object).catch(err => console.log(err))
    }
  }

  render () {
    const { object, objList, columns, numPages } = this.state
    return (
      <div>
        <SimpleModal
          title="Create"
          icon={() => <EditIcon />}
          MDUrl="/mdapi"
          object={object}
          defaults={{}}
          closeUpdate={() => {
            this.updateData(object).catch(err => console.log(err))
          }}
        />
        <ReactTable
          filterable={true}
          data={objList}
          pages={numPages}
          columns={columns}
          manual
          onFetchData={(state, instance) => {
            this.updateData(object, state).catch(err => console.log(err))
          }}
          onFilteredChange={filtered => this.setState({ filtered: filtered })}
          onPageChange={pageNum => this.setState({ pageNum: pageNum })}
          onPageSizeChange={pageSize => this.setState({ pageSize: pageSize })}
        />
      </div>
    )
  }
}

export default DynamicTable
