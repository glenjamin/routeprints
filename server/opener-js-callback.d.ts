import express from "express";

interface OpenerJsCallbackMiddleware extends express.Handler {}

export = OpenerJsCallbackMiddleware;

declare global {
  namespace Express {
    export interface Response {
      openerJsCallback: (callbackName: string, data: object) => void;
    }
  }
}
