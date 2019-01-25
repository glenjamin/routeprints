require("dotenv").config();

const config = {
  port: lookupConfigFromEnvironment("PORT", { defaultValue: "1987" }),
  stravaBaseURL: lookupConfigFromEnvironment("STRAVA_URL", {
    defaultValue: "https://www.strava.com/"
  }),
  clientId: lookupConfigFromEnvironment("CLIENT_ID", {
    requireInProduction: true
  }),
  clientSecret: lookupConfigFromEnvironment("CLIENT_SECRET", {
    requireInProduction: true
  }),
  cookieSecret: lookupConfigFromEnvironment("COOKIE_SECRET", {
    requireInProduction: true,
    defaultValue: "good-enough-for-dev"
  })
};

function lookupConfigFromEnvironment(
  name: string,
  {
    requireInProduction,
    defaultValue
  }: { requireInProduction?: boolean; defaultValue?: string }
): string {
  const val = process.env[name];
  if (val !== undefined) {
    return val;
  }
  if (requireInProduction && process.env.NODE_ENV === "production") {
    throw new Error(`Missing ${name} environment variable`);
  }
  return defaultValue || "";
}

export default config;
