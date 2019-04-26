import React from "react";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
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

export const convert_columns = (field_list, field_types, primary_keys) => {
  let field_list_copy = field_list.slice();
  field_list_copy.unshift("Edit");
  return field_list_copy.map((key, index) => {
    let col_def = { Header: key, accessor: key };
    switch (key) {
      case "Edit":
        col_def.Cell = row => {
          let delete_args = {};
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
                <SimpleModal title="Edit" icon={() => <EditIcon />}>
                  {form_layout_columns(
                    field_list,
                    field_types,
                    primary_keys,
                    row.row
                  )}
                </SimpleModal>
              </Grid>
              <Grid item xs={8} sm={4}>
                <IconButton
                  color="inherit"
                  aria-label="Delete item"
                  onClick={() => {
                    // FIXME: actually call delete!
                    console.log(delete_args);
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
      default:
        break;
    }
    return col_def;
  });
};

export const form_layout_columns = (
  field_list,
  field_types,
  primary_keys,
  defaults
) => {
  return (
      <FormControl component="fieldset">
        <Grid container spacing={24}>
          {field_list.map((key, index) => {
            let field_def;
            switch (field_types[key]) {
              case "DATETIME":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={key}
                      type="datetime-local"
                      defaultValue={defaults[key]}
                    />
                  </Grid>
                );
                break;
              case "DATE":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={key}
                      type="date-local"
                      defaultValue={defaults[key]}
                    />
                  </Grid>
                );
                break;
              case "VARCHAR":
              case "TEXT":
                let actual_key = key;
                if (primary_keys.includes(key)) {
                  actual_key = `_${key}`;
                }
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={key}
                      defaultValue={defaults[actual_key]}
                    />
                  </Grid>
                );
                break;
              case "UUID":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label={key}
                      defaultValue={defaults[key]}
                    />
                  </Grid>
                );
                break;
              case "INT":
              case "BIGINT":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="number"
                      label={key}
                      defaultValue={defaults[key]}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                );
                break;
              case "BOOL":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <Typography>{key}</Typography>
                    <Checkbox label={key} checked={defaults[key]} />
                  </Grid>
                );
                break;
              case "AUTO":
                field_def = (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={key}
                      defaultValue={defaults[`_${key}`]}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                );
                break;
              default:
                console.log(field_types[key]);
                field_def = (
                  <Grid item xs={12}>
                    <Typography>Something Unknown!</Typography>
                  </Grid>
                );
                break;
            }
            return field_def;
          })}
        </Grid>
      </FormControl>
  );
};

export const getFormLayout = (md_url, object, defaults) => {
  return new Promise((resolve, reject) => {
    Axios.get(`${md_url}/objectinfo/${object}`)
      .then(res => {
        resolve(
          form_layout_columns(
            res.data.field_list,
            res.data.field_types,
            res.data.primary_keys,
            defaults
          )
        );
      })
      .catch(reject);
  });
};

export const getData = (md_url, object, filtered, pageSize, pageNum) => {
  let where_args = filtered_to_where_args(filtered);
  return new Promise((resolve, reject) => {
    Axios.get(`${md_url}/objectinfo/${object}`, { params: where_args })
      .then(res => {
        let record_count = res.data.record_count;
        let columns = convert_columns(
          res.data.field_list,
          res.data.field_types,
          res.data.primary_keys
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
