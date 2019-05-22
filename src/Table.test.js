import React from "react";
import ReactDOM from "react-dom";
import DynamicTable from "./Table";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DynamicTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
