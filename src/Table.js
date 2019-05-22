import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import EditIcon from "@material-ui/icons/Edit";

import { getData } from "./PacificaAPI";
import SimpleModal from "./Modal";

class DynamicTable extends Component {
  state = {
    object: "users",
    obj_list: [{ _id: 1 }],
    columns: [{ Header: "ID", accessor: "_id" }],
    filtered: [],
    numPages: -1,
    pageNum: 0,
    pageSize: 20,
    loading: true
  };

  updateData = (object, state) => {
    const { md_url } = this.props;
    let pageNum = 0;
    let pageSize = 20;
    let filtered = [];
    if (state) {
      pageNum = state.page;
      pageSize = state.pageSize;
      filtered = state.filtered;
    }
    this.setState({ loading: true });
    return new Promise((resolve, reject) => {
      getData(md_url, object, filtered, pageSize, pageNum, () => {
        this.updateData(object);
      })
        .then(res => {
          resolve(res);
          this.setState({
            obj_list: res.obj_list,
            numPages: res.numPages,
            columns: res.columns,
            loading: false,
            pageNum: pageNum,
            pageSize: pageSize,
            object: object
          });
        })
        .catch(reject);
    });
  };

  componentWillReceiveProps(props) {
    if (props.object !== this.state.object) {
      this.updateData(props.object);
    }
  }

  render() {
    const { object, obj_list, columns, numPages } = this.state;
    return (
      <div>
        <SimpleModal
          title="Create"
          icon={() => <EditIcon />}
          md_url="/mdapi"
          object={object}
          defaults={{}}
          closeUpdate={() => {
            this.updateData(object);
          }}
        />
        <ReactTable
          filterable={true}
          data={obj_list}
          pages={numPages}
          columns={columns}
          manual
          onFetchData={(state, instance) => {
            this.updateData(object, state);
          }}
          onFilteredChange={filtered => this.setState({ filtered: filtered })}
          onPageChange={pageNum => this.setState({ pageNum: pageNum })}
          onPageSizeChange={pageSize => this.setState({ pageSize: pageSize })}
        />
      </div>
    );
  }
}

export default DynamicTable;
