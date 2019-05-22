import React from "react";
import ReactDOM from "react-dom";
import DateTimeDisplay from "./DateTime";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DateTimeDisplay />, div);
  ReactDOM.unmountComponentAtNode(div);
});
