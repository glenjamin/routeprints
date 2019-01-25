type OauthCallbackError = {
  error: "oauth_error" | "oauth_wrong_scope";
  details: string;
};
type OauthCallbackOk = {
  ok: true;
};

export type OauthCallbackResult = OauthCallbackError | OauthCallbackOk;
