import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

import App from "./App";

function render() {
  ReactDOM.render(<App />, document.getElementById("app"));
}

render();

if (module.hot) {
  module.hot.accept("./App", () => {
    render();
  });
}
