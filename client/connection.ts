import { Reducer } from "redux";

import { Actions as StravaActions } from "./store/strava";

export type Action<Type extends string, Payload extends {} | void = void> = {
  type: Type;
  payload: Payload;
};

export type ActionUnion = Action<"INIT"> | StravaActions;

type ActionTypes = ActionUnion["type"];

type NoPayloadActionTypes = Extract<ActionUnion, Action<any, void>>["type"];

export type ActionOf<T extends ActionTypes> = Extract<
  ActionUnion,
  Action<T, any>
>;
type Payload<T extends ActionTypes> = ActionOf<T>["payload"];

export function action<T extends NoPayloadActionTypes>(type: T): ActionOf<T>;
export function action<T extends ActionTypes>(
  type: T,
  payload: Payload<T>
): ActionOf<T>;
export function action<T extends ActionTypes>(
  type: T,
  payload?: Payload<T>
): ActionOf<T> {
  return { type, payload } as any;
}

export interface Dispatch<Actions = ActionUnion> {
  (action: Actions): void;
}

export type InterceptorMap<State, Actions extends ActionUnion> = {
  [ActionType in Actions["type"]]?: (
    params: {
      payload: Payload<ActionType>;
      dispatch: Dispatch<Actions>;
      getState: () => State;
    }
  ) => void
};

export function defineInterceptor<
  State,
  Actions extends ActionUnion,
  I = InterceptorMap<State, Actions>
>(definitions: I): I {
  return definitions;
}

type ActionReducer<State, ActionType extends ActionUnion["type"]> = (
  state: State,
  payload: Payload<ActionType>
) => State;

export function defineReducer<State, Actions extends ActionUnion>(
  initialState: State,
  definitions: {
    [ActionType in Actions["type"]]?: ActionReducer<State, ActionType>
  }
): Reducer<State, Actions> {
  return function reducer(state = initialState, { type, payload }) {
    if (type in definitions) {
      const actionReducer = (definitions as any)[type];
      return actionReducer(state, payload);
    }
    return state;
  };
}
