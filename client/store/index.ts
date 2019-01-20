import { createStore } from "redux";
import { rootReducer } from "./reducer";

export function makeStore() {
  const store = createStore(rootReducer);

  if (module.hot) {
    module.hot.accept("./reducer", () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
