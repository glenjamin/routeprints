import { Actions as StravaActions } from "./store/strava";

export type Action<Type extends string, Payload extends {} | void = void> = {
  type: Type;
  payload: Payload;
};

type ActionUnion = Action<"INIT"> | StravaActions;

type ActionTypes = ActionUnion["type"];

type NoPayloadActionTypes = Extract<ActionUnion, Action<any, void>>["type"];

type ActionOf<T extends ActionTypes> = Extract<ActionUnion, Action<T, any>>;
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

export interface Dispatch {
  (action: ActionUnion): void;
}
