export type RemoteData<Data, Err> =
  | { status: "initial" }
  | { status: "loading" }
  | { status: "ok"; data: Data }
  | { status: "error"; error: Err };

export function initial<Data, Err = string>(): RemoteData<Data, Err> {
  return { status: "initial" };
}

export function loading<Data, Err = string>(): RemoteData<Data, Err> {
  return { status: "loading" };
}

export function ok<Data, Err = string>(data: Data): RemoteData<Data, Err> {
  return { status: "ok", data };
}

export function err<Data, Err = string>(error: Err): RemoteData<Data, Err> {
  return { status: "error", error };
}
