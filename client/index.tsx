import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { makeStore } from "./store";

import "./styles.scss";

import { App } from "./App";

const store = makeStore();

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
  );
}

render();

if (module.hot) {
  module.hot.accept("./App", () => {
    render();
  });
}
