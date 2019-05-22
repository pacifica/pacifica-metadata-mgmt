import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("finds a single button to open the drawer", () => {
    const wrapper = mount(<App />);
    wrapper
      .find("button#header-open-drawer")
      .first()
      .simulate("click");
  });
  it("saves internal selected object", () => {
    const wrapper = mount(<App />);
    wrapper
      .find(ListItem)
      .first()
      .simulate("click");
  });
});
