import { combineReducers } from "redux";

import * as strava from "./strava";

export const rootReducer = combineReducers({
  strava: strava.reducer
});

export const allInterceptors = {
  strava: strava.interceptor
};
