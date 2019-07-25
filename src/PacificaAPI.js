import React from 'react'
import Axios from 'axios'
import Grid from '@material-ui/core/Grid'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import DateTimeDisplay from './DateTime'
import SimpleModal from './Modal'

export const getObjectList = MDUrl => {
  return Axios.get(`${MDUrl}/objectinfo/list`)
}

export const filteredWhereArgs = (fieldList, filtered) => {
  let whereArgs = {}
  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i].id === '_id') {
      whereArgs._id = filtered[i].value
      return whereArgs
    }
    switch (fieldList[filtered[i].id]) {
      case 'TEXT':
      case 'VARCHAR':
        filtered[i].disableLike = false
        break
      default:
        filtered[i].disableLike = true
        break
    }
    whereArgs[filtered[i].id] = filtered[i].value
    if (!filtered[i].disableLike) {
      whereArgs[`${filtered[i].id}_operator`] = 'like'
      whereArgs[filtered[i].id] = `%${filtered[i].value}%`
    }
  }
  return whereArgs
}

export const convertColumns = (
  MDUrl,
  object,
  fieldList,
  fieldTypes,
  primaryKeys,
  updateFunc
) => {
  let fieldListCopy = fieldList.slice()
  fieldListCopy.unshift('Edit')
  return fieldListCopy.map((key, index) => {
    let colDef = { Header: key, accessor: key }
    switch (key) {
      case 'Edit':
        // eslint-disable-next-line react/display-name
        colDef.Cell = function(row) {
          let deleteArgs = { force: 'True' }
          primaryKeys.map((key, index) => {
            if (key === 'id') {
              deleteArgs[`_${key}`] = row.row[`_${key}`]
            } else {
              deleteArgs[key] = row.row[key]
            }
            return ''
          })
          return (
            <Grid container spacing={8}>
              <Grid item xs={8} sm={4} key="edit-modal">
                <SimpleModal
                  title="Edit"
                  MDUrl={MDUrl}
                  object={object}
                  defaults={row.row}
                  icon={() => <EditIcon />}
                  closeUpdate={updateFunc}
                />
              </Grid>
              <Grid item xs={8} sm={4} key="delete-button">
                <IconButton
                  color="inherit"
                  aria-label="Delete item"
                  onClick={() => {
                    confirmAlert({
                      title: 'Confirm to Delete',
                      message: `Are you sure you want to delete? ${JSON.stringify(deleteArgs)}`,
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () => {
                            Axios.delete(`${MDUrl}/${object}`, {
                              params: deleteArgs
                            }).then(res => {
                              // eslint-disable-next-line no-console
                              console.log(res)
                              updateFunc()
                            }).catch(res => {
                              // eslint-disable-next-line no-console
                              console.log(JSON.stringify(res, null, 2))
                              alert(res.response.data.traceback)
                            })
                          }
                        }, {
                          label: 'No',
                          onClick: () => null
                        }
                      ]
                    })
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          )
        }
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
        colDef.Cell = function(row) { return (
          <DateTimeDisplay key={key} defValue={row.row[key]} />
        )}
        break
      case 'BOOL':
        // eslint-disable-next-line react/display-name
        colDef.Cell = function(row) { return (
          <Checkbox label={key} value={key} checked={row.row[key]} />
        )}
        break
      default:
        break
    }
    return colDef
  })
}

export const getData = (
  MDUrl,
  object,
  filtered,
  pageSize,
  pageNum,
  updateFunc
) => {
  return new Promise((resolve, reject) => {
    Axios.get(`${MDUrl}/objectinfo/${object}`).then(res => {
      let whereArgs = filteredWhereArgs(res.data.field_list, filtered)
      Axios.get(`${MDUrl}/objectinfo/${object}`, { params: whereArgs }).then(res => {
        let recordCount = res.data.record_count
        let columns = convertColumns(
          MDUrl,
          object,
          res.data.field_list,
          res.data.field_types,
          res.data.primary_keys,
          updateFunc
        )
        whereArgs.items_per_page = pageSize
        whereArgs.page_number = pageNum + 1
        Axios.get(`${MDUrl}/${object}`, { params: whereArgs }).then(res => {
          resolve({
            numPages: Math.ceil(recordCount / pageSize),
            columns: columns,
            objList: res.data
          })
        }).catch(reject)
      }).catch(reject)
    }).catch(reject)
  })
}
