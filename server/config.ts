require("dotenv").config();

const config = {
  port: process.env.PORT || "1987",
  stravaBaseURL: "https://www.strava.com/",
  clientId: requireInProduction("CLIENT_ID"),
  clientSecret: requireInProduction("CLIENT_SECRET")
};

function requireInProduction(envVarName: string): string {
  const val = process.env[envVarName];
  if (val !== undefined) {
    return val;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(`Missing ${envVarName} environment variable`);
  }
  return "";
}

export default config;
