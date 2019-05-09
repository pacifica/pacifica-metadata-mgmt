import React from "react";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DateTimeDisplay from "./DateTime";
import SimpleModal from "./Modal";

export const getObjectList = md_url => {
  return Axios.get(`${md_url}/objectinfo/list`);
};

export const filtered_to_where_args = filtered => {
  let where_args = {};
  for (let i = 0; i < filtered.length; i++) {
    if (filtered[i].id === "_id") {
      where_args._id = filtered[i].value;
      return where_args;
    }
    where_args[filtered[i].id] = filtered[i].value;
    if (!filtered[i].disableLike) {
      where_args[`${filtered[i].id}_operator`] = "like";
      where_args[filtered[i].id] = `%${filtered[i].value}%`;
    }
  }
  return where_args;
};

export const convert_columns = (
  md_url,
  object,
  field_list,
  field_types,
  primary_keys,
  updateFunc
) => {
  let field_list_copy = field_list.slice();
  field_list_copy.unshift("Edit");
  return field_list_copy.map((key, index) => {
    let col_def = { Header: key, accessor: key };
    switch (key) {
      case "Edit":
        col_def.Cell = row => {
          let delete_args = { force: "True" };
          primary_keys.map((key, index) => {
            if (key === "id") {
              delete_args[`_${key}`] = row.row[`_${key}`];
            } else {
              delete_args[key] = row.row[key];
            }
            return "";
          });
          return (
            <Grid container spacing={8}>
              <Grid item xs={8} sm={4}>
                <SimpleModal
                  title="Edit"
                  md_url={md_url}
                  object={object}
                  defaults={row.row}
                  icon={() => <EditIcon />}
                  closeUpdate={updateFunc}
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <IconButton
                  color="inherit"
                  aria-label="Delete item"
                  onClick={() => {
                    Axios.delete(`${md_url}/${object}`, {
                      params: delete_args
                    })
                      .then(res => {
                        console.log(res);
                        updateFunc();
                      })
                      .catch(res => {
                        alert(JSON.stringify(res, null, 2));
                      });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        };
        col_def.filterable = false;
        break;
      case "id":
        col_def.Header = "ID";
        col_def.accessor = "_id";
        break;
      default:
        break;
    }
    switch (field_types[key]) {
      case "DATETIME":
        col_def.Cell = row => (
          <DateTimeDisplay key={key} defValue={row.row[key]} />
        );
        break;
      case "BOOL":
        col_def.Cell = row => (
          <Checkbox label={key} value={key} checked={row.row[key]} />
        );
        break;
      default:
        break;
    }
    return col_def;
  });
};

export const getData = (
  md_url,
  object,
  filtered,
  pageSize,
  pageNum,
  updateFunc
) => {
  let where_args = filtered_to_where_args(filtered);
  return new Promise((resolve, reject) => {
    Axios.get(`${md_url}/objectinfo/${object}`, { params: where_args })
      .then(res => {
        let record_count = res.data.record_count;
        let columns = convert_columns(
          md_url,
          object,
          res.data.field_list,
          res.data.field_types,
          res.data.primary_keys,
          updateFunc
        );
        where_args.items_per_page = pageSize;
        where_args.page_number = pageNum + 1;
        Axios.get(`${md_url}/${object}`, { params: where_args })
          .then(res => {
            resolve({
              numPages: Math.ceil(record_count / pageSize),
              columns: columns,
              obj_list: res.data
            });
          })
          .catch(reject);
      })
      .catch(reject);
  });
};
