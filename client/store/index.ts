import { createStore, applyMiddleware, Middleware } from "redux";
import { createLogger } from "redux-logger";

import { InterceptorMap, ActionUnion } from "../connection";
import { rootReducer, allInterceptors } from "./combined";

export function makeStore() {
  const logger = createLogger({
    collapsed: true
  });

  const interception = createInterception(allInterceptors);

  const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(logger, interception)
  );

  if (module.hot) {
    module.hot.accept("./combined", () => {
      store.replaceReducer(rootReducer);
      interception.replace(allInterceptors);
    });
  }

  return store;
}

type InterceptionMapping = {
  [toplevel: string]: InterceptorMap<any, ActionUnion>;
};
type InterceptionMiddleware = Middleware & {
  replace: (updated: InterceptionMapping) => void;
};
function createInterception(
  interceptors: InterceptionMapping
): InterceptionMiddleware {
  const fn: InterceptionMiddleware = ({
    dispatch,
    getState
  }) => next => action => {
    let matched = false;
    Object.entries(interceptors).forEach(([toplevel, map]) => {
      const { type, payload } = action;
      const handler = (map as any)[type];
      if (handler) {
        matched = true;
        handler({
          payload: payload,
          dispatch,
          getState: () => getState()[toplevel]
        });
      }
    });
    if (!matched) next(action);
  };
  fn.replace = (updated: { [toplevel: string]: InterceptorMap<any, any> }) => {
    interceptors = updated;
  };
  return fn;
}
