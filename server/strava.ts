import { URL } from "url";
import querystring from "querystring";

import express from "express";
import httpProxyMiddleware from "http-proxy-middleware";
import axios from "axios";

import openerJsCallback from "./opener-js-callback";

import config from "./config";

import { OauthCallbackResult } from "../common/oauth";

const SECOND = 1000;
const MONTH = 30 * 86400;
const DESIRED_SCOPE = "read,activity:read";

const stravaOauthClient = axios.create({
  baseURL: config.stravaBaseURL,
  timeout: 10 * SECOND
});
type StravaCookie = {
  userId: number;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};
const stravaCookieOptions = {
  signed: true,
  maxAge: 1 * MONTH
};

const routes = express.Router();

routes.use(
  "/api",
  httpProxyMiddleware({
    target: config.stravaBaseURL,
    headers: {
      "user-agent": `Routeprints App: ${config.clientId}`
    },
    changeOrigin: true,
    xfwd: false,
    proxyTimeout: 30000,
    onProxyReq(proxyReq, req: express.Request, res: express.Response) {
      if (!req.signedCookies.strava) {
        proxyReq.abort();
        res.status(401);
        res.json({ error: "not_logged_in", details: "none" });
        return;
      }

      // Strip middleware's mount path, replace with target api prefix
      const proxyReqAny: any = proxyReq;
      proxyReqAny.path = proxyReqAny.path.replace(req.baseUrl, "/api/v3");

      const stravaData: StravaCookie = req.signedCookies.strava;
      proxyReq.removeHeader("cookie");
      proxyReq.setHeader("authorization", "Bearer " + stravaData.accessToken);
    }
  })
);

routes.get("/auth/connect", (req, res) => {
  const target = new URL("/oauth/authorize", config.stravaBaseURL);
  target.search = querystring.stringify({
    client_id: config.clientId,
    redirect_uri: req.linkto(req.baseUrl + "/auth/callback"),
    response_type: "code",
    scope: DESIRED_SCOPE,
    approval_prompt: "force"
  });
  res.redirect(String(target));
});

function stravaOAuth2Callback(
  res: express.Response,
  data: OauthCallbackResult
): void {
  openerJsCallback(res, "stravaOAuth2Callback", data);
}

routes.get("/auth/callback", (req, res) => {
  if (req.query.error) {
    stravaOAuth2Callback(res, {
      error: "oauth_error",
      details: req.query.error
    });
    return;
  }
  if (req.query.scope != DESIRED_SCOPE) {
    stravaOAuth2Callback(res, {
      error: "oauth_wrong_scope",
      details: req.query.scope
    });
    return;
  }
  stravaOauthClient
    .post(
      "/oauth/token",
      querystring.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code: req.query.code,
        grant_type: "authorization_code"
      })
    )
    .then(({ data }) => {
      const stravaCookie: StravaCookie = {
        userId: data.athlete.id,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_at * 1000
      };
      res.cookie("strava", stravaCookie, stravaCookieOptions);
      stravaOAuth2Callback(res, { ok: true });
    })
    .catch(err => {
      console.error("Unexpected oauth error", err.stack);
      stravaOAuth2Callback(res, {
        error: "oauth_error",
        details: err.message
      });
    });
});

export default routes;
