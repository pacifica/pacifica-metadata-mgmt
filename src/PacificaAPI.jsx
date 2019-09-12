/* eslint-disable react/no-multi-comp */
import Axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox'
import DateTimeDisplay from './DateTime'
import DeleteModal from './DeleteModal'
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import SimpleModal from './Modal'

export const getObjectList = (MDUrl) => Axios.get(`${MDUrl}/objectinfo/list`)

// eslint-disable-next-line max-statements
export const filteredWhereArgs = (fieldTypes, filtered) => {
  const whereArgs = {}
  // eslint-disable-next-line no-magic-numbers
  for (let index = 0; index < filtered.length; index += 1) {
    if (filtered[index].id === '_id') {
      // eslint-disable-next-line no-underscore-dangle
      whereArgs._id = filtered[index].value
      return whereArgs
    }
    switch (fieldTypes[filtered[index].id]) {
      case 'TEXT':
      case 'VARCHAR':
        filtered[index].disableLike = false
        break
      default:
        filtered[index].disableLike = true
        break
    }
    whereArgs[filtered[index].id] = filtered[index].value
    if (!filtered[index].disableLike) {
      whereArgs[`${filtered[index].id}_operator`] = 'like'
      whereArgs[filtered[index].id] = `%${filtered[index].value}%`
    }
  }
  return whereArgs
}

const getEditIcon = function getEditIcon () {
  return (
    <EditIcon />
  )
}

// eslint-disable-next-line max-params, max-lines-per-function
const headerColumnButtons = function headerColumnButtons (MDUrl, object, primaryKeys, updateFunc) {
  // eslint-disable-next-line max-lines-per-function
  return function internalColumnButtons (row) {
    const deleteArgs = { 'force': 'True' }
    primaryKeys.map((key, index) => {
      if (key === 'id') {
        deleteArgs[`_${key}`] = row.row[`_${key}`]
      } else {
        deleteArgs[key] = row.row[key]
      }
      return ''
    })
    // eslint-disable-next-line no-underscore-dangle
    const rowIndex = row.row._index
    return (
      <Grid
        container
        spacing={8}
      >
        <Grid
          item
          key="edit-modal"
          sm={4}
          xs={8}
        >
          <SimpleModal
            MDUrl={MDUrl}
            closeUpdate={updateFunc}
            defaults={row.row}
            icon={getEditIcon}
            object={object}
            title={`Edit Row ${rowIndex}`}
          />
        </Grid>
        <Grid
          item
          key="delete-button"
          sm={4}
          xs={8}
        >
          <DeleteModal
            MDUrl={MDUrl}
            deleteArgs={deleteArgs}
            object={object}
            rowIndex={rowIndex}
            updateFunc={updateFunc}
          />
        </Grid>
      </Grid>
    )
  }
}

// eslint-disable-next-line max-params
export const convertColumns = function convertColumns (MDUrl, object, fieldList, fieldTypes, primaryKeys, updateFunc) {
  const fieldListCopy = fieldList.slice()
  fieldListCopy.unshift('Edit')
  return fieldListCopy.map((key, index) => {
    const colDef = { 'Header': key, 'accessor': key }
    switch (key) {
      case 'Edit':
        // eslint-disable-next-line react/display-name
        colDef.Cell = headerColumnButtons(MDUrl, object, primaryKeys, updateFunc)
        colDef.filterable = false
        break
      case 'id':
        colDef.Header = 'ID'
        colDef.accessor = '_id'
        break
      default:
        break
    }
    switch (fieldTypes[key]) {
      case 'DATETIME':
        // eslint-disable-next-line react/display-name
        colDef.Cell = function Cell (row) {
          return (
            <DateTimeDisplay
              defValue={row.row[key]}
              key={key}
            />
          )
        }
        break
      case 'BOOL':
        // eslint-disable-next-line react/display-name
        colDef.Cell = function Cell (row) {
          return (
            <Checkbox
              checked={row.row[key]}
              label={key}
              value={key}
            />
          )
        }
        break
      default:
        break
    }
    return colDef
  })
}

// eslint-disable-next-line max-params
export const getData = function getData (MDUrl, object, filtered, pageSize, pageNum, updateFunc) {
  return new Promise((resolve, reject) => {
    Axios.get(`${MDUrl}/objectinfo/${object}`).then((res) => {
      const whereArgs = filteredWhereArgs(res.data.field_types, filtered)
      Axios.get(`${MDUrl}/objectinfo/${object}`, { 'params': whereArgs }).then((whereRes) => {
        const recordCount = whereRes.data.record_count
        const columns = convertColumns(
          MDUrl,
          object,
          whereRes.data.field_list,
          whereRes.data.field_types,
          whereRes.data.primary_keys,
          updateFunc
        )
        whereArgs.items_per_page = pageSize
        // eslint-disable-next-line no-magic-numbers
        whereArgs.page_number = pageNum + 1
        Axios.get(`${MDUrl}/${object}`, { 'params': whereArgs }).then((pagesRes) => {
          resolve({
            columns,
            'numPages': Math.ceil(recordCount / pageSize),
            'objList': pagesRes.data
          })
        })
          .catch(reject)
      })
        .catch(reject)
    })
      .catch(reject)
  })
}
