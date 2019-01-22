import { Handler } from "express";

declare interface LinkToOptions {
  params: boolean | string[] | ((k: string, v: string) => boolean);
  absolute: "proxy" | "host" | "route";
}

declare function linkto(opts?: LinkToOptions): Handler;

declare global {
  namespace Express {
    export interface Request {
      linkto: (path: string, opts?: LinkToOptions) => string;
      linkTo: (path: string, opts?: LinkToOptions) => string;
    }
  }
}

export = linkto;
