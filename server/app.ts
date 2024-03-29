import { URL } from "url";
import querystring from "querystring";

import express from "express";
import linkto from "linkto";
import openerJsCallback from "./opener-js-callback";

import axios from "axios";

import config from "./config";

const stravaClient = axios.create({
  baseURL: config.stravaBaseURL,
  timeout: 10000
});

const app = express();

app.enable("trust proxy");

app.use(linkto());

function buildUrl(
  path: string,
  queryParams: { [name: string]: string }
): string {
  const url = new URL(path, config.stravaBaseURL);
  url.search = querystring.stringify(queryParams);
  return String(url);
}

const DESIRED_SCOPE = "read,activity:read";

app.get("/strava/auth/connect", (req, res) => {
  res.redirect(
    buildUrl("/oauth/authorize", {
      client_id: config.clientId,
      redirect_uri: req.linkto("/strava/auth/callback"),
      response_type: "code",
      scope: DESIRED_SCOPE
      // approval_prompt: "force"
    })
  );
});

type OauthCallbackError = any;
type OauthCallbackOk = any;
function stravaOAuth2Callback(
  res: express.Response,
  data: OauthCallbackError | OauthCallbackOk
): void {
  openerJsCallback(res, "stravaOAuth2Callback", data);
}

app.get("/strava/auth/callback", (req, res) => {
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
  stravaClient
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
      stravaOAuth2Callback(res, data);
    })
    .catch(err => {
      return stravaOAuth2Callback(res, {
        error: "oauth_error",
        details: err.message
      });
    });
});

export default app;
