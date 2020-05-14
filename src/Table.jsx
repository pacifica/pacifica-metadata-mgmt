/* eslint-disable react/no-multi-comp */
import 'react-table/react-table.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import SimpleModal from './Modal'
import { getData } from './PacificaAPI'

class DynamicTable extends Component {
  static propTypes = {
    MDUrl: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      columns: [{ Header: 'ID', accessor: '_id' }],
      filtered: [],
      loading: false,
      numPages: -1,
      objList: [{ _id: 1 }],
      object: 'users',
      pageNum: 0,
      pageSize: 20
    }
    this.updateDataObject = this.updateDataObject.bind(this)
    this.handleFetchData = this.handleFetchData.bind(this)
    this.handleFilteredChange = this.handleFilteredChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this)
  }

  static shouldComponentUpdate () {
    return false
  }

  promiseGetData (object, state) {
    return (resolve, reject) => {
      const { MDUrl } = this.props
      let { pageNum, pageSize, filtered } = this.state
      if (state) {
        const { page } = state
        // eslint-disable-next-line prefer-destructuring
        pageSize = state.pageSize
        // eslint-disable-next-line prefer-destructuring
        filtered = state.filtered
        pageNum = page
      }
      return getData(
        MDUrl,
        object,
        filtered,
        pageSize,
        pageNum,
        () => {
          this.updateData(object).catch(reject)
        }
      )
        .then((res) => {
          resolve(res)
          this.setState({
            columns: res.columns,
            loading: false,
            numPages: res.numPages,
            objList: res.objList,
            object,
            pageNum,
            pageSize
          })
        })
        .catch(reject)
    }
  }

  updateData (object, state) {
    const { loading } = this.state
    if (loading) {
      return Promise.resolve({})
    }
    this.setState({ loading: true })
    return new Promise(this.promiseGetData(
      object,
      state
    ))
  }

  updateDataObject () {
    const { object } = this.state
    this.updateData(object).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err)
    })
  }

  handleFetchData (state, instance) {
    const { object } = this.state
    this.updateData(
      object,
      state
    ).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err)
    })
  }

  handleFilteredChange (filtered) {
    this.setState({ filtered })
  }

  handlePageChange (pageNum) {
    this.setState({ pageNum })
  }

  handlePageSizeChange (pageSize) {
    this.setState({ pageSize })
  }

  render () {
    const { MDUrl } = this.props
    const { object, objList, columns, numPages } = this.state
    return (
      <div>
        <SimpleModal
          MDUrl={MDUrl}
          closeUpdate={this.updateDataObject}
          defaults={{}}
          object={object}
          title="Create"
        />
        <ReactTable
          columns={columns}
          data={objList}
          filterable
          manual
          onFetchData={this.handleFetchData}
          onFilteredChange={this.handleFilteredChange}
          onPageChange={this.handlePageChange}
          onPageSizeChange={this.handlePageSizeChange}
          pages={numPages}
        />
      </div>
    )
  }
}

export default DynamicTable
