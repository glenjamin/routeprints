import { Reducer } from "redux";
import { Action } from "../connection";

type Athlete = {
  id: number;
};

const initialState = {
  connected: false,
  athlete: null as Athlete | null
};
type State = typeof initialState;
export type Actions =
  | Action<"STRAVA_CONNECTED">
  | Action<"STRAVA_ATHLETE", Athlete>;

const reducer: Reducer<State, Actions> = function reducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case "STRAVA_CONNECTED":
      return Object.assign({}, state, {
        connected: true,
        athlete: { id: 1 }
      });
    case "STRAVA_ATHLETE":
      return Object.assign({}, state, { athlete: action.payload });
  }
  return state;
};
export default reducer;
