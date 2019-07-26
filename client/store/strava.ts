import {
  action,
  Action,
  defineInterceptor,
  defineReducer
} from "../connection";

import * as remote from "../remote";

import * as stravaApi from "../strava-api";

const initialState = {
  connection: remote.initial(),
  athlete: null as stravaApi.Athlete | null
};
type State = typeof initialState;
export type Actions =
  | Action<"STRAVA_CONNECTING">
  | Action<"STRAVA_CONNECTED">
  | Action<"STRAVA_ATHLETE", stravaApi.Athlete>
  | Action<"STRAVA_ATHLETE_ERROR", string>;

export const interceptor = defineInterceptor<State, Actions>({
  STRAVA_CONNECTED: ({ dispatch }) => {
    stravaApi
      .getAthlete()
      .then(athlete => dispatch(action("STRAVA_ATHLETE", athlete)))
      .catch(err => dispatch(action("STRAVA_ATHLETE_ERROR", err.message)));
  }
});

export const reducer = defineReducer<State, Actions>(initialState, {
  STRAVA_CONNECTING: state => copy(state, { connection: remote.loading() }),
  STRAVA_CONNECTED: state => copy(state, { connection: remote.ok(true) }),
  STRAVA_ATHLETE: (state, athlete) => copy(state, { athlete })
});

function copy<T extends object>(a: T, b: Partial<T>): T {
  return Object.assign({}, a, b);
}
