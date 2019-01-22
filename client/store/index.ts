import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import { rootReducer } from "./reducer";

export function makeStore() {
  const logger = createLogger({
    collapsed: true
  });

  const store = createStore(rootReducer, undefined, applyMiddleware(logger));

  if (module.hot) {
    module.hot.accept("./reducer", () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
